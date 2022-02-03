import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'



const main = async () => {
    
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getMigrator().up();
    
    const app = express();

    const RedisStore = connectRedis(session)
    const redisClient = createClient()

    app.use(
    session({
        name: 'qid',
        store: new RedisStore({ 
            client: redisClient as any,
            disableTouch: true
         }),
         cookie: {
             maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
             httpOnly: true,
             secure: __prod__ //cookie only works in https
         },
        saveUninitialized: false,
        secret: '23jf2o3fi2o3fj09jfwelfkj0923',
        resave: false,
    })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
};

main();