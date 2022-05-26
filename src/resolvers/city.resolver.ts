import City, { CityInput } from "../models/city";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import DevelopmentIndex from "../models/development_index";
import { createCity,updateCity,deleteCity } from "../services/cities.service";
import {isAdmin} from "../middlewares/isAdmin"

@Resolver(City)
export class CityResolver {
    @Query(returns => City)
    async city(@Arg("index") index: string) {
        console.log("the index is: ", index)
        return City.findOne({where:{index}})
    }

    @FieldResolver(() => DevelopmentIndex,{nullable:true})
    async devIndex(@Root() city: City){
        console.log('doing query')
        const entry = await DevelopmentIndex.findOne({
            where: { Country: city.Country }
        })

        return entry;
    }

    @Query(returns => [City])
    async cities(@Arg("country") country: string){
        console.log("the country is: ", country)
        return City.findAll({where:{Country: country}})
    }

    // @UseMiddleware(isAdmin)
    @Mutation(returns => City)
    async addCity(@Arg("data") cityData: CityInput){
        console.log("city to add:", cityData);

        return createCity(cityData)
    }

    @Mutation(returns => City)
    async updateCity(
        @Arg("index") index: number ,
        @Arg("newData")cityData: CityInput){
        console.log("city to update:", cityData);

        return updateCity(index, cityData)
    }

    @Mutation(returns => String)
    async destroyCity(@Arg("index") index: number){
        console.log("city to delete:", index);

        await deleteCity(index)

        return `city with index ${index} destroyed`
    }

}