 import React from "react";
import { useQuery, gql } from "@apollo/client";
import { List } from "./shared/List";

const PLANETS = gql`
  {
    planets {
      id
      name
      cuisine
    }
  }
`;

const Planets = ({ newPlanets }) => {
  const { loading, error, data } = useQuery(PLANETS);

  const renderPlanets = (planets) => {
    return planets.map(({ id, name, cuisine }) => (
      <div>
        <h1>{name}</h1>
      <h1>{id}</h1>
      <h1>{cuisine}</h1>
      </div>
    ));
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(  {error.message}</p>;

  return <List>{renderPlanets(newPlanets || data.planets)}</List>;
};

export default Planets;
