import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import IPAnalyzer from "./pages/IPAnalyzer";
import RegulatoryChecklist from "./pages/RegulatoryChecklist";
import CompareJurisdictions from "./pages/CompareJurisdictions";
import Sources from "./pages/Sources";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import DocumentAnalyzer from "./pages/DocumentAnalyzer";

// Components
import FloatingChat from "./components/FloatingChat";
import PageNavigation from "./components/PageNavigation";
import BackToTop from "./components/BackToTop";

function AppContent() {
  const location = useLocation();

  // Show Previous / Next / Home navigation
  // on every page except Home.
  const showPageNavigation = location.pathname !== "/";

  // Show Floating AI button
  // on every page except Chat.
  const showFloatingChat = location.pathname !== "/chat";

  // Show Back To Top button
  // only on Home.
  const showBackToTop = location.pathname === "/";

  return (
    <>
      {/* Previous / Next / Home navigation */}
      {showPageNavigation && <PageNavigation />}

      {/* Back To Top button */}
      {showBackToTop && <BackToTop />}

      {/* Floating AI button */}
      {showFloatingChat && <FloatingChat />}

      <Routes>
        {/* ==================== MAIN PAGES ==================== */}

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AI Assistant */}
        <Route
          path="/chat"
          element={<Chat />}
        />

        {/* IP Analyzer */}
        <Route
          path="/ip-analyzer"
          element={<IPAnalyzer />}
        />

        {/* Regulatory Checklist */}
        <Route
          path="/regulatory-checklist"
          element={<RegulatoryChecklist />}
        />

        {/* Compare Jurisdictions */}
        <Route
          path="/compare-jurisdictions"
          element={<CompareJurisdictions />}
        />

        {/* Sources */}
        <Route
          path="/sources"
          element={<Sources />}
        />

        {/* Document Analyzer */}
        <Route
          path="/document-analyzer"
          element={<DocumentAnalyzer />}
        />

        {/* ==================== AUTHENTICATION ==================== */}

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Verify OTP */}
        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        {/* Reset Password */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* ==================== 404 ==================== */}

        <Route
          path="*"
          element={
            <div className="not-found">
              <h1>404</h1>

              <h2>Page Not Found</h2>

              <p>
                The page you're looking for doesn't exist.
              </p>
            </div>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;