import { RedisClientType } from "@redis/client";
import { hostname } from "os";
import * as redis from "redis"
import { config } from "./config";


const redisClient = redis.createClient({
    socket: {
        port: +config.REDISPORT,
        host: 'redis'
    }
});

export {redisClient}
