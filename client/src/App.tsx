import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { BrowserRouter as Router, Route } from "react-router-dom";
import People from "./components/People";
import logo from "./logo.jpg";
import Person from "./components/Person";
import Header from "./components/Header";
import SearchResult from "./components/SearchResult";
import React from "react";

const link = from([new HttpLink({ uri: "/graphql" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="*" component={Header} />
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={People} />
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/search-person/:name" component={SearchResult} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
