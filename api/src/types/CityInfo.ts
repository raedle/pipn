import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CityInfo {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => Float)
  latitude: number;

  @Field((type) => Float)
  longitude: number;

  @Field()
  dnsName: string;

  @Field((type) => Int, { nullable: true })
  hubScore?: number;
}
