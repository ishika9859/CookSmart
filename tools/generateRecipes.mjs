import fs from "fs";

const recipeDetails = JSON.parse(
  fs.readFileSync("./src/data/recipeDetails.json", "utf-8")
);

const recipes = recipeDetails.map((recipe) => ({
  id: recipe.id,
  title: recipe.title,
  ingredients: recipe.ingredients,
}));

fs.writeFileSync(
  "./src/data/recipes.json",
  JSON.stringify(recipes, null, 2)
);

console.log(`Generated ${recipes.length} recipes`);