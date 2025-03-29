Template de API REST com TypeScript, Express, Node.js e Prisma
==============================================================

🚀 Introdução
-------------

Este projeto é um template de API REST desenvolvido com TypeScript, Express, Node.js e Prisma, focado em autenticação e gerenciamento de usuários. Foi criado para servir como base sólida para projetos futuros, incorporando boas práticas de desenvolvimento e arquitetura limpa.

✨ Principais Funcionalidades
----------------------------

-   **Autenticação JWT** com tokens de acesso e refresh

-   **CRUD de Usuários** com diferentes níveis de permissão

-   **Prisma ORM** com múltiplos schemas PostgreSQL

-   **Validação de DTOs** para entrada de dados

-   **Middleware de Erros** centralizado

-   **Sistema de Permissões** (Admin, Staff, Usuário comum)

-   **Migrations** organizadas para evolução do banco de dados

🛠️ Tecnologias Utilizadas
--------------------------

-   **Backend**: Node.js + Express

-   **Linguagem**: TypeScript

-   **ORM**: Prisma

-   **Banco de Dados**: PostgreSQL

-   **Autenticação**: JWT (JSON Web Tokens)

-   **Testes**: (A implementar)

-   **Documentação**: (A implementar)

📦 Estrutura do Projeto
-----------------------

```
src/
├── controllers/    # Lógica dos endpoints
├── services/       # Regras de negócio
├── repositories/   # Acesso ao banco de dados
├── middlewares/    # Middlewares de autenticação e autorização
├── routes/         # Definição das rotas
├── errors/         # Tratamento de erros customizados
├── utils/          # Utilitários e enums
prisma/             # Migrations e schema do Prisma
```

🔧 Como Usar
------------

1.  **Pré-requisitos**:

    -   Node.js (v18+)

    -   PostgreSQL

    -   Yarn ou npm

2.  **Instalação**:

    ```

    git clone [seu-repositorio]
    cd template-typescript-api
    yarn install
    ```

3.  **Configuração**:

    -   Crie um arquivo `.env` baseado no `.env.example`

    -   Configure as variáveis de banco de dados e JWT

4.  **Execução**:
    Desenvolvimento
```
    yarn dev:start
```

📚 Documentação da API
----------------------

(A implementar - Swagger/Postman)

🤝 Contribuição
---------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.