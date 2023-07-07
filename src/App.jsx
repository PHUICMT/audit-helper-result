import "./App.css";
import * as React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import useToken from "./services/useToken";

import AuditHelper from "./pages/audit_helper/AuditHelper";
import Landing from "./pages/landing/Landing";
import LoginPage from "./pages/login/LoginPage";

function App() {
  const { setToken } = useToken();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const AuthWrapper = () => {
    return localStorage.getItem("token") ? (
      <Navigate to="/upload" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<AuthWrapper />} />
        <Route path="/upload" element={<Landing />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/audit-helper"
          element={
            localStorage.getItem("alreadysubmit") &&
            localStorage.getItem("token") ? (
              <AuditHelper />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
