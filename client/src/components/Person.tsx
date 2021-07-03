import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_HOMEWORLD, LOAD_USER } from "../graphql/Queries";
import { Link, RouteComponentProps } from "react-router-dom";
import { useParams } from "react-router";
import { IPeople } from "../interfaces/people";
import { IHomeworld } from "../interfaces/homeworld";

interface RouteParams {
  id: string;
}
interface People {
  person: IPeople;
}

interface HomeWorld {
  homeworld: IHomeworld;
}

interface MyComponent extends RouteComponentProps<RouteParams> {}

const Person: React.FC<MyComponent> = (props) => {
  let id = +props.match.params.id;

  const { data } = useQuery<People>(LOAD_USER, {
    variables: { id },
  });
  const { data: place } = useQuery<HomeWorld>(GET_HOMEWORLD, {
    variables: { id },
  });
  const [users, setUsers] = useState<IPeople>();
  const [planet, setPlanet] = useState<IHomeworld>();
  console.log(place);
  useEffect(() => {
    if (data) {
      setUsers(data.person);
    }
  }, [data]);

  useEffect(() => {
    if (place) {
      setPlanet(place.homeworld);
    }
  }, [place]);
  //const { name, mass, height, homeworld, gender } = data.person;

  return (
    <React.Fragment>
      <div>
        <h1 className="display-4 my-3">{users && users.name}</h1>
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

export default Person;
