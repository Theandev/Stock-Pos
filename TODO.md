# Project TODO

- [x] Backend: replace placeholder DB credentials in `backend/src/config/db.js` with env-based configuration
- [x] Backend: wire auth routes in `backend/src/routes/auth.js` for `POST /register` and `POST /login`
- [x] Frontend: update `frontend/src/components/LoginModal.jsx` to support email/password register + login (and keep Google sign-in)
- [ ] Frontend: update `frontend/src/services/api.js` if any endpoint wiring mismatch exists (verify shapes)
- [x] Frontend: harden token payload decoding in `frontend/src/components/Navbar.jsx`
- [x] Backend: tighten JWT secret handling in `backend/src/middleware/authMiddleware.js`

- [ ] Smoke check: verify endpoints manually (curl / browser):
  - [ ] `GET /api`
  - [ ] `POST /api/auth/google`
  - [ ] `POST /api/auth/register`
  - [ ] `POST /api/auth/login`
  - [ ] Admin: `POST /api/products`
  - [ ] Order: `POST /api/orders`
  - [ ] Admin: `GET /api/orders/report`

