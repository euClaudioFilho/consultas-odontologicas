import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";
import AgendamentoView from "./views/AgendamentoView";
import MinhasConsultasView from "./views/MinhasConsultasView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegistroView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/agendamento" element={<AgendamentoView />} />
        <Route path="/minhasConsultas" element={<MinhasConsultasView />} />
      </Routes>
    </Router>
  );
}

export default App;
