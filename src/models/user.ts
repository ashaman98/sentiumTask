import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

enum Role{
  analyst = "analyst",
  moderator = "moderator"
}
@Table({
  timestamps: false,
  tableName: "users"
})
@ObjectType()
@InputType("UserInput")
export default class User extends Model {
  @Field(type => ID)
  @PrimaryKey
  @Column({type: DataType.BIGINT, autoIncrement: true})
  id: number

  @Field()
  @Column(DataType.TEXT)
  "username": string

  @Field()
  @Column(DataType.TEXT)
  "password": string

  @Field()
  @Column(DataType.TEXT)
  "name": string

  @Field()
  @Column(DataType.TEXT)
  "surname": string

  @Field()
  @Column(DataType.TEXT)
  "role": Role

}