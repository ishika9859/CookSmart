import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch, API_URL } from "./useFetch";
import { List, Loader } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Utensils, BookOpen } from "lucide-react";

const RecipieDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(`${API_URL}lookup.php?i=${id}`);
  const meal = data?.meals?.[0];
  console.log(meal);

  if (loading)
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-orange-400" />
        Preparing your recipe
      </div>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split(".")
        .map((step) => step.trim())
        .filter((step) => step.length > 0)
    : [];

  return (
    <>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/`}
          className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
        >
          <ChevronLeft className="w-6 h-6 mr-1 transition" />
          Back to Dashboard
        </Link>

        <div className="bg-gray-900 p-6 md:pd-12 rounded-3xl shadwo-2xl shadow-black/70 border border-gray-800">
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-black text-green-100 mb-6 leading-tight ">
                {meal?.strMeal}
              </h1>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-[400px] h-[400px] rounded-xl shadow-2xl shadow-black/50 object-cover border-4 border-gray-800 ring-2 ring-orange-500/50 mx-5"
              />
            </div>

            <div className="lg:w-1/2 bg-gray-800 rounded-xl shodow-inner shadow-black/30 border border-gray-700">
              <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center border-b border-gray-700 pb-3 p-3">
                <Utensils className="w-7 h-7 mr-3 text-orange-500" />
                Key Ingredients
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 list-none p-0">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-300 text-base ml-2"
                  >
                    <span className="text-orange-400 font-extrabold text-sm mr-2 shrink-0">
                      {">"}
                    </span>
                    <span className="font-semibold text-white mr-1">
                      {item.measure}
                    </span>{" "}
                    {item.ingredient}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-700">
                <div className="text-lg text-gray-400 space-x-3 flex-wrap gap-y-2 ">
                  <span className=" bg-orange-600 text-white ml-3 px-4 py-1.5 rounded-full font-semibold text-sm sdhadow-md">
                    {meal.strCategory}
                  </span>
                  <span className=" bg-green-700 text-white ml-3 px-4 py-1.5 rounded-full font-semibold text-sm sdhadow-md">
                    {meal.strArea}
                  </span>
                </div>
              </div>
            </div>
          </div>
        

        {/* INSTRUCTIONS */}
        <div className="mt-14 pt-8 border-t border-gray-800 ">
          <h2 className="text-3xl font-bold text-gray-100mb-8 flex items-center">
            <BookOpen className="text-orange-400"/>
            Detailed Preparation Steps
          </h2>
          <ol className="space-y-6 list-none text-gray-300 mt-4">
            {instructions.map((step, index) => (
              <li
                key={index}
                className="text-lg leading-relaxed bg-gray-800 p-5 rounded-xl border-1-6 border-orange-500 shadow-lg shadow-black-30 transition duration-300 hover:bg-gray-700/60"
              >
                <span className="font-extrabold text-yellow-400 mr-3 text-xl">
                  {index + 1}
                </span>
                {step.trim()}
              </li>
            ))}
          </ol>
        </div>
        </div>
      </main>
    </>
  );
};

export default RecipieDetails;
