import React from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import Loading from "../components/general/loading";
import Error from "../components/general/error";

import { getUsersQuery, removeUser } from "../queries/queries";

const UserList = ({ getUsersQuery: getUsersData, removeUser }) => {
  const deleteUser = user => {
    let isConfirmed = window.confirm(
      "Tem certeza que deseja excluir o usuário?"
    );
    if (isConfirmed) {
      removeUser({
        variables: {
          id: user.id
        },
        refetchQueries: [{ query: getUsersQuery }]
      });
    }
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
        <li key={index} onClick={() => deleteUser(item)}>
          <div>ID: {item.id}</div>
          <div>Name: {item.name}</div>
          <div>{item.admin && <span>ADMINISTRADOR!</span>}</div>
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
