import fs from "fs";

const recipes = JSON.parse(
  fs.readFileSync("./src/data/recipeDetails.json", "utf8")
);

const frequency = {};

recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    const key = ingredient.toLowerCase().trim();

    frequency[key] = (frequency[key] || 0) + 1;
  });
});

const sorted = Object.entries(frequency)
  .sort((a, b) => b[1] - a[1])
  .map(([ingredient, count]) => ({
    ingredient,
    count,
  }));

fs.writeFileSync(
  "./src/data/ingredientFrequency.json",
  JSON.stringify(sorted, null, 2)
);

console.log(
  `Extracted ${sorted.length} unique ingredient phrases`
);