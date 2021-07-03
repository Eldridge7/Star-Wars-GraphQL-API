import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_HOMEWORLD, SEARCH_PERSON } from "../graphql/Queries";
import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { IHomeworld } from "../interfaces/homeworld";
import { IPeople } from "../interfaces/people";

interface RouteParams {
  name: string;
}
interface People {
  search: IPeople;
}

interface HomeWorld {
  homeworld: IHomeworld;
}

interface MyComponent extends RouteComponentProps<RouteParams> {}

const SearchResult: React.FC<MyComponent> = (props) => {
  let name = props.match.params.name;

  const { data } = useQuery<People>(SEARCH_PERSON, {
    variables: { name },
  });
  console.log(data);
  const [users, setUsers] = useState<IPeople>();
  const [planet, setPlanet] = useState<IHomeworld>();
  useEffect(() => {
    if (data) {
      setUsers(data.search);
    }
  }, [data]);

  const id = users ? users.id : null;
  const { data: place } = useQuery<HomeWorld>(GET_HOMEWORLD, {
    variables: { id },
  });

  useEffect(() => {
    if (place) {
      setPlanet(place.homeworld);
    }
  }, [place]);

  //   const { name, mass, height, homeworld, gender } = data.person;

  return (
    <React.Fragment>
      <div>
        <h1 className="display-4 my-3">
          <span className="text-dark">Name:</span> {users && users.name}
        </h1>
        <h4 className="mb-3">Personal Details</h4>
        <ul className="list-group">
          <li className="list-group-item"> Id: {id}</li>
          <li className="list-group-item">
            Home World: {planet && planet.name}
          </li>
        </ul>

        <h4 className="my-3">Physical Details</h4>
        <ul className="list-group">
          <li className="list-group-item">Gender : {users && users.gender}</li>
          <li className="list-group-item">Mass: {users && users.mass}</li>
          <li className="list-group-item">Height: {users && users.height}</li>
        </ul>
        <hr />
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
