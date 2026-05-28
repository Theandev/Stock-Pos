import React, { useRef, useState, useCallback, useEffect } from "react";

import { signInWithGoogle } from "../services/api";

function LoginModal({ mode = "login", onClose, onSignedIn }) {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIdTokenFromGoogleButton = async () => {
    // If you are using @react-oauth/google, replace this with the real token
    // from the Google credential response.
    //
    // This repo previously used a demo placeholder, so we keep the UI working:
    // - If an id_token is already present (e.g., wired elsewhere), use it.
    // - Otherwise, throw a helpful error.
    const token = window?.__googleIdToken;
    if (typeof token === "string" && token.length > 10) return token;
    throw new Error(
      "Google id_token not found. Wire Google OAuth and set window.__googleIdToken from the credential callback."
    );
  };

  const handleGoogleSignIn = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const id_token = await getIdTokenFromGoogleButton();
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
  }, [onClose, onSignedIn]);


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
          width: 360,
          background: "#fff",
          borderRadius: 8,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>
          {mode === "login" ? "Sign in" : "Register"}
        </h3>
        <p style={{ marginTop: 0 }}>
          Use Google to sign in. (Replace placeholder handler with real Google
          Identity flow.)
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{ padding: "8px 12px", width: "100%", marginBottom: 8 }}
        >
          {loading ? "Signing in…" : `Continue with Google`}
        </button>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}
        >
          <button onClick={onClose} style={{ padding: "6px 10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
