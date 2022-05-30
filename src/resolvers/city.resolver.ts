import City from "../models/city";
import { CityInput, UpdateCityInput } from "../inputTypes/cityInputs"
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import DevelopmentIndex from "../models/development_index";
import { createCity,updateCity,deleteCity, getCity, getCitiesByCountry } from "../services/cities.service";
import {isAdmin} from "../middlewares/isAdmin"
import { getDevIndex } from "../services/development_index.service";
import { isAuth } from "../middlewares/isAuth";

@Resolver(City)
export class CityResolver {
    @UseMiddleware(isAuth)
    @Query(returns => City)
    async city(@Arg("index") index: string) {
        console.log("the index is: ", index)
        return getCity(index)
    }

    @FieldResolver(() => DevelopmentIndex,{nullable:true})
    async devIndex(@Root() city: City){
        console.log('doing query')

        return getDevIndex(city.Country)
    }

    @UseMiddleware(isAuth)
    @Query(returns => [City])
    async cities(@Arg("country") country: string){
        console.log("the country is: ", country)
        return getCitiesByCountry(country)
    }

    @UseMiddleware(isAdmin)
    @Mutation(returns => City)
    async addCity(@Arg("data") cityData: CityInput){
        console.log("city to add:", cityData);

        return createCity(cityData)
    }

    @UseMiddleware(isAdmin)
    @Mutation(returns => City)
    async updateCity(
        @Arg("index") index: number ,
        @Arg("newData")cityData: UpdateCityInput){
        console.log("city to update:", cityData);

        return updateCity(index, cityData)
    }

    @UseMiddleware(isAdmin)
    @Mutation(returns => String)
    async destroyCity(@Arg("index") index: number){
        console.log("city to delete:", index);

        await deleteCity(index)

        return `city with index ${index} destroyed`
    }

}