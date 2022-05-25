import City, { CityInput } from "../models/city";

export async function newCity(data: CityInput){
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