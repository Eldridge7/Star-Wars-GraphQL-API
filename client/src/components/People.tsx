import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import PeopleItem from "./PeopleItem";

import ReactPaginate from "react-paginate";
import "../index.css";
import { peopleActions } from "../store/peopleSlice";

import { selectPeople } from "../store";
import { IPeople } from "../interfaces/people";
import { LOAD_USERS } from "../graphql/Queries";

interface Selected {
  selected: number;
}

interface PeopleType {
  people: IPeople[];
}

const People: React.FC = () => {
  const { error, loading, data } = useQuery<PeopleType>(LOAD_USERS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(peopleActions.setPeople(data.people));
    }
  }, [data, dispatch]);

  //const { people } = data;

  const characters = useSelector(selectPeople);
  const previousLabel: string = "Prev";
  const nextLabel: string = "Next";
  const containerClassName: string = "paginationBttns";
  const previousLinkClassName: string = "previousBttn";
  const nextLinkClassName: string = "nextBttn";
  const disabledClassName: string = "paginationDisabled";
  const activeClassName: string = "paginationActive";

  //const [people, setPeople] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const peoplePerPage = 3;
  const pagesVisited = pageNumber * peoplePerPage;

  const showPeople = characters
    .slice(pagesVisited, pagesVisited + peoplePerPage)
    .map((person: IPeople) => {
      return <PeopleItem key={person.name} person={person} />;
    });

  console.log(data);
  const pageCount: number = Math.ceil(characters.length / peoplePerPage);
  const changePage = ({ selected }: Selected) => {
    setPageNumber(selected);
  };
  return (
    <React.Fragment>
      <h1 className="display-4 my-3">Warriors</h1>
      {loading && !data && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}

      {showPeople}

      <ReactPaginate
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={containerClassName}
        previousLinkClassName={previousLinkClassName}
        nextLinkClassName={nextLinkClassName}
        disabledClassName={disabledClassName}
        activeClassName={activeClassName}
      />
    </React.Fragment>
  );
};

export default People;
