import { DevIndexInput, UpdateDevIndexInput } from "../inputTypes/devIndexInputs"
import DevelopmentIndex from "../models/development_index"

export async function getDevIndex(Country: string){
   return  DevelopmentIndex.findOne({
        where: { Country}
    })

}

export async function createDevIndex(data: DevIndexInput){
    console.log(data)
    const exists = await DevelopmentIndex.findOne({where: {Country: data.country}})

    if(exists){
        throw new Error("Entry for that country already exists")
    }

    const devIndex = await DevelopmentIndex.create({
        index: data.index,
        "HDI Rank": data.HdiRank,
        Country: data.country,
        GDI_Value: data.GdiValue,
        GDI_Group: data.GdiGroup,
        HDI_Female: data.HdiFemale,
        HDI_Male: data.HdiMale
    })

    return devIndex
}

export async function updateDevIndex(index: number, newData: UpdateDevIndexInput){
    console.log("new data: ",newData)
    console.log("change city with index: ", index)
    const devIndex = await DevelopmentIndex.findOne({where: {index}})

    if(!devIndex){
        throw new Error("City does not exist")
    }
    devIndex.set({
        index: newData.index || devIndex.index,
        "HDI Rank": newData.HdiRank || devIndex["HDI Rank"],
        Country: newData.country || devIndex.Country,
        GDI_Value: newData.GdiValue || devIndex.GDI_Value,
        GDI_Group: newData.GdiGroup || devIndex.GDI_Value,
        HDI_Female: newData.HdiFemale || devIndex.HDI_Female,
        HDI_Male: newData.HdiMale || devIndex.HDI_Male
    })

     await devIndex.save()
     console.log(devIndex);
     return devIndex
}

export async function deleteDevIndex(index: number){

    console.log("destroy city with index: ", index)
    const devIndex = await DevelopmentIndex.findOne({where: {index}})

    if(!devIndex){
        throw new Error("City does not exist")
    }

    await devIndex.destroy()
}