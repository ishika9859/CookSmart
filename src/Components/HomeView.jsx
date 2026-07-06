import React from "react";

import RecipieSlider from "./RecipieSlider";
import TredingRecipie from "./TredingRecipie";
import CategorySelection from "./CategorySelection";
import IngredientFinder from "../Components/IngredientFinder";

import { API_URL } from "./useFetch";

const HomeView = ({
  filterByCategory,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  return (
    <>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <IngredientFinder
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <RecipieSlider
          title="Staff Curated Picks"
          fetchUrl={`${API_URL}search.php?f=a`}
        />

        <TredingRecipie
          title="Delicious Desserts "
          fetchUrl={`${API_URL}filter.php?a=Canadian`}
        />

        <CategorySelection filterByCategory={filterByCategory} />
      </main>
    </>
  );
};

export default HomeView;
