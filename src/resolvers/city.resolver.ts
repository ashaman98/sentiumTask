import City, { CityInput } from "../models/city";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import DevelopmentIndex from "../models/development_index";
import { newCity } from "../services/cities.service";

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

    @Mutation(returns => City)
    async addCity(@Arg("data") cityData: CityInput){
        console.log("city to add:", cityData);

        return newCity(cityData)
    }

}