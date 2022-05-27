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

@InputType()
export class UpdateCityInput{
  @IsInt()
  @Min(0)
  @Field({ nullable: true })
  index: number

  @Length(2, 100)
  @Field({ nullable: true })
  country: string

  @Length(2, 100)
  @Field({ nullable: true })
  cityName: string

  @IsInt()
  @Min(0)
  @Field({ nullable: true })
  population: number

  @Field({ nullable: true })
  lat: number

  @Field({ nullable: true })
  long: number
}