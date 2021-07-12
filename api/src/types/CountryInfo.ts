import { Field, Int, ObjectType } from "type-graphql";
import { CityInfo } from "./CityInfo";

@ObjectType()
export class CountryInfo {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field((type) => [CityInfo])
  cities: CityInfo[];
}
