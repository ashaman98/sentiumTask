import { redisClient } from "../redis";

export async function cacheHit(modelName: string,params:any){
   
    const targetKey = Object.keys(params)[0]
    const targetValue= params[targetKey]

    const hitResult = await redisClient.lRange(`${modelName}`,0,-1)

    console.log("hit Result:", hitResult)
    console.log('targetKey', targetKey);
    console.log('targetValue', targetValue)


    const result = hitResult.map(e => JSON.parse(e)).filter(element=> {
        console.log("parsed elem:", element)
        return element[targetKey] === targetValue
    });

    console.log('cache found: ',result);


    return result

}