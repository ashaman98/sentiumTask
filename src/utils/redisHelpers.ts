import { redisClient } from "../redis";

export async function cacheHit(modelName: string,params:any){

    const targetKey = Object.keys(params)[0]
    const targetValue= params[targetKey]

    console.log('targetKey', targetKey);
    console.log('targetValue', targetValue)

    try{
        const hitResult = await redisClient.hGet(modelName,`key-${targetValue}`)
        console.log("hit Result:", hitResult)


        return JSON.parse(hitResult)
    }catch(err){
        console.log(err)
    }

}

export async function dropFromCache(modelName: string,params:any){

    const targetKey = Object.keys(params)[0]
    const targetValue= params[targetKey]

    console.log('targetKey', targetKey);
    console.log('targetValue', targetValue)
    console.log("modelname: ", modelName);


    const result = await redisClient.hGetAll(modelName)
    console.log("cache array:", result)
    try{
        const hitResult = await redisClient.hDel(modelName,`key-${targetValue}`)
        console.log("hit Result:", hitResult)
        const check = await cacheHit(modelName,params)
        console.log("check delete:", check)


        // return JSON.parse(hitResult)
    }catch(err){
        console.log(err)
    }

}

export async function setCache(modelName: string, param: any, object: any){
    await redisClient.HSET(modelName, `key-${param}` ,JSON.stringify(object))
}