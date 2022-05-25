import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

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

    @Field()
    @Column(DataType.BIGINT)
    "HDI Rank": number

    @Field()
    @Column(DataType.TEXT)
    "Country": string

    @Field()
    @Column(DataType.REAL)
    "GDI_Value": number

    @Field()
    @Column(DataType.BIGINT)
    "GDI_Group": number

    @Field()
    @Column(DataType.REAL)
    "HDI_Female": number

    @Field()
    @Column(DataType.REAL)
    "HDI_Male": number

}