import { IsInt, Length, Min } from "class-validator"
import { Field, InputType } from "type-graphql"

enum Role{
    analyst = "analyst",
    moderator = "moderator"
}

@InputType()
export class UserInput{
  @IsInt()
  @Min(0)
  id: number

  @Length(2, 100)
  @Field()
  "username": string

  @Length(2, 100)
  @Field()
  "password": string

  @Length(2, 100)
  @Field()
  "name": string

  @Length(2, 100)
  @Field()
  "surname": string

  @Field()
  "role": Role
}


@InputType()
export class UpdateUserInput{

  @Length(2, 100)
  @Field()
  "username": string

  @Length(2, 100)
  @Field()
  "password": string

  @Length(2, 100)
  @Field()
  "name": string

  @Length(2, 100)
  @Field()
  "surname": string

}

@InputType()
export class LoginUserInput{

  @Length(2, 100)
  @Field()
  "username": string

  @Length(2, 100)
  @Field()
  "password": string

}