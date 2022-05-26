import DevelopmentIndex from "../models/development_index";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import City from "../models/city";
import { createDevIndex, deleteDevIndex, updateDevIndex } from "../services/development_index.service";
import { DevIndexInput } from "../inputTypes/devIndexInputs";
import { getCitiesByCountry } from "../services/cities.service";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuth } from "../middlewares/isAuth";

@Resolver(DevelopmentIndex)
export class DevelopmentIndexResolver{
    // @UseMiddleware(isAuth)
    @Query(returns => DevelopmentIndex)
    async devIndex(@Arg("index") index:string){
        return DevelopmentIndex.findOne({where:{index}})
    }

    @FieldResolver(()=>[City],{nullable:true})
    async cities(@Root() devIndex: DevelopmentIndex){

        return getCitiesByCountry(devIndex.Country)
    }

    // @UseMiddleware(isAdmin)
    @Mutation(returns => DevelopmentIndex)
    async addDevIndex(@Arg("data") newData: DevIndexInput){
        console.log("city to add:", newData);

        return createDevIndex(newData)
    }

    // @UseMiddleware(isAdmin)
    @Mutation(returns => DevelopmentIndex)
    async changeDevIndex(
        @Arg("index") index: number ,
        @Arg("newData")newData: DevIndexInput){
        console.log("city to update:", newData);

        return updateDevIndex(index, newData)
    }

    // @UseMiddleware(isAdmin)
    @Mutation(returns => String)
    async destroyDevIndex(@Arg("index") index: number){
        console.log("devIndex to delete:", index);

        await deleteDevIndex(index)

        return `devIndex with index ${index} removed`
    }
}