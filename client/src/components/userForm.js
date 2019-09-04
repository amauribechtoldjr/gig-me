import React, { Fragment, useState } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import { addUserQuery, getUsersQuery } from "../queries/queries";

const UserForm = ({ addUserQuery }) => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  const displayForm = () => {
    const onSubmit = async event => {
      event.preventDefault();
      addUserQuery({
        variables: {
          name,
          admin
        },
        refetchQueries: [{ query: getUsersQuery }]
      });
      setName("");
      setAdmin(false);
    };
    return (
      <form id="user-form">
        <p>
          <span>Name: </span>
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </p>
        <p>
          <span>Admin: </span>
          <input
            type="checkbox"
            checked={admin}
            onChange={event => setAdmin(event.target.checked)}
          />
        </p>
        <p>
          <button onClick={event => onSubmit(event)}>Salvar</button>
        </p>
      </form>
    );
  };

  return <Fragment>{displayForm()}</Fragment>;
};

export default compose(graphql(addUserQuery, { name: "addUserQuery" }))(
  UserForm
);
