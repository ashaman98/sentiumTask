import { redisClient } from "../redis";

// export async function cacheHit(modelName: string,params:any){

//     const targetKey = Object.keys(params)[0]
//     const targetValue= params[targetKey]

//     const hitResult = await redisClient.lRange(`${modelName}`,0,-1)

//     console.log("hit Result:", hitResult)
//     console.log('targetKey', targetKey);
//     console.log('targetValue', targetValue)


//     const result = hitResult.map(e => JSON.parse(e)).filter(element=> {
//         console.log("parsed elem:", element)
//         return element[targetKey] === targetValue
//     });

//     console.log('cache found: ',result);


//     return result

// }

export async function cacheHit(modelName: string,params:any){

    const targetKey = Object.keys(params)[0]
    const targetValue= params[targetKey]

    console.log('targetKey', targetKey);
    console.log('targetValue', targetValue)

    try{
        const hitResult = await redisClient.hGet(`${modelName}`,targetValue)
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

    try{
        const hitResult = await redisClient.hDel(`${modelName}`,targetValue)
        console.log("hit Result:", hitResult)
        const check = await cacheHit(modelName,params)
        console.log("check delete:", check)


        // return JSON.parse(hitResult)
    }catch(err){
        console.log(err)
    }

}
