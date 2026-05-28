import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { signInWithGoogle, registerUser, loginUser } from "../services/api";

function LoginModal({ onClose, onSignedIn }) {

  const modalRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("login"); // 'login' | 'register'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleGoogleCredential = useCallback(
    async (credentialResponse) => {
      const id_token = credentialResponse?.credential;
      if (!id_token) {
        setError("Google sign-in failed: missing credential");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await signInWithGoogle(id_token);
        const { token, user } = response.data;

        if (token) localStorage.setItem("token", token);
        onSignedIn && onSignedIn(user);
        onClose && onClose();
      } catch (e) {
        console.error("Google sign-in failed:", e);
        setError(e?.response?.data?.error || e?.message || "Google sign-in failed");
      } finally {
        setLoading(false);
      }
    },
    [onClose, onSignedIn]
  );

  const handleEmailAuth = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const payload = {
          email: email.trim(),
          password,
          ...(mode === "register" ? { name: name.trim() } : {}),
        };

        if (!payload.email) throw new Error("Email is required");
        if (!payload.password) throw new Error("Password is required");
        if (mode === "register" && !payload.name) throw new Error("Name is required");

        const response =
          mode === "register" ? await registerUser(payload) : await loginUser(payload);

        const { token, user } = response.data;

        if (token) localStorage.setItem("token", token);
        onSignedIn && onSignedIn(user);
        onClose && onClose();
      } catch (e2) {
        console.error("Email auth failed:", e2);
        setError(e2?.response?.data?.error || e2?.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    },
    [email, password, name, mode, onClose, onSignedIn]
  );


  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose && onClose();
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "calc(100vw - 24px)",
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Sign in</h3>
        <p style={{ marginTop: 0, color: "#4b5563", fontSize: 13 }}>
          Use Google or email/password.
        </p>

        <div style={{ width: "100%", marginTop: 10 }}>
          <GoogleLogin
            onSuccess={handleGoogleCredential}
            onError={() => setError("Google sign-in failed")}
            useOneTap
          />
        </div>

        <div style={{ marginTop: 14, borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => setMode("login")}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: mode === "login" ? "#111827" : "white",
                color: mode === "login" ? "white" : "#111827",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                background: mode === "register" ? "#111827" : "white",
                color: mode === "register" ? "white" : "#111827",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleEmailAuth} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mode === "register" && (
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
            )}

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                required
              />
            </label>

            {error && <div style={{ color: "#dc2626", fontWeight: 600 }}>{error}</div>}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
              <button type="button" onClick={onClose} style={{ padding: "6px 10px" }} disabled={loading}>
                Cancel
              </button>
              <button type="submit" style={{ padding: "6px 12px", fontWeight: 700 }} disabled={loading}>
                {loading ? "Please wait…" : mode === "register" ? "Create account" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default LoginModal;


