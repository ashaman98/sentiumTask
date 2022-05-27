import { RedisClientType } from "@redis/client";
import * as redis from "redis"
import { config } from "./config";


const redisClient = redis.createClient({
    socket: {
        port: +config.REDISPORT
    }
});

export {redisClient}
