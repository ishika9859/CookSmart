import React from "react";
import { Link } from "react-router-dom";

const RecipieCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
    <div
      className="relative bg-gray-900 rounded-xl shadow-xl shadow-black/50 overflow-hidden group transform transition duration-500 cursor-pointer border border-gray-800 hover:shadow-orange-600/50"
    >
      {/* hover div */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-500/80 transition duration-500   "></div>

      <div className="flex justify-center items-center p-5">
        <img
          src={meal?.strMealThumb}
          alt={meal.strMeal}
          className="h-60 w-60 rounded-xl border border-yellow-400 transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-xl pb-3 font-bold text-gray-100 mn-1 group-hover:text-orange-400 transition duration-300">
          {meal.strMeal}
        </h3>
      </div>
    </div>
    </Link>
  );
};

export default RecipieCard;
