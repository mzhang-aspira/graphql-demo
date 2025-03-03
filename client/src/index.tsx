import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  console.error("Container element not found!");
}
