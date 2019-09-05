import React from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import Loading from "../components/general/loading";
import Error from "../components/general/error";

import { getUsersQuery, removeUser } from "../queries/queries";

const UserList = ({ getUsersQuery: getUsersData, removeUser }) => {
  const deleteUser = user => {
    removeUser({
      variables: {
        id: user.id
      },
      refetchQueries: [{ query: getUsersQuery }]
    });
  };
  const displayUsers = () => {
    const { error, loading, users } = getUsersData;

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error errorMessage={error.message} />;
    }
    if (users.length === 0) {
      return (
        <div>
          <span>Nenhum usuário encontrado.</span>
        </div>
      );
    }
    return users.map((item, index) => {
      return (
        <li key={index}>
          <p>
            ID: {item.id}
            <br></br>
            Name: {item.name}
            <br></br>
            {item.admin && <span>ADMINISTRADOR!</span>}
            <button onClick={() => deleteUser(item)}>Excluir</button>
          </p>
        </li>
      );
    });
  };
  return (
    <div id="users-list">
      <ul>{displayUsers()}</ul>
    </div>
  );
};

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(removeUser, { name: "removeUser" })
)(UserList);
