import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "./resolvers/Product.ts";

const __dirname = decodeURIComponent(
  path.dirname(new URL(import.meta.url).pathname).replace(/^\//, "")
);

const typeDefs = readFileSync(
  path.join(__dirname, "schema", "Product.gql"),
  "utf-8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
