import React ,{useEffect}from "react";
import { useNavigate, useParams } from "react-router-dom";
import recipesData from "../data/recipes.json";
import { ChevronLeft, BookOpen, Utensils } from "lucide-react";

const IngredientRecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipesData.find((item) => item.id === Number(id));
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, []);

  if (!recipe) {
    return (
      <div className="text-white text-center mt-20 text-2xl">
        Recipe not found.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
      >
        <ChevronLeft className="w-6 h-6 mr-1 transition" />
        Back to Recipes
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 leading-tight font-black text-green-100">
        {recipe.title}
      </h1>

      {/* Image + Ingredients */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-[430px] object-cover rounded-2xl border border-orange-500/30"
          />
        </div>

        {/* Ingredients */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <Utensils className="w-8 h-8 text-orange-500" />

              <h2 className="text-3xl font-bold text-yellow-400">
                Key Ingredients
              </h2>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex gap-3 text-gray-200 leading-7">
                  <span className="text-orange-400 font-bold mt-1">{">"}</span>

                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-14 pt-8 border-t border-gray-800 ">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-orange-500" />

          <h2 className="text-3xl font-bold text-yellow-400">
            Instructions
          </h2>
        </div>

        <ol className="space-y-6 list-none text-gray-300 mt-4">
          {recipe.instructions
            .split(".")
            .filter((step) => step.trim())
            .map((step, index) => (
              <li key={index} className="flex gap-5 bg-gray-800 rounded-xl p-5">
                <div className="text-yellow-400 font-bold text-2xl w-8">
                  {index + 1}
                </div>

                <p className="text-lg leading-8 text-gray-200">
                  {step.trim()}.
                </p>
              </li>
            ))}
        </ol>
      </div>
    </main>
  );
};

export default IngredientRecipeDetails;
