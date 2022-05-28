# sentiumTask
This is a test project for an interview in Sentium Consulting.

## Details: </br>

Backend: Written with `Express.js` and uses `Typescript`</br>
DB: Connects to a remote `PostgreSQL` database with credentials specified in `.env`</br>
ORM: `Sequelize`</br>
API: CRUD operations using `GraphQL` for tables `users`, `cities` and `development_index`</br>
Docker: the project is dockerized, details can be found in `dockerfile`</br>
Tests: Some unit tests implemented with `Jest`</br>
Auth: Primitive role based authorization using `JWT`. Roles: `analyst`, `moderator` (Admin)</br>
Cache: Implemented with redis (in dev) </br>

## How to run:</br>
1. `git clone` the repo</br>
2. `npm install`</br>
4. `npm start`</br>

## How to run Docker:</br>
1. `docker build . -t <your username>/node-web-app`</br>
2. make sure your image shows up in `docker images`</br>
3. `docker run -p <host port>:<tcp port> -d <your username>/node-web-app`</br>

## How to run with Redis:</br>
(Locally)</br>
1. install `redis`(can use homebrew)</br>
2. start `redis`</br>
3. add `redis` port to the `.env`</br>
4. can connect to redis console using `redis-cli`</br>

(Docker-compose)</br>
1. ```git checkout redis``` </br>
2. `docker-compose up` </br>
</br>

## How to run Unit Tests:</br>
1.`npm run test`

ENV template:
```

NODE_ENV=development
PORT=#####

PGHOST=#########
PGUSER=#########
PGDATABASE=#######
PGPASSWORD=###########
PGPORT=########

JWTSECRET=#############

REDISPORT = ######### 
```
</br>
</br>

## Future Improvments:</br>
1. Cache optimization</br>
2. GraphQL optimization with Dataloader</br>
3. Some service and util refactoring</br>
4. Add foreign keys to the db tables and implement transactions</br>
