import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeView = () => {
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem("token");
        const tipoUsuario = localStorage.getItem("tipoUsuario");

        if (!token || !tipoUsuario) {
          navigate("/login");
          return;
        }

        // Define o tipo de usuário diretamente
        setTipoUsuario(tipoUsuario);
      } catch (error) {
        console.error("Erro ao obter o tipo de usuário:", error);
        navigate("/login");
      }
    };

    fetchUserType();
  }, [navigate]);

  if (!tipoUsuario) {
    return (
      <Container>
        <Card>
          <Title>Bem-vindo!</Title>
          <Subtitle>Carregando...</Subtitle>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Bem-vindo!</Title>
        {tipoUsuario === "Paciente" ? (
          <>
            <Subtitle>Suas próximas consultas:</Subtitle>
            {/* Conteúdo para Pacientes */}
          </>
        ) : tipoUsuario === "Administrador" ? (
          <>
            <Subtitle>Painel Administrativo</Subtitle>
            {/* Conteúdo para Administradores */}
          </>
        ) : (
          <>
            <Subtitle>Agenda do Dentista</Subtitle>
            {/* Conteúdo para Dentistas */}
          </>
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
