import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AgendamentoView = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Title>Agendar Consulta</Title>
        <Subtitle>Selecione os detalhes para sua consulta</Subtitle>
        <Form>
          <Label>Data:</Label>
          <Input type="date" required />
          <Label>Horário:</Label>
          <Input type="time" required />
          <Label>Dentista:</Label>
          <Select required>
            <option value="">Selecione um dentista</option>
            <option value="Dr. João">Dr. João</option>
            <option value="Dra. Maria">Dra. Maria</option>
          </Select>
          <Label>Motivo da consulta:</Label>
          <Textarea placeholder="Descreva brevemente o motivo da consulta" />
          <Button type="button" onClick={() => navigate("/minhas-consultas")}>
            Confirmar Agendamento
          </Button>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            Cancelar
          </CancelButton>
        </Form>
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
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #004aad;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7c93;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #6b7c93;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d9e6;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  &:focus {
    border-color: #004aad;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #d1d9e6;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #f9f9f9;
  &:focus {
    border-color: #004aad;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #d1d9e6;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background-color: #f9f9f9;
  resize: none;
  &:focus {
    border-color: #004aad;
    outline: none;
  }
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

const CancelButton = styled(Button)`
  background-color: #dc3545; 
  &:hover {
    background-color: #a71d2a; 
  }
`;

export default AgendamentoView;
