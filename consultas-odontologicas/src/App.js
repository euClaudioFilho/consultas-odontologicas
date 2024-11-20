import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";
import AgendamentoView from "./views/AgendamentoView";
import MinhasConsultasView from "./views/MinhasConsultasView";
import HomeView from "./views/HomeView";
import GerenciamentoPacientesView from "./views/GerenciamentoPacientesView";
import GerenciamentoDentistasView from "./views/GerenciamentoDentsistasView";

const usuarioMock = {
  nome: 'Renatinho Lindo, te amo',
  tipo: 'Paciente', // 'Administrador' 'Paciente'
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegistroView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/home" element={<HomeView usuario={usuarioMock} />} />
        <Route path="/agendamento" element={<AgendamentoView />} />
        <Route path="/minhasConsultas" element={<MinhasConsultasView />} />
        <Route path="/gerenciarPacientes" element={<GerenciamentoPacientesView />}/>
        <Route path="/gerenciarDentistas" element={<GerenciamentoDentistasView />}/>
      </Routes>
    </Router>
  );
}

export default App;
