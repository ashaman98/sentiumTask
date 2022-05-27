import { RedisClientType } from "@redis/client";
import * as redis from "redis"
import { config } from "./config";


let redisClient: RedisClientType

export async function getClient(){
    if(!redisClient){
        redisClient = redis.createClient({
            socket: {
                port: +config.REDISPORT
            }
        });
        await redisClient.connect()
    }
    return redisClient
}

// async function getClient(){
//     console.log(redis)
//     console.log('initializing redis')
//     const client = redis.createClient({
//         socket: {
//             port: +config.REDISPORT
//         }
//     });

//     client.on('error', (err) => console.log('Redis Client Error', err));
//     // await client.connect();

//     return client
// }

// export {client}