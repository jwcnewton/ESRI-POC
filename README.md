# ESRI-POC
A proof of concept using the ESRI JS API, Docker, Express, OAuth and Mongo DB with Karma unit tests

# Set-up

Clone the project
```bash
git clone https://github.com/jwcnewton/ESRI-POC.git
```
Then move into the folder
```bash
cd ESRI-POC
```

Update `server-variables.env` with github client id and secret. See [Setting up Github oauth](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) if you're unsure how set this up.

> Localhost callback: http://localhost:8000/callback

Then update the client id and secret

```yml
AUTHCLIENT_ID=XXX
AUTHCLIENT_SECRET=XXX
```

## Running the project

```bash
docker-compose up
```

## Running the tests

Install Karma test runnner globally

```bash
npm i -g karma
```

Then move into the client folder

```bash
cd ESRI-POC/client
```

To start Karma
```bash
karma start
```

## Client APP

> localhost:8080

## API

> localhost:8000

# Dependencies 

[Docker](https://www.docker.com/)
