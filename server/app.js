const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0-fjo5q.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.set("useFindAndModify", false);
mongoose.connection.once("open", () => {
  console.log(`Conected to database`);
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log(`Now listening for requests on port 4000`);
});
