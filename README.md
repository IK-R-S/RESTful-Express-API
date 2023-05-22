# 🚀 RESTful Express API

Esta API foi desenvolvida utilizando o framework **Express** em um backend nodejs com o objetivo de fornecer funcionalidades para o gerenciamento de usuários e itens em um banco de dados PostgreSQL. O código da API está dividido em três arquivos: `main.js`, `server.js` e `database.js`.

<p>⠀⠀⠀</p>

![Express API](https://i.postimg.cc/BnwWK8G6/express-API.png)

## Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas:

- Node.js
- PostgreSQL

e os módulos necessários através de:
```
npm install nodemon pg express express-session body-parser cors
```

## Instalação

1. Clone este repositório:

```shell
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Navegue até o diretório do projeto:

```shell
cd nome-do-repositorio
```

3. Instale as dependências:

```shell
npm install
```

4. Configure o banco de dados PostgreSQL. Certifique-se de ter as credenciais corretas no arquivo `database.js`.

5. Inicie o servidor:

```shell
node main.js
```

6. Acesse a API em `http://localhost:3000`.

## Rotas

- `GET /`: Rota inicial da API para verificar se o servidor está online.
- `GET /status`: Rota para verificar o status da aplicação.
- `POST /api/register`: Rota para registro de usuários.
- `POST /api/login`: Rota para login de usuários.
- `GET /api/dashboard`: Rota para obter informações do usuário logado.
- `POST /api/create-item`: Rota para criar um novo item no banco de dados.
- `GET /api/item/:item`: Rota para obter informações de um item específico.

## Utilização

- Faça uma requisição POST para `/api/register` para registrar um novo usuário. Envie os dados de nome, email e senha no corpo da requisição.
- Faça uma requisição POST para `/api/login` para fazer login. Envie os dados de email e senha no corpo da requisição.
- Faça uma requisição GET para `/api/dashboard` para obter informações do usuário logado.
- Faça uma requisição POST para `/api/create-item` para criar um novo item no banco de dados. Envie os dados de nome e descrição no corpo da requisição.
- Faça uma requisição GET para `/api/item/:item` para obter informações de um item específico, substituindo `:item` pelo nome do item desejado.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
