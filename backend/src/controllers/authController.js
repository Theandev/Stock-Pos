import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) return res.status(400).json({ error: 'Missing id_token' });

  try {
    const ticket = await client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        picture,
        role: adminEmails.includes(email) ? 'admin' : 'user',
      });
    } else {
      // Update googleId/picture/name if user exists but fields are missing/stale.
      if (!user.googleId) user.googleId = googleId;
      if (!user.picture && picture) user.picture = picture;
      if (!user.name && name) user.name = name;

      // Ensure role matches admin list (optional but keeps behavior consistent).
      if (adminEmails.includes(email) && user.role !== 'admin') user.role = 'admin';

      await user.save();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'change_this_secret',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, picture: user.picture } });

  } catch (error) {
    console.error('Google sign-in failed:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
};
