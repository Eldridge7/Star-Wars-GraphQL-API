import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query LoadUsers {
    people {
      id
      name
      gender
      mass
      height
      homeworld
    }
  }
`;

export const GET_HOMEWORLD = gql`
  query GetHomeworld($id: Int!) {
    homeworld(id: $id) {
      id
      name
    }
  }
`;

export const LOAD_USER = gql`
  query LoadUser($id: Int!) {
    person(id: $id) {
      id
      name
      gender
      mass
      height
      homeworld
    }
  }
`;

export const SEARCH_PERSON = gql`
  query SearchPerson($name: String!) {
    search(name: $name) {
      id
      name
      gender
      mass
      height
      homeworld
    }
  }
`;
