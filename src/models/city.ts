import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

@Table({
  timestamps: false,
  tableName: "cities"
})
@ObjectType()
export default class City extends Model {
  @Field(type => ID)
  @PrimaryKey
  @Column(DataType.BIGINT)
  index: number

  @Field()
  @Column(DataType.TEXT)
  "Country": string

  @Field()
  @Column(DataType.TEXT)
  "City": string

  @Field()
  @Column(DataType.BIGINT)
  "Population": number

  @Field()
  @Column(DataType.REAL)
  "Latitude": number

  @Field()
  @Column(DataType.REAL)
  "Longitude": number

}