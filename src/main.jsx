import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ConversationProvider } from "./contexts/ConversationsContext.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ConversationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ConversationProvider>
    </BrowserRouter>
  </StrictMode>
);
