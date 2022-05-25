import City from "../models/city";
import { Arg, Query, Resolver } from "type-graphql";
import DevelopmentIndex from "../models/development_index";

@Resolver(City)
export class CityResolver {
    @Query(returns => City)
    async city(@Arg("id") id: string) {
        console.log("the id is: ", id)
        return {
            "index": 1,
            "Country": "Armenia",
            "City": "Yerevan",
            "Population": 2700000,
            "Latitude": 44,
            "Longitude": 41
        }
    }

    @Query(returns => City)
    async cityFromDB(@Arg("id") id: string) {
        console.log("the id is: ", id)
        return await City.findOne({
            where: { index: id }
        })
    }

    @Query(returns => [City])
    async cityByCountry(@Arg("Country") Country: string) {
        console.log("the country is: ", Country)
        const cities = await City.findAll({
            where: { Country }
        })
        return cities
    }

    @Query(returns => City)
    async getCityAndDI(@Arg("id") id: string) {
        console.log("the id is: ", id)
        const target = await City.findOne({
            where: { index: id }
        })
        const devIndex = await this.getDevIndex(target.Country)

        const result = {
            ...target,
            ...devIndex
        }

        return result
    }

    @Query(returns => DevelopmentIndex)
    async getDevIndex(@Arg("Country") Country: string) {
        console.log("the country is: ", Country)
        const entry = await DevelopmentIndex.findOne({
            where: { Country }
        })
        return entry
    }

}