import React from "react";
import { Search, Plus, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL } from "./useFetch";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IngredientFinder = ({ selectedIngredients, setSelectedIngredients }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(`${API_URL}list.php?i=list`);
        const data = await res.json();

        setIngredients(data.meals || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchIngredients();
  }, []);

  // console.log(ingredients);

  const filteredIngredients = ingredients.filter((item) => {
    const matchesSearch = item.strIngredient
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const alreadySelected = selectedIngredients.includes(item.strIngredient);

    return matchesSearch && !alreadySelected;
  });
  // console.log(filteredIngredients);
  // console.log(selectedIngredient/s);

  function normalizeIngredient(word) {
    word = word.toLowerCase().trim();

    if (word === "tomatoes") return "tomato";
    if (word === "potatoes") return "potato";
    if (word === "chilies") return "chili";
    if (word === "chiles") return "chili";

    if (word.endsWith("ies")) {
      return word.slice(0, -3) + "y";
    }

    if (
      word.endsWith("es") &&
      !word.endsWith("ches") &&
      !word.endsWith("shes")
    ) {
      return word.slice(0, -2);
    }

    if (word.endsWith("s") && word.length > 3) {
      return word.slice(0, -1);
    }

    return word;
  }

  const handleIngredientSelect = (ingredient) => {
    // Duplicate check
    if (selectedIngredients.includes(ingredient)) {
      return;
    }
    // Add ingredient
    const normalizedIngredient = normalizeIngredient(ingredient);

    setSelectedIngredients((prev) => [...prev, normalizedIngredient]);
    // Clear search box
    setSearchTerm("");
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove),
    );
  };

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-8">
      <div
        className="
        bg-gray-900
        border border-orange-500/20
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:border-orange-400
        hover:shadow-xl
        hover:shadow-orange-500/10
      "
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <UtensilsCrossed className="w-10 h-10 text-orange-400 shrink-0" />

          <div>
            <h2 className="text-3xl font-bold text-white">
              Cook From Your <span className="text-orange-400">Kitchen</span>
            </h2>

            <p className="text-gray-400 mt-1">
              Find recipes using ingredients you already have.
            </p>
          </div>
        </div>
        <hr className="border-gray-800 my-6" />

        {/* Search */}
        <div>
          <div className="relative">
            <div className="flex items-center bg-gray-950 border border-gray-700 rounded-xl overflow-hidden">
              <Search className="ml-5 text-gray-500 w-5 h-5" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ingredients..."
                className="flex-1 bg-transparent py-4 px-4 outline-none text-white placeholder:text-gray-500"
              />
            </div>

            {searchTerm.trim() && (
              <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl z-50">
                {filteredIngredients.length > 0 ? (
                  filteredIngredients.slice(0, 5).map((item) => (
                    <div
                      key={item.idIngredient}
                      onClick={() => handleIngredientSelect(item.strIngredient)}
                      className="group flex items-center gap-3 px-5 py-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition"
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-orange-400 font-bold transition">
                        +
                      </span>

                      <span className="group-hover:text-orange-400 transition">
                        {item.strIngredient}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-3 text-gray-400">
                    No ingredient found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-start justify-between gap-8 flex-wrap">
          {/* Chips */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-3">
              Selected Ingredients ({selectedIngredients.length})
            </h3>

            {selectedIngredients.length === 0 ? (
              <p className="text-gray-500">
                Start by adding your first ingredient.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {selectedIngredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-full"
                  >
                    <span>{ingredient}</span>

                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="hover:text-white transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Button */}
          <div className="pt-8">
            <button
              onClick={() => navigate("/recipes-by-ingredients")}
              disabled={selectedIngredients.length === 0}
              className={`flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition ${
                selectedIngredients.length === 0
                  ? "bg-orange-500/40 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              <Search size={18} />
              Show Recipes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientFinder;
