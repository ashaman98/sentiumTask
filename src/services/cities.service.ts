import City from "../models/city";
import { CityInput, UpdateCityInput } from "../inputTypes/cityInputs"
import {redisClient}  from "../redis";
import { cacheHit } from "../utils/redisHelpers";



export async function getCity(index: string){

    const result = await redisClient.lRange(City.name, 0, -1)
    console.log("cache array:", result)

    const cachedVal = await cacheHit(City.name, {index})

    console.log("cache find:",cachedVal)

    if(!cachedVal.length){
        const city = await City.findOne({where:{index}})

        console.log(JSON.stringify(city));

        await redisClient.lPush(City.name, JSON.stringify(city))

        console.log('returning from orm');

        return city
    }

    console.log('returning from redis');

    return cachedVal[0]
}

export async function getCitiesByCountry(Country: string){
    return City.findAll({where:{Country}})
}

export async function createCity(data: CityInput){
    console.log(data)
    const exists = await City.findOne({where: {City: data.cityName}})

    if(exists){
        throw new Error("City already exists")
    }

    const city = await City.create({
        Country: data.country,
        City: data.cityName,
        Population: data.population,
        Latitude: data.lat,
        Longitude: data.long,
        index: data.index
    })

    return city

}

export async function updateCity(index: number, newData: UpdateCityInput){
    console.log("new data: ",newData)
    console.log("change city with index: ", index)
    const city = await City.findOne({where: {index}})

    if(!city){
        throw new Error("City does not exist")
    }
    city.set({
        Country: newData.country || city.Country,
        City: newData.cityName || city.City,
        Population: newData.population || city.Population,
        Latitude: newData.lat || city.Latitude,
        Longitude: newData.long || city.Longitude,
        index: newData.index || city.index
    })

     await city.save()
     console.log(city);
     return city
}

export async function deleteCity(index: number){

    console.log("destroy city with index: ", index)
    const city = await City.findOne({where: {index}})

    if(!city){
        throw new Error("City does not exist")
    }

    await city.destroy()
}