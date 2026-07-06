import React, { useEffect, useState } from "react";
import recipesData from "../data/recipes.json";
import { recommendRecipes } from "../utils/recommendRecipes";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const RecipieByIngredients = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const recommendations = recommendRecipes(recipesData, selectedIngredients);
    console.log("Selected:", selectedIngredients);

    setRecipes(recommendations);
  }, [selectedIngredients]);

  // console.log(recipes);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
      >
        <ChevronLeft className="w-6 h-6 mr-1 transition" />
        Back to Dashboard
      </button>
      <h1 className="text-4xl font-bold text-white mb-2">
        Recipes You Can Cook
      </h1>

      <p className="text-gray-400 mb-8">Based on your kitchen ingredients</p>

      <div className="flex flex-wrap gap-3">
        {selectedIngredients.map((ingredient, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300"
          >
            {ingredient}
          </div>
        ))}
      </div>

      {/* //checking ke liye */}
      <div className="mt-10">
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
            {recipes.map((recipe) => {
              return (
                <div
                  key={recipe.id}
                  className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10"
                >
                  {/* temp fix */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=CookSmart";
                    }}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-lg font-bold text-white min-h-[56px]">
                      {recipe.title}
                    </h2>

                    <div className="mt-5">
                      <h3 className="text-white-800 font-semibold mb-2">
                        You Have
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {recipe.matchedTokens.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-200 text-sm"
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <p className="text-gray-100 text-sm">
                        <span className="font-semibold text-green-400">
                          {" "}
                          <p>
                            Matched : {recipe.matchedCount} ingredient
                            {recipe.matchedCount > 1 ? "s" : ""}
                          </p>
                          <p>Need : {recipe.missingCount} more</p>
                        </span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold mb-2 text-white">Missing</h3>

                      <div className="flex flex-wrap gap-2">
                        {recipe.missingTokens.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-red-900/20 border border-red-800 text-red-300 text-sm"
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/ingredient-recipe/${recipe.id}`)
                      }
                      className="mt-6 w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-xl font-semibold text-white"
                    >
                      View Recipe →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipieByIngredients;
