
# Consultas Odontológicas API
![C#](https://img.shields.io/badge/C%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-%235C2D91.svg?style=for-the-badge&logo=dotnet&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity%20Framework-%23005A9C.svg?style=for-the-badge&logo=.net&logoColor=white)
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Styled Components](https://img.shields.io/badge/Styled%20Components-%23DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)

📋 **Descrição do Projeto**
O projeto consiste em uma solução desenvolvida para gerenciar consultas odontológicas de forma eficiente e segura. O sistema fornece uma interface robusta para controle de usuários (pacientes, dentistas e administradores), agendamento de consultas, e gerenciamento de informações, garantindo uma experiência integrada entre o front-end e o back-end.

Este projeto foi construído utilizando ASP.NET Core com banco de dados SQLite para o back-end, além de serviços integrados para autenticação JWT e autorização baseada em políticas. O front-end, que consome esta API, utiliza o React para criar uma interface intuitiva para os usuários.

---

🚀 **Funcionalidades**

**Gerenciamento de Usuários**:
- Registro de pacientes, dentistas e administradores.
- Login seguro com autenticação baseada em JWT.
- Listagem, atualização e exclusão de usuários.

**Agendamento de Consultas**:
- Agendamento de consultas odontológicas.
- Listagem de consultas por paciente ou dentista.
- Atualização de status das consultas ("Concluída" ou "Cancelada").
- Exclusão de consultas.

**Painel Administrativo**:
- Criação de usuários do tipo dentista no sistema.
- Informações sumarizadas sobre o estado do projeto (Número de consultas agendadas, Número de dentistas e pacientes cadastrados).

---

🛠️ **Tecnologias Utilizadas**

**Backend**
- Framework: ASP.NET Core
- Banco de Dados: SQLite
- Autenticação: JWT (JSON Web Token)
- ORM: Entity Framework Core

**Frontend**
- Framework: React
- Bibliotecas: Axios para consumo da API, Styled Components para estilização.

---

⚙️ **Configuração do Ambiente**

**Requisitos**
- .NET SDK 8.0 ou superior
- Node.js (para executar o front-end)
- SQLite

### **Configuração do Backend**
1. Clone o repositório:
    ```bash
    git clone https://github.com/euClaudioFilho/consultas-odontologicas
    cd consultas-odontologicas/backend/ConsultasOdontologicasAPI
    ```

2. Restaure as dependências e execute o sistema:
    ```bash
    dotnet restore
    dotnet ef database update
    dotnet run
    ```
3. A API será iniciada em `http://localhost:5112`.

### **Configuração do Frontend**
1. Navegue até a pasta do front-end:
    ```bash
    cd consultas-odontologicas
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute o front-end:
    ```bash
    npm run start
    ```
4. Acesse a interface em `http://localhost:3000`.

---

🔒 **Autenticação e Autorização**
- A autenticação é feita utilizando JWT.
- Cada rota é protegida por políticas de autorização:
  - **Admin**: Acesso exclusivo a funcionalidades administrativas.
  - **Dentista**: Acesso às rotas de gerenciamento de consultas e pacientes.
  - **Paciente**: Acesso a consultas e informações pessoais.
- No momento do login, um token é gerado e armazenado no `localStorage` para uso nas requisições futuras.

---

🚧 **Padrões de Desenvolvimento**

**Backend**:
- Utilização de políticas de autorização com base em roles (Admin, Dentista e Paciente).
- Gerenciamento seguro de senhas com bcrypt.

**Frontend**:
- Interceptores Axios configurados para autenticação JWT.
- Armazenamento seguro de tokens no `localStorage`.

---

📄 **Licença**
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

---

✉️ **Contato**
Se você tiver dúvidas ou sugestões, entre em contato:
- **E-mail**: claudiosrfilho@gmail.com
