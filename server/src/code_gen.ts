import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema/*.gql",
  generates: {
    "./src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./src/generated/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#Context",
        mappers: {
          Product: "../data/products#Product",
        },
      },
    },
  },
};

export default config;
