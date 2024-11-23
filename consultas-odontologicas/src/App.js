import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegistroView from "./views/RegistroView";
import AgendamentoView from "./views/AgendamentoView";
import MinhasConsultasView from "./views/MinhasConsultasView";
import HomeView from "./views/HomeView";
import GerenciamentoPacientesView from "./views/GerenciamentoPacientesView";
import GerenciamentoDentistasView from "./views/GerenciamentoDentsistasView";
import GerenciamentoConsultasView from "./views/GerenciamentoConsultasView";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegistroView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/agendamento" element={<AgendamentoView />} />
          <Route path="/minhasConsultas" element={<MinhasConsultasView />} />
          <Route path="/gerenciarPacientes" element={<GerenciamentoPacientesView />}/>
          <Route path="/gerenciarDentistas" element={<GerenciamentoDentistasView />}/>
          <Route path="/gerenciarConsultas" element={<GerenciamentoConsultasView />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
