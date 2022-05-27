import City from "../models/city";
import { CityInput, UpdateCityInput } from "../inputTypes/cityInputs"
import {getClient}  from "../redis";



export async function getCity(index: string){
    const city = await City.findOne({where:{index}})

    const client = await getClient()

    console.log(JSON.stringify(city));


    await client.set(`city:${index}`, JSON.stringify(city));

    const redisCache = await client.get(`city:${index}`)
    console.log("redis:", redisCache);


    return city
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