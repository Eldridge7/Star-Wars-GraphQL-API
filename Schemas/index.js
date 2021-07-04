const axios = require("axios");
const graphql = require("graphql");
const PeopleType = require("./typedefs/PeopleType");
const HomeworldType = require("./typedefs/HomeworldType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: new GraphQLList(PeopleType),

      resolve(parent, args) {
        const baseURL = `https://swapi.dev/api/people`;

        const convertResponse = (data) =>
          data.results.map((item, i) => ({
            id: i + 1,
            name: item.name,
            gender: item.gender,
            mass: item.mass,
            height: item.height,
          }));

        return axios.get(`${baseURL}`).then((res) => convertResponse(res.data));
      },
    },
    person: {
      type: PeopleType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const baseURL = `https://swapi.dev/api/people`;

        const convertResponse = (item) => {
          return {
            id: args.id,
            name: item.name,
            gender: item.gender,
            mass: item.mass,
            height: item.height,
            homeworld: item.homeworld,
          };
        };

        return axios
          .get(`${baseURL}/${args.id}`)
          .then((res) => convertResponse(res.data));
      },
    },
    search: {
      type: PeopleType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const baseURL = `https://swapi.dev/api/people`;

        const convertResponse = (data) => {
          return {
            id: data.results[0].url[data.results[0].url.length - 2],
            name: data.results[0].name,
            gender: data.results[0].gender,
            mass: data.results[0].mass,
            height: data.results[0].height,
            homeworld: data.results[0].homeworld,
          };
        };

        return axios
          .get(`${baseURL}/?search=${args.name}`)
          .then((res) => convertResponse(res.data));
      },
    },

    homeworlds: {
      type: new GraphQLList(HomeworldType),

      resolve(parent, args) {
        const baseURL = `https://swapi.dev/api/planets`;

        const convertResponse = (data) =>
          data.results.map((item, i) => ({
            id: i + 1,
            name: item.name,
          }));

        return axios.get(`${baseURL}`).then((res) => convertResponse(res.data));
      },
    },

    homeworld: {
      type: HomeworldType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const baseURL = `https://swapi.dev/api/planets`;

        const convertResponse = (item) => {
          return {
            id: args.id,
            name: item.name,
          };
        };

        return axios
          .get(`${baseURL}/${args.id}`)
          .then((res) => convertResponse(res.data));
      },
    },
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     createUser: {
//       type: UserType,
//       args: {
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         password: { type: GraphQLString },
//       },
//       resolve(parent, args) {
//         userData.push({
//           id: userData.length + 1,
//           firstName: args.firstName,
//           lastName: args.lastName,
//           email: args.email,
//           password: args.password,
//         });
//         return args;
//       },
//     },
//   },
// });

module.exports = new GraphQLSchema({ query: RootQuery });
