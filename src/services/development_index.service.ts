import { DevIndexInput, UpdateDevIndexInput } from "../inputTypes/devIndexInputs"
import { cacheHit } from "../utils/redisHelpers"
import DevelopmentIndex from "../models/development_index"
import { redisClient } from "../redis"

export async function getDevIndex(Country: string){

    const cachedVal = await cacheHit(DevelopmentIndex.name, {Country})

    console.log("cache find:",cachedVal)

    if(!cachedVal){
        const city = await DevelopmentIndex.findOne({where:{Country}})

        console.log(JSON.stringify(city));

        await redisClient.HSET(DevelopmentIndex.name, Country ,JSON.stringify(city))

        console.log('returning from orm');

        return city
    }

    console.log('returning from redis');

    return cachedVal

}

export async function createDevIndex(data: DevIndexInput){
    console.log(data)
    const cachedVal = await cacheHit(DevelopmentIndex.name, {Country: data.country})

    if(cachedVal){
        console.log("checked redis on CityCreate");
        throw new Error("City already exists")
    }

    const exists = await DevelopmentIndex.findOne({where: {Country: data.country}})
    await redisClient.HSET(DevelopmentIndex.name, data.country ,JSON.stringify(data))

    if(exists){
        throw new Error("Entry for that country already exists")
    }

    const devIndex = await DevelopmentIndex.create({
        index: data.index,
        "HDI Rank": data.HdiRank,
        Country: data.country,
        GDI_Value: data.GdiValue,
        GDI_Group: data.GdiGroup,
        HDI_Female: data.HdiFemale,
        HDI_Male: data.HdiMale
    })

    return devIndex
}

export async function updateDevIndex(index: number, newData: UpdateDevIndexInput){
    console.log("new data: ",newData)
    console.log("change city with index: ", index)
    const devIndex = await DevelopmentIndex.findOne({where: {index}})

    if(!devIndex){
        throw new Error("City does not exist")
    }
    devIndex.set({
        index: newData.index || devIndex.index,
        "HDI Rank": newData.HdiRank || devIndex["HDI Rank"],
        Country: newData.country || devIndex.Country,
        GDI_Value: newData.GdiValue || devIndex.GDI_Value,
        GDI_Group: newData.GdiGroup || devIndex.GDI_Value,
        HDI_Female: newData.HdiFemale || devIndex.HDI_Female,
        HDI_Male: newData.HdiMale || devIndex.HDI_Male
    })

     await devIndex.save()
     console.log(devIndex);
     return devIndex
}

export async function deleteDevIndex(index: number){

    console.log("destroy city with index: ", index)
    const devIndex = await DevelopmentIndex.findOne({where: {index}})

    if(!devIndex){
        throw new Error("City does not exist")
    }

    await devIndex.destroy()
}