# Device Management Backend

This is a NodeJS project, with the purpose to be consumed by the [Device Management Frontend project](https://github.com/arttorres0/simple-device-management-frontend). It uses Express, and Sequelize to connect to a MySQL database. It is currently deployed in Heroku, check this [URL](http://device-management-backend.herokuapp.com:80/) if you want to see the live version of this project.

## Requirements

This project was created using the following dependencies:

```
node -v
v12.14.1
npm -v
6.13.6
mysql -V
mysql  Ver 8.0.23 for Win64 on x86_64 (MySQL Community Server - GPL)
```

## Database

To create a database in order to be used in this project, login in your MySQL server (via terminal or other GUI) and create a database with the name you like (if you need a SQL script to create the database, check `src\database\create_database.sql`). This will create an empty database, with no tables. There is no need to model tables initially, as Sequelize will do it at server startup. If you change any of the tables structure, you will have to a) drop the table, lose all records and re-run the server to re-create it, or b) create a migration script (currently not developed).

After creating the database, make sure to fill the variable `DB_URI` in `.env` file, using the following structure:

```
DB_URI="mysql://{MYSQL_SERVER_USER_NAME}:{MYSQL_SERVER_USER_PASSWORD}@{MYSQL_SERVER_HOST}:{MYSQL_SERVER_PORT}/{DATABASE_NAME}"
```

## Setup

Run `npm install` to install project dependencies. Also, don't forget to create and fill an `.env` file like the `.env_example` file with the environment variables as you need.

## Running as dev

```
npm run dev
```

## Deployment

```
npm run start
```
