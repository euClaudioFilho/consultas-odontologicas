import React from "react";
import styled from "styled-components";

const GerenciamentoPacientesView = () => {
  const pacientes = [
    { id: 1, nome: "João Silva", email: "joao@gmail.com" },
    { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com" },
    { id: 3, nome: "Carlos Souza", email: "carlos@gmail.com" },
  ];

  return (
    <Container>
      <Card>
        <Title>Gerenciamento de Pacientes</Title>
        <Subtitle>Lista de pacientes cadastrados:</Subtitle>
        <List>
          {pacientes.map((paciente) => (
            <PacienteCard key={paciente.id}>
              <Info>
                <strong>Nome:</strong> {paciente.nome}
              </Info>
              <Info>
                <strong>Email:</strong> {paciente.email}
              </Info>
              <ButtonGroup>
                <ActionButton>Editar</ActionButton>
                <ActionButton remover>Remover</ActionButton>
              </ButtonGroup>
            </PacienteCard>
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

const PacienteCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.p`
  font-size: 14px;
  color: #6b7c93;
  margin-bottom: 5px;
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

export default GerenciamentoPacientesView;
