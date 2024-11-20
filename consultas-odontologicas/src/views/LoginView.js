import React from "react";
import styled from "styled-components";

const LoginView = () => {
  return (
    <Container>
      <LoginCard>
        <Title>Bem-vindo</Title>
        <Subtitle>Faça login para continuar</Subtitle>
        <Form>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
          <Button>Entrar</Button>
          <RegisterLink>
            Não tem uma conta? <a href="/register">Registre-se</a>
          </RegisterLink>
        </Form>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff; /* Azul claro para o fundo */
`;

const LoginCard = styled.div`
  background-color: #ffffff; /* Branco para o card */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #004aad; /* Azul mais escuro para o título */
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif; /* Fonte Roboto */
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7c93; /* Cinza para o subtítulo */
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif; /* Fonte Montserrat */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d9e6; /* Cinza claro */
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9;
  font-family: 'Montserrat', sans-serif; /* Fonte Montserrat */
  &:focus {
    border-color: #004aad; /* Azul ao focar */
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #004aad; /* Azul para o botão */
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif; /* Fonte Poppins */
  &:hover {
    background-color: #003080; /* Azul mais escuro no hover */
  }
`;

const RegisterLink = styled.p`
  font-size: 14px;
  color: #6b7c93;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif; /* Fonte Montserrat */
  a {
    color: #004aad; /* Azul para o link */
    text-decoration: none;
    font-family: 'Poppins', sans-serif; /* Fonte Poppins */
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginView;
