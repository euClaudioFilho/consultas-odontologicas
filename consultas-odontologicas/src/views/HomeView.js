import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    
    const tipo = localStorage.getItem("tipoUsuario");
    if (tipo) {
      setTipoUsuario(tipo); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container>
      <Card>
        <Title>Bem-vindo!</Title>
        {tipoUsuario === "Paciente" ? (
          <>
            <Subtitle>Suas próximas consultas:</Subtitle>
            <List>
              <ConsultaCard>
                <Info>
                  <strong>Data:</strong> 2024-12-01 às 14:00
                </Info>
                <Info>
                  <strong>Dentista:</strong> Dr. João
                </Info>
              </ConsultaCard>
              <ConsultaCard>
                <Info>
                  <strong>Data:</strong> 2024-12-05 às 09:00
                </Info>
                <Info>
                  <strong>Dentista:</strong> Dra. Maria
                </Info>
              </ConsultaCard>
            </List>
            <Button onClick={() => navigate("/minhasConsultas")}>
              Ver Minhas Consultas
            </Button>
            <Button onClick={() => navigate("/agendamento")}>
              Agendar Nova Consulta
            </Button>
          </>
        ) : tipoUsuario === "Administrador" ? (
          <>
            <Subtitle>Painel Administrativo</Subtitle>
            <List>
              <AdminCard>
                <Info>
                  <strong>Consultas Hoje:</strong> 12
                </Info>
              </AdminCard>
              <AdminCard>
                <Info>
                  <strong>Pacientes Cadastrados:</strong> 150
                </Info>
              </AdminCard>
              <AdminCard>
                <Info>
                  <strong>Dentistas Cadastrados:</strong> 5
                </Info>
              </AdminCard>
            </List>
            <Button onClick={() => navigate("/gerenciarConsultas")}>
              Gerenciar Consultas
            </Button>
            <Button onClick={() => navigate("/gerenciarPacientes")}>
              Gerenciar Pacientes
            </Button>
            <Button onClick={() => navigate("/gerenciarDentistas")}>
              Gerenciar Dentistas
            </Button>
          </>
        ) : tipoUsuario === "Dentista" ? (
          <>
            <Subtitle>Agenda do Dentista</Subtitle>
            <List>
              <AdminCard>
                <Info>
                  <strong>Próxima Consulta:</strong> 2024-12-01 às 14:00
                </Info>
              </AdminCard>
              <AdminCard>
                <Info>
                  <strong>Total de Consultas Hoje:</strong> 10
                </Info>
              </AdminCard>
            </List>
            <Button onClick={() => navigate("/minhasConsultas")}>
              Ver Agenda Completa
            </Button>
          </>
        ) : (
          <Subtitle>Carregando...</Subtitle>
        )}
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

const Button = styled.button`
  background-color: #004aad;
  color: white;
  font-size: 16px;
  padding: 10px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #003080;
  }
`;

export default HomeView;
