import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://w6tcrg3sb4.execute-api.us-east-1.amazonaws.com/example-example-graphql-api",
  cache: new InMemoryCache(),
});

export { ApolloProvider, client };