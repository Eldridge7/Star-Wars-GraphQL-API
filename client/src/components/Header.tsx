import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

const Header: React.FC<ChildComponentProps> = ({ history }) => {
  const [name, setName] = useState("");

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // const { error, loading, data } = useQuery(LOAD_USER, {
  //     variables: { id },
  //   });

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    history.push(`/search-person/${name}`);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Star Wars Characters
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={submitHandler}>
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
              onChange={nameChangeHandler}
              value={name}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
