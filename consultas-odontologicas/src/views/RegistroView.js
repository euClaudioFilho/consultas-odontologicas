import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e4f1);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #333333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Roboto', sans-serif; /* Fonte específica para o título */
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif; /* Fonte do corpo */
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif; /* Fonte para navegação e botões */
  &:hover {
    background-color: #0056b3;
  }
`;

const BackToLogin = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-family: 'Montserrat', sans-serif; /* Fonte Montserrat */
  a {
    color: #007bff;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterView = () => {
  return (
    <FormContainer>
      <Form>
        <Title>Registro de Pacientes</Title>
        <Input type="text" placeholder="Nome" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Input type="password" placeholder="Confirme a Senha" />
        <Button>Registrar</Button>
        <BackToLogin>
          Já tem uma conta? <Link to="/login">Login</Link>
        </BackToLogin>
      </Form>
    </FormContainer>
  );
};

export default RegisterView;
