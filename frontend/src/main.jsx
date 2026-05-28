import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GoogleOAuthProviderWrapper from "./components/GoogleOAuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProviderWrapper>
      <App />
    </GoogleOAuthProviderWrapper>
  </StrictMode>,
);

