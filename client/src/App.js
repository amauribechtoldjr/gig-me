import React from "react";
import UserList from "./components/userList";
import UserForm from "./components/userForm";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <div id="div-title">
          <span>GraphQL web APP</span>
        </div>
        <UserList />
        <UserForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
