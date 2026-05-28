import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { signInWithGoogle } from "../services/api";

function LoginModal({ onClose, onSignedIn }) {
  const modalRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        <h3 style={{ marginTop: 0 }}>Sign in with Google</h3>
        <p style={{ marginTop: 0, color: "#4b5563", fontSize: 13 }}>
          Authentication is Google-only.
        </p>

        <div style={{ width: "100%", marginTop: 10 }}>
          <GoogleLogin
            onSuccess={handleGoogleCredential}
            onError={() => setError("Google sign-in failed")}
            useOneTap
          />
        </div>

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button onClick={onClose} style={{ padding: "6px 10px" }} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;


