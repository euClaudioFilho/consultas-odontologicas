import React from "react";
import styled from "styled-components";

const GerenciamentoDentistasView = () => {
  const dentistas = [
    { id: 1, nome: "Dr. João", especialidade: "Ortodontia" },
    { id: 2, nome: "Dra. Maria", especialidade: "Endodontia" },
    { id: 3, nome: "Dr. Carlos", especialidade: "Periodontia" },
  ];

  return (
    <Container>
      <Card>
        <Title>Gerenciamento de Dentistas</Title>
        <Subtitle>Lista de dentistas cadastrados:</Subtitle>
        <AddButton>Adicionar Novo Dentista</AddButton>
        <List>
          {dentistas.map((dentista) => (
            <DentistaCard key={dentista.id}>
              <Info>
                <strong>Nome:</strong> {dentista.nome}
              </Info>
              <Info>
                <strong>Especialidade:</strong> {dentista.especialidade}
              </Info>
              <ButtonGroup>
                <ActionButton>Editar</ActionButton>
                <ActionButton remover>Excluir</ActionButton>
              </ButtonGroup>
            </DentistaCard>
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

const DentistaCard = styled.div`
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

const AddButton = styled.button`
  background-color: #008000;
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #005700;
  }
`;

export default GerenciamentoDentistasView;
