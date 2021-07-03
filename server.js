const express = require("express");
const app = express();
const path = require("path");
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static(path.join("/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "/client/build", "index.html"))
);
app.listen(PORT, () => {
  console.log("Server running");
});
