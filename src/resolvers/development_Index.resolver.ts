import DevelopmentIndex, { DevIndexInput } from "../models/development_index";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import City from "../models/city";
import { createDevIndex, deleteDevIndex, updateDevIndex } from "../services/development_index.service";

@Resolver(DevelopmentIndex)
export class DevelopmentIndexResolver{
    @Query(returns => DevelopmentIndex)
    async devIndex(@Arg("index") index:string){
        return DevelopmentIndex.findOne({where:{index}})
    }

    @FieldResolver(()=>[City],{nullable:true})
    async cities(@Root() devIndex: DevelopmentIndex){
        const Country = devIndex.Country

        return City.findAll({
            where: {Country}
        })
    }

    @Mutation(returns => DevelopmentIndex)
    async addDevIndex(@Arg("data") newData: DevIndexInput){
        console.log("city to add:", newData);

        return createDevIndex(newData)
    }

    @Mutation(returns => DevelopmentIndex)
    async changeDevIndex(
        @Arg("index") index: number ,
        @Arg("newData")newData: DevIndexInput){
        console.log("city to update:", newData);

        return updateDevIndex(index, newData)
    }

    @Mutation(returns => String)
    async destroyDevIndex(@Arg("index") index: number){
        console.log("devIndex to delete:", index);

        await deleteDevIndex(index)

        return `devIndex with index ${index} removed`
    }
}