const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const User = require("../models/user");
const Agency = require("../models/agency");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    admin: { type: GraphQLBoolean }
  })
});

const AgencyType = new GraphQLObjectType({
  name: "Agency",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    agency: {
      type: AgencyType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Agency.findById(args.id);
      }
    },
    agencies: {
      type: new GraphQLList(AgencyType),
      resolve(parent, args) {
        return Agency.find({});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        admin: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          admin: args.admin
        });
        return user.save();
      }
    },
    addAgency: {
      type: AgencyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let agency = new Agency({
          name: args.name,
          contact: args.contact
        });
        return agency.save();
      }
    },
    removeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
