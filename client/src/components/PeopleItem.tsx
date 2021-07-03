import React from "react";
import { Link } from "react-router-dom";
import { IPeople } from "../interfaces/people";

interface Props {
  person: IPeople;
}
const PeopleItem: React.FC<Props> = ({ person: { id, name } }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4> {name}</h4>
        </div>
        <div className="col-md-3">
          <Link to={`/person/${id}`} className="btn btn-secondary">
            Personal Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PeopleItem;
