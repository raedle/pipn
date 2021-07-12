import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import NordVPNDataSource from "./NordVPNDataSource";
import NordVPNResolver from "./resolvers/NordVPNResolver";
import RaspberryPiResolver from "./resolvers/RaspberryPiResolver";

export async function start(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [RaspberryPiResolver, NordVPNResolver],
  });

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      nordVPNDataSource: new NordVPNDataSource(),
    }),
  });

  const { url } = await server.listen(process.env.PORT || 4000);
  console.log(`🚀  Server ready at ${url}`);
}
