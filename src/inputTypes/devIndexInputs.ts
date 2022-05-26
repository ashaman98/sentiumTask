import { IsInt, Length, Min } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class DevIndexInput{
  @IsInt()
  @Min(0)
  @Field()
  index: number

  @IsInt()
  @Min(0)
  @Field()
  HdiRank: number

  @Length(2, 100)
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