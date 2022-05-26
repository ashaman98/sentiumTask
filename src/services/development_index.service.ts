import DevelopmentIndex,{DevIndexInput} from "../models/development_index"

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

export async function updateDevIndex(index: number, newData: DevIndexInput){
    console.log("new data: ",newData)
    console.log("change city with index: ", index)
    const devIndex = await DevelopmentIndex.findOne({where: {index}})

    if(!devIndex){
        throw new Error("City does not exist")
    }
    devIndex.set({
        index: newData.index,
        "HDI Rank": newData.HdiRank,
        Country: newData.country,
        GDI_Value: newData.GdiValue,
        GDI_Group: newData.GdiGroup,
        HDI_Female: newData.HdiFemale,
        HDI_Male: newData.HdiMale
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