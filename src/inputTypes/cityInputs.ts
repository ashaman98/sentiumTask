import { IsInt, Length, Min } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class CityInput{
  @IsInt()
  @Min(0)
  @Field()
  index: number

  @Length(2, 100)
  @Field()
  country: string

  @Length(2, 100)
  @Field()
  cityName: string

  @IsInt()
  @Min(0)
  @Field()
  population: number

  @Field()
  lat: number

  @Field()
  long: number
}