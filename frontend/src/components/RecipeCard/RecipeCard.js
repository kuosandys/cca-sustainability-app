import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Text } from "components/Presentation";

import { toTitle } from "utils/dataHelpers";

function RecipeCard({ recipeObject }) {
  return (
    <Link to={`/recipes/${recipeObject.name.replace(/ /g, "-")}`}>
      <article className="w-80 h-112 flex flex-col my-8 rounded-lg shadow-lg bg-white">
        <img
          src={recipeObject.image}
          alt={recipeObject.name}
          className="bg-gray-100 w-80 h-80 flex-shrink-0"
        />
        <div className="h-full w-full px-3 flex flex-col justify-evenly">
          <Text
            type="h4"
            className="w-full font-bold whitespace-nowrap overflow-ellipsis overflow-hidden"
          >
            {toTitle(recipeObject.name)}
          </Text>
          <Text type="h4" className="font-bold text-primary">
            Score: {recipeObject.sus_score}
          </Text>
        </div>
      </article>
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipeObject: PropTypes.object,
};
