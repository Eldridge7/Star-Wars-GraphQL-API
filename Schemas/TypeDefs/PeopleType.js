const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    mass: { type: GraphQLString },
    height: { type: GraphQLString },
    homeworld: { type: GraphQLString },
  }),
});

module.exports = PeopleType;
