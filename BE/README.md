# REST API (Server) For Efficacy Team Hackathon

REST API Made using Node and Express with postgres database
the database can be used using docker-compose

## Using docker-compose _Turning on the database_

* Go to server directory where the docker-compose.yml is located
* Copy .env.example to .env and use your own config (Preferably don't change the DB_DATABASE setting)
* run `docker-compose up` to turn on the database
* use Ctrl+C to stop the database
* run `docker-compose down` to turn off the database

## Migrate database

Migrating the database or you can say making the tables and columns for the database

just run `npm run migrate` in the server folder

## Run the server

running the server can be done in 2 modes:
Development:
`npm run dev`

Production:
`npm start`
