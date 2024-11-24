import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import consultaService from "../services/consultaService";

const HomeView = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario")); 
  const [dadosPaciente, setDadosPaciente] = useState([]);
  const [dadosDentista, setDadosDentista] = useState([]);
  const [dadosAdmin, setDadosAdmin] = useState({ consultasHoje: 0, pacientes: 0, dentistas: 0 });

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        if (usuario.tipo === "Paciente") {
          const pacienteId = usuario.id;
          if (!pacienteId) {
            throw new Error("ID do paciente não encontrado. Faça login novamente.");
          }
          const consultas = await consultaService.getConsultasPaciente(pacienteId);
          setDadosPaciente(consultas);
        } else if (usuario.tipo === "Dentista") {
          const dentistaId = usuario.id;
          if (!dentistaId) {
            throw new Error("ID do dentista não encontrado. Faça login novamente.");
          }
          const consultas = await consultaService.getConsultasDentista(dentistaId);
          setDadosDentista(consultas);
        } else if (usuario.tipo === "Admin") {
          const consultasHoje = await consultaService.getConsultasHoje();
          const pacientes = await consultaService.getTotalPacientes();
          const dentistas = await consultaService.getTotalDentistas();
          setDadosAdmin({ consultasHoje, pacientes, dentistas });
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar os dados. Tente novamente mais tarde.");
      }
    };

    fetchDados();
  }, [usuario]);

  const renderConteudoPorTipoUsuario = () => {
    switch (usuario.tipo) {
      case "Paciente":
        return (
          <>
            <Subtitle>Suas próximas consultas:</Subtitle>
            <List>
              {dadosPaciente.length > 0 ? (
                dadosPaciente.map((consulta) => (
                  <ConsultaCard key={consulta.id}>
                    <Info>
                      <strong>Data:</strong>{" "}
                      {new Date(consulta.dataHora).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Info>
                    <Info>
                      <strong>Dentista:</strong> {consulta.dentistaNome || consulta.dentistaId}
                    </Info>
                    <Info>
                      <strong>Descrição:</strong> {consulta.descricao || "N/A"}
                    </Info>
                    <Status status={consulta.status}>
                      <strong>Status:</strong> {consulta.status || "Pendente"}
                    </Status>
                  </ConsultaCard>
                ))
              ) : (
                <EmptyMessage>Você não possui consultas futuras.</EmptyMessage>
              )}
            </List>
            <Button onClick={() => navigate("/agendamento")}>Agendar Nova Consulta</Button>
          </>
        );
      case "Dentista":
        return (
          <>
            <Subtitle>Agenda de Consultas</Subtitle>
            <List>
              {dadosDentista.length > 0 ? (
                dadosDentista.map((consulta) => (
                  <ConsultaCard key={consulta.id}>
                    <Info>
                      <strong>Paciente:</strong> {consulta.pacienteNome || consulta.pacienteId}
                    </Info>
                    <Info>
                      <strong>Data:</strong>{" "}
                      {new Date(consulta.dataHora).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Info>
                    <Info>
                      <strong>Status:</strong> {consulta.status || "Pendente"}
                    </Info>
                    <Info>
                      <strong>Descrição:</strong> {consulta.descricao || "N/A"}
                    </Info>
                  </ConsultaCard>
                ))
              ) : (
                <EmptyMessage>Você não possui consultas agendadas.</EmptyMessage>
              )}
            </List>
            <Button onClick={() => navigate("/agenda")}>Gerenciar Consultas</Button>
          </>
        );
      case "Admin":
        return (
          <>
            <Subtitle>Painel Administrativo</Subtitle>
            <List>
              <AdminCard>
                <Info>
                  <strong>Consultas Hoje:</strong> {dadosAdmin.consultasHoje}
                </Info>
              </AdminCard>
              <AdminCard>
                <Info>
                  <strong>Pacientes Cadastrados:</strong> {dadosAdmin.pacientes}
                </Info>
              </AdminCard>
              <AdminCard>
                <Info>
                  <strong>Dentistas Cadastrados:</strong> {dadosAdmin.dentistas}
                </Info>
              </AdminCard>
            </List>
            <Button onClick={() => navigate("/gerenciarConsultas")}>Gerenciar Consultas</Button>
            <Button onClick={() => navigate("/gerenciarPacientes")}>Gerenciar Pacientes</Button>
            <Button onClick={() => navigate("/gerenciarDentistas")}>Gerenciar Dentistas</Button>
          </>
        );
      default:
        return <Subtitle>Bem-vindo! Navegue pelo sistema.</Subtitle>;
    }
  };

  return (
    <Container>
      <Card>
        <Title>Bem-vindo, {usuario.nome}!</Title>
        {renderConteudoPorTipoUsuario()}
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #004aad;
  margin-bottom: 20px;
  font-family: "Roboto", sans-serif;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7c93;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const ConsultaCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const AdminCard = styled(ConsultaCard)`
  text-align: center;
`;

const Info = styled.p`
  font-size: 14px;
  color: #6b7c93;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  color: #6b7c93;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
`;

const Button = styled.button`
  background-color: #004aad;
  color: white;
  font-size: 16px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #003080;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #a71d2a;
  }
  margin-left: 50px
`;

const Status = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) =>
    props.status === "Pendente"
      ? "#ffa500"
      : props.status === "Concluída"
      ? "#28a745"
      : "#dc3545"};
  font-family: "Montserrat", sans-serif;
`;

export default HomeView;