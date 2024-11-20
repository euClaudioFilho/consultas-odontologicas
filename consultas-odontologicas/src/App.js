import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegistroView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
