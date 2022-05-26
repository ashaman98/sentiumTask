import { ApolloServer } from "apollo-server-express";
import express from "express"
import { buildSchema } from "type-graphql";
import { config } from "./config"
import { sequelize } from "./db"
import { CityResolver } from "./resolvers/city.resolver";
import { DevelopmentIndexResolver } from "./resolvers/development_Index.resolver";
import { UserResolver } from "./resolvers/user.resolver";



const app = express();


async function init() {

    await sequelize.sync();
    // await User.sync({force:true})

    const schema = await buildSchema({
        resolvers: [CityResolver, DevelopmentIndexResolver, UserResolver],
    });

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
