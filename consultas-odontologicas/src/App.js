import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";
import AgendamentoView from "./views/AgendamentoView";
import GerenciamentoPacientesView from "./views/GerenciamentoPacientesView";
import GerenciamentoDentistasView from "./views/GerenciamentoDentsistasView";
import GerenciamentoConsultasView from "./views/GerenciamentoConsultasView";
import HomeAdmin from "./views/HomeAdmin";
import HomeDentista from "./views/HomeDentista";
import HomePaciente from "./views/HomePaciente";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegistroView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/agendamento" element={<AgendamentoView />} />
        <Route path="/gerenciarPacientes" element={<GerenciamentoPacientesView />}/>
        <Route path="/gerenciarDentistas" element={<GerenciamentoDentistasView />}/>
        <Route path="/gerenciarConsultas" element={<GerenciamentoConsultasView />}/>
        <Route path="/homePaciente" element={<HomePaciente />}/>
        <Route path="/homeDentista" element={<HomeDentista />}/>
        <Route path="/homeAdmin" element={<HomeAdmin />}/>
      </Routes>
    </Router>
  );
}

export default App;
