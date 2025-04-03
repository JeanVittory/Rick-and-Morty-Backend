# Rick and Morty API

## Tech

- Typescript - A language for application-scale JavaScript.
- Node.js - Evented I/O for the backend.
- Express - Fast node.js network app framework.
- Graphql - A query language for APIs and a runtime for fulfilling those queries with your existing data.
- Redis - Used as a database, cache, streaming engine, message broker, and more.
- Sequelize - A modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more
- Axios - A simple promise based HTTP client for the browser and node.js.

## Installation

To run the application please follow these steps:

```sh
git clone https://github.com/JeanVittory/Rick-and-Morty-Backend.git
cd Rick-and-Morty-Backend
npm i
```

To get started, make sure PostgreSQL and Redis is up and running on your local system. If you're using Linux Ubuntu, follow these steps:

## Redis

```sh
sudo apt update && sudo apt upgrade
sudo apt install redis-server
sudo systemctl status redis-server
redis-cli ping
```

The final command should return PONG if the connection is successful.

# Postgres

```sh
sudo apt update && sudo apt upgrade
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql
sudo systemctl start postgresql
sudo -u postgres psql
CREATE USER mi_usuario WITH PASSWORD 'una_contraseña_segura';
CREATE DATABASE mi_base_de_datos OWNER mi_usuario;
GRANT ALL PRIVILEGES ON DATABASE mi_base_de_datos TO mi_usuario;
```

If the connection is succesful you need to create your user and database:

```sh
sudo -u postgres psql
CREATE USER mi_usuario WITH PASSWORD 'una_contraseña_segura';
CREATE DATABASE mi_base_de_datos OWNER mi_usuario;
GRANT ALL PRIVILEGES ON DATABASE mi_base_de_datos TO mi_usuario;
```

With these steps now you need to feed your .env file following the structure provided in .env.example file:

```sh
PORT=4040
DATABASE=mi_base_de_datos
DB_USERNAME=mi_usuario
DB_PASSWORD=una_contraseña_segura
```

Then you can run your application:

```sh
npm run dev
```

It will automatically seed your database with 15 character from Rick and Morty API. If you want to check these characters follow these steps:

```sh
sudo -u postgres psql
\l
\c {database name in your env file}
\dt
SELECT id, name, status, species, gender, origin FROM "Characters" LIMIT 15;
```

If you get stuck at any step, feel free to reach out to me via vittory.dev@gmail.com or by creating an issue.
