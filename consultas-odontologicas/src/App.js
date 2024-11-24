import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";
import AgendamentoView from "./views/AgendamentoView";
import HomeView from "./views/HomeView";
import GerenciamentoPacientesView from "./views/GerenciamentoPacientesView";
import GerenciamentoDentistasView from "./views/GerenciamentoDentsistasView";
import GerenciamentoConsultasView from "./views/GerenciamentoConsultasView";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegistroView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/agendamento" element={<AgendamentoView />} />
        <Route path="/gerenciarPacientes" element={<GerenciamentoPacientesView />}/>
        <Route path="/gerenciarDentistas" element={<GerenciamentoDentistasView />}/>
        <Route path="/gerenciarConsultas" element={<GerenciamentoConsultasView />}/>
      </Routes>
    </Router>
  );
}

export default App;
