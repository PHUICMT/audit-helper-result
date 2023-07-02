import "./App.css";
import { Route, Routes } from "react-router-dom";

import AuditHelper from "./pages/audit_helper/AuditHelper";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/audit-helper" element={<AuditHelper/>} />
      </Routes>
    </div>
  );
}

export default App;
