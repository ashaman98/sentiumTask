import { ApolloServer } from "apollo-server-express";
import {expressjwt} from "express-jwt"
import express from "express"
import { buildSchema } from "type-graphql";
import { config } from "./config"
import { sequelize } from "./db"
import User from "./models/user";
import { CityResolver } from "./resolvers/city.resolver";
import { DevelopmentIndexResolver } from "./resolvers/development_Index.resolver";
import { isObjectType } from "graphql";
import { UserResolver } from "./resolvers/user.resolver";
import City from "./models/city";

const app = express();


async function init() {

    // const auth = expressjwt({secret: config.JWTSECRET, algorithms:["HS256"]})
    // console.log(1)

    await sequelize.sync();
    // await User.sync({force:true})

    const schema = await buildSchema({
        resolvers: [CityResolver, DevelopmentIndexResolver, UserResolver],
    });
    console.log(4)
    console.log(Object.values(schema.getTypeMap()).filter(isObjectType))

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    })

    await server.start()


    server.applyMiddleware({app})


    console.log("path: ", server.graphqlPath)

    app.listen(config.PORT, () => {
        console.log(`server started at http://localhost:${config.PORT}`);
    });



}

init()
