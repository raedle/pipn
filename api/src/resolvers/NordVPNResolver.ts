import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../Context";
import { CountryInfo } from "../types/CountryInfo";
import Status from "../types/Status";
import { executeCommand } from "../utils/CommandUtils";

@Resolver(Status)
export default class NordVPNResolver {
  @Query((returns) => Status)
  async status(): Promise<Status> {
    const result = await executeCommand("nordvpn status");
    return Status.parse(result);
  }

  @Query((returns) => [CountryInfo])
  async countryInfos(@Ctx() context: Context) {
    return await context.dataSources.nordVPNDataSource.getCountryIDs();
  }

  @Mutation((returns) => Boolean)
  async connect(
    @Arg("country", { nullable: true }) country?: string,
    @Arg("city", { nullable: true }) city?: string
  ): Promise<boolean> {
    console.log(`connect ${country}, ${city}`);
    let connectTo = "";
    if (country != null) {
      connectTo += ` ${country.replace(/\s/, "_")}`;
    }
    if (city != null) {
      connectTo += ` ${city.replace(/\s/, "_")}`;
    }
    console.log(`connectTo ${connectTo}`);
    await executeCommand(`nordvpn connect${connectTo}`);
    return true;
  }

  @Mutation((returns) => Boolean)
  async disconnect(): Promise<Boolean> {
    console.log("disconnect");
    await executeCommand("nordvpn disconnect");
    return true;
  }
}
