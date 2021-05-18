import React from "react";
import PropTypes from "prop-types";

// Components
import RecipeStats from "pages/RecipePage/RecipeStats";
import SaveRecipeButton from "pages/RecipePage/SaveRecipeButton";
import { Text, Heading } from "components/atoms";
import { PageSectionContainer } from "components/templates";

// Utils
import { toTitle } from "utils/dataHelpers";

const RecipeInfo = ({ recipe }) => {
  return (
    <PageSectionContainer displayClasses="flex">
      <div className="w-6/12 space-y-16 py-8 pr-24">
        <div className="space-y-8">
          <Heading type="h1/2">{toTitle(recipe.name)}</Heading>
          <Text type="lg">Recipe by: {recipe.contributor || "-"}</Text>
        </div>
        <RecipeStats
          recipeTime={recipe.minutes}
          recipeScore={recipe.sus_score}
        />
        <SaveRecipeButton recipe={recipe} />
      </div>
      <div className="w-6/12 overflow-hidden">
        <img
          src={recipe.image_url}
          alt={recipe.name}
          className="h-112 bg-gray-light object-cover rounded-md"
        ></img>
      </div>
    </PageSectionContainer>
  );
};

export default RecipeInfo;

RecipeInfo.propTypes = {
  recipe: PropTypes.object,
};