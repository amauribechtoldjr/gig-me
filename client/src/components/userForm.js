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
        <div className="inputs">
          <span>Name: </span>
          <input
            type="text"
            value={name}
            className="field"
            onChange={event => setName(event.target.value)}
          />
          <span>Admin: </span>
          <input
            type="checkbox"
            checked={admin}
            className="field"
            onChange={event => setAdmin(event.target.checked)}
          />
        </div>
        <button onClick={event => onSubmit(event)}>Salvar</button>
      </form>
    );
  };

  return <Fragment>{displayForm()}</Fragment>;
};

export default compose(graphql(addUserQuery, { name: "addUserQuery" }))(
  UserForm
);
