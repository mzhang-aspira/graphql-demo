# Getting Started
## Server
1. cd to "server"
2. run "npm install" to install all the necessary modules
3. view or make changes of the Schema in "server\src\schema\Product.gql"
4. run "npm run generate" to generate the "GraphQL Type" with Typescript language, there will be two files "server\src\generated\graphql.schema.json" and "server\src\generated\resolvers-types.ts" generated in this step
5. view or make changes for the "GraphQL Resolver" in "server\src\resolvers\Product.ts", you will see the the file "server\src\generated\resolvers-types.ts" referenced in this file, which means you can use the "Type" defined in "server\src\schema\Product.gql" here now.
6. fake data is defined in "server\src\data\Product_Data.ts", you can view or make changes corresponding to your own "Schema".
7. run "npm start" to start the GraphQL server, visit "http://localhost:4000/" to enter Apollo Sandbox, now you can play with it, by writting some Query w/o paramters and specify which fields you want to fetch.

## Client
1. cd to "client"
2. run "npm install" to install all the necessary modules
3. view or makes changes in "client\src\graphql\products.gql", the contents in this file are all the Query String you already debugged and tested in #7 above.
4. make sure server is already started before this step, then run "npm run generate" to generate the "GraphQL Type" retrieved from server and the "useXXX" hook which can be used in your front-end React project.
5. view or make changes in the files under "client\src\components\", which are all front-end pages implemented by React.
6. run "npm start" to start the front-end project, visit "http://localhost:3000/" to see the front-end pages.
