import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'
import { Field, ID, ObjectType,InputType } from 'type-graphql'

@Table({
    timestamps: false,
    tableName: "development_index"
})
@ObjectType()
export default class DevelopmentIndex extends Model {

    @Field(type => ID)
    @PrimaryKey
    @Column(DataType.BIGINT)
    index: number

    @Field({name: "HdiRank"})
    @Column(DataType.BIGINT)
    "HDI Rank": number

    @Field({name: "country"})
    @Column(DataType.TEXT)
    "Country": string

    @Field({name: "GdiValue"})
    @Column(DataType.REAL)
    "GDI_Value": number

    @Field({name: "GdiGroup"})
    @Column(DataType.BIGINT)
    "GDI_Group": number

    @Field({name: "HdiFemale"})
    @Column(DataType.REAL)
    "HDI_Female": number

    @Field({name: "HdiMale"})
    @Column(DataType.REAL)
    "HDI_Male": number

}

@InputType()
export class DevIndexInput{
  @Field()
  index: number

  @Field()
  HdiRank: number

  @Field()
  country: string

  @Field()
  GdiValue: number

  @Field()
  GdiGroup: number

  @Field()
  HdiFemale: number

  @Field()
  HdiMale: number
}