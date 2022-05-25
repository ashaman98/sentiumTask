import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import express from "express"
import { buildSchema } from "type-graphql";
import { config } from "./config"
import { sequelize } from "./db"
import { CityResolver } from "./resolvers/city.resolver";

const app = express();

// const server = new ApolloServer({
//     schema,
//     playground: true,
//   });


async function init() {
    await sequelize.sync();



    const schema = await buildSchema({
        resolvers: [CityResolver],
    });
    const server = new ApolloServer({
        schema
    })
    await server.start()
    server.applyMiddleware({app})
    console.log("path: ", server.graphqlPath)

    app.listen(config.PORT, () => {
        console.log(`server started at http://localhost:${config.PORT}`);
    });



}

init()
