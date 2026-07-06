import fs from "fs";
import { tokenizeIngredient } from "../src/utils/tokenizer.js";

const recipes = JSON.parse(
  fs.readFileSync("./src/data/recipeDetails.json", "utf8")
);

const cleanedRecipes = recipes.map((recipe) => {
  const tokens = new Set();

  recipe.ingredients.forEach((ingredient) => {
    tokenizeIngredient(ingredient).forEach((token) => {
      tokens.add(token);
    });
  });

  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    instructions: recipe.instructions,
    ingredients: recipe.ingredients,
    tokens: [...tokens],
  };
});

fs.writeFileSync(
  "./src/data/recipes.json",
  JSON.stringify(cleanedRecipes, null, 2)
);

console.log(`✅ ${cleanedRecipes.length} recipes processed`);