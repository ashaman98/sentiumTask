import { Model } from "sequelize-typescript";
import { redisClient } from "../redis";

export async function cacheHit(modelName: string,params:any){
    // if format is client.pushL('modelName',json.stringify(data))
    /*
        params = {
            index:,
            Country:,
            username:
            City:
        }
    */
    let targetKey: string
    let targetValue: string
    Object.keys(params).forEach(key => {
        if (params[key] !== null) {
            targetKey = key
            targetValue = params[key]
        }
        delete params[key];
    });

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