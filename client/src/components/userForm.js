import React, { useState } from "react";
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
      <form>
        <div className="div-inputs">
          <div className="div-inputs-name">
            <span>Name: </span>
            <input
              type="text"
              value={name}
              className="field"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="div-inputs-admin">
            <span>Admin: </span>
            <input
              type="checkbox"
              checked={admin}
              className="field"
              onChange={event => setAdmin(event.target.checked)}
            />
          </div>
        </div>
        <div className="div-bt-save-record">
          <button onClick={event => onSubmit(event)}>Save user</button>
        </div>
      </form>
    );
  };

  return <div id="user-form">{displayForm()}</div>;
};

export default compose(graphql(addUserQuery, { name: "addUserQuery" }))(
  UserForm
);
