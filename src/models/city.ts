import { IsInt, Length, Min } from 'class-validator'
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@Table({
  timestamps: false,
  tableName: "cities"
})
@ObjectType()
export default class City extends Model {
  @Field(type => ID)
  @PrimaryKey
  @Column({type: DataType.BIGINT, autoIncrement: true})
  index: number

  @Field({name: 'country'})
  @Column(DataType.TEXT)
  "Country": string

  @Field({name: 'cityName'})
  @Column(DataType.TEXT)
  "City": string

  @Field({name: 'population'})
  @Column(DataType.BIGINT)
  "Population": number

  @Field({name: 'lat'})
  @Column(DataType.REAL)
  "Latitude": number

  @Field({name: 'long'})
  @Column(DataType.REAL)
  "Longitude": number
}
