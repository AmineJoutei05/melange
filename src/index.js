import React from "react";
import { render } from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PlanetSearch from "./components/PlanetSearch";
import Planet from "./components/Planet";
import Logo from "./components/shared/Logo";
import "./index.css";

const GRAPHQL_ENDPOINT = "wired-viper-16.hasura.app/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Logo />
      <h2>hey</h2>
      <Switch>
        <Route path="/planet/:id" component={Planet} />
        <Route path="/" component={PlanetSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
