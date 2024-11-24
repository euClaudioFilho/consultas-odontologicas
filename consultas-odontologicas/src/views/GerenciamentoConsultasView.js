import React from "react";
import styled from "styled-components";

const GerenciamentoConsultasView = () => {
  const consultas = [
    {
      id: 1,
      paciente: "João Silva",
      dentista: "Dr. Carlos",
      data: "2024-12-01",
      horario: "14:00",
      status: "Pendente",
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      dentista: "Dra. Maria",
      data: "2024-12-05",
      horario: "10:00",
      status: "Concluída",
    },
    {
      id: 3,
      paciente: "Carlos Souza",
      dentista: "Dr. João",
      data: "2024-12-10",
      horario: "16:00",
      status: "Cancelada",
    },
  ];

  return (
    <Container>
      <Card>
        <Title>Gerenciamento de Consultas</Title>
        <Subtitle>Lista de consultas agendadas:</Subtitle>
        <List>
          {consultas.map((consulta) => (
            <ConsultaCard key={consulta.id}>
              <Details>
                <Info>
                  <strong>Paciente:</strong> {consulta.paciente}
                </Info>
                <Info>
                  <strong>Dentista:</strong> {consulta.dentista}
                </Info>
                <Info>
                  <strong>Data:</strong> {consulta.data} às {consulta.horario}
                </Info>
                <Status status={consulta.status}>
                  <strong>Status:</strong> {consulta.status}
                </Status>
              </Details>
              <ButtonGroup>
                <ActionButton>Editar</ActionButton>
                <ActionButton remover>Cancelar</ActionButton>
              </ButtonGroup>
            </ConsultaCard>
          ))}
        </List>
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
  max-width: 800px;
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
`;

const ConsultaCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Details = styled.div`
  text-align: left;
`;

const Info = styled.p`
  font-size: 14px;
  color: #6b7c93;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.remover ? "#e63946" : "#004aad")};
  color: white;
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: ${(props) => (props.remover ? "#b00020" : "#003080")};
  }
`;

export default GerenciamentoConsultasView;
