const NORMALIZATION_MAP = {
  // Onion
  "red onion": "onion",
  "white onion": "onion",
  "yellow onion": "onion",
  "sweet onion": "onion",
  "green onion": "onion",
  "spring onion": "onion",
  "pearl onion": "onion",

  // Garlic
  "garlic cloves": "garlic",
  "cloves garlic": "garlic",
  "minced garlic": "garlic",
  "garlic clove": "garlic",

  // Butter
  "unsalted butter": "butter",
  "salted butter": "butter",
  "clarified butter": "butter",
  "melted butter": "butter",

  // Salt
  "kosher salt": "salt",
  "sea salt": "salt",

  // Chicken
  "whole chicken": "chicken",
  "ground chicken": "chicken",
  "boneless chicken": "chicken",
  "skinless chicken": "chicken",
  "boneless skinless chicken breast": "chicken breast",
  "boneless chicken breast": "chicken breast",

  // Herbs
  "fresh basil leaves": "basil",
  "basil leaves": "basil",

  // Cheese
  "grated parmesan cheese": "parmesan cheese",
};

export function normalizeIngredient(text) {
  let ingredient = text.toLowerCase();

  // Remove brackets
  ingredient = ingredient.replace(/\([^)]*\)/g, "");

  // Remove numbers & fractions
  ingredient = ingredient.replace(/[0-9¼½¾⅓⅔⅛⅜⅝⅞./-]+/g, " ");

  // Remove units
  ingredient = ingredient.replace(
    /\b(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|lbs|pound|pounds|kg|g|ml|l)\b/g,
    ""
  );

  // Remove adjectives
  ingredient = ingredient.replace(
    /\b(fresh|freshly|ground|minced|chopped|diced|sliced|large|small|medium|extra|virgin|room|temperature|optional|plus|about|divided)\b/g,
    ""
  );

  ingredient = ingredient.replace(/\s+/g, " ").trim();

  // Canonical mapping
  for (const key in NORMALIZATION_MAP) {
    if (ingredient.includes(key)) {
      return NORMALIZATION_MAP[key];
    }
  }

  return ingredient;
}