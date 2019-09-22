import { gql } from "apollo-boost";

const getUsersQuery = gql`
  {
    users {
      hash_fb
      id
      name
      admin
    }
  }
`;

const addUserQuery = gql`
  mutation($name: String!, $admin: Boolean!) {
    addUser(name: $name, admin: $admin) {
      id
      name
    }
  }
`;

const removeUser = gql`
  mutation($id: ID!) {
    removeUser(id: $id) {
      id
      name
    }
  }
`;

export { getUsersQuery, addUserQuery, removeUser };
