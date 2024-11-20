import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MinhasConsultasView = () => {
  const navigate = useNavigate();

  const consultas = [
    {
      id: 1,
      data: "2024-12-01",
      horario: "14:00",
      dentista: "Dr. João",
      status: "Pendente",
    },
    {
      id: 2,
      data: "2024-12-05",
      horario: "09:00",
      dentista: "Dra. Maria",
      status: "Concluída",
    },
    {
      id: 3,
      data: "2024-12-10",
      horario: "16:00",
      dentista: "Dr. João",
      status: "Cancelada",
    },
  ];

  return (
    <Container>
      <Card>
        <Title>Minhas Consultas</Title>
        <List>
          {consultas.map((consulta) => (
            <ConsultaCard key={consulta.id}>
              <Info>
                <strong>Data:</strong> {consulta.data} às {consulta.horario}
              </Info>
              <Info>
                <strong>Dentista:</strong> {consulta.dentista}
              </Info>
              <Status status={consulta.status}>
                <strong>Status:</strong> {consulta.status}
              </Status>
            </ConsultaCard>
          ))}
        </List>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
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
  font-family: 'Roboto', sans-serif;
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

const Info = styled.p`
  font-size: 14px;
  color: #6b7c93;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
  background-color: #004aad;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  &:hover {
    background-color: #003080;
  }
`;

export default MinhasConsultasView;
