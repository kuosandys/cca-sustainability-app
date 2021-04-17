import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoCheckmarkSharp } from "react-icons/io5";

import { userShoppingList } from "recoil/user";

import { Text, Button, Checkbox } from "components/Presentation";

function RecipeIngredients({ recipeIngredients }) {
  const [shoppingList, setShoppingList] = useRecoilState(userShoppingList);
  const ingredientsListRef = useRef(null);
  const [localCount, setLocalCount] = useState(0);

  const handleClick = (ingredientName) => {
    setShoppingList((prevState) => {
      if (prevState.includes(ingredientName)) {
        setLocalCount((prev) => prev - 1);
        return prevState.filter((item) => item !== ingredientName);
      } else {
        setLocalCount((prev) => prev + 1);
        return [...prevState, ingredientName];
      }
    });
  };

  const inShoppingList = (ingredient) => {
    if (shoppingList.includes(ingredient)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const ingredientsList = ingredientsListRef.current;
    if (ingredientsList) {
      let checked = ingredientsList.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      setLocalCount(checked.length);
    }
  }, []);

  return (
    <section className="w-1/2 my-16">
      <Text type="h2">Ingredients</Text>
      <ul className="my-8" ref={ingredientsListRef}>
        {recipeIngredients.map((ingredient) => {
          return (
            <li className="flex items-center my-4" key={ingredient}>
              <Checkbox
                value={ingredient}
                checked={inShoppingList(ingredient)}
                handleClick={() => handleClick(ingredient)}
                className="mr-8"
              />
              <Text type="h4">{ingredient}</Text>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between">
        <Text type="h4" className="flex items-center">
          <IoCheckmarkSharp className="mr-4" />
          {localCount} ingredients added
        </Text>
        <Link to="/shopping-list">
          <Button type="secondary" size="sm">
            View Shopping List
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipeIngredients: PropTypes.array,
};