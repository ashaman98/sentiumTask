import DevelopmentIndex from "../models/development_index";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import City from "../models/city";

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
}