import { Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript'
import { Field, ID, ObjectType } from 'type-graphql'

enum Role{
  analyst = "analyst",
  moderator = "moderator"
}
@Table({
  timestamps: false,
  tableName: "users"
})
@ObjectType()
export default class User extends Model {
  @Field(type => ID)
  @PrimaryKey
  @Column({type: DataType.BIGINT, autoIncrement: true})
  id: number

  @Field()
  @Column(DataType.TEXT)
  "username": string

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
