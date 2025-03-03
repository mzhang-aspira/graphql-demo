import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql/**/*.gql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    },
  },
  config: {
    exposeDocument: true,
    exposeQueryKeys: true,
    exposeFetcher: true,
    addInfiniteQuery: true,
    reactQueryVersion: 5,
    // fetcher: "../fetcher#fetcher",
  },
};

export default config;
