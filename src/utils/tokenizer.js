import { INGREDIENT_DICTIONARY } from "../constants/ingredientDictionary.js";

const REMOVE_WORDS = [
  "fresh",
  "freshly",
  "ground",
  "extra",
  "virgin",
  "finely",
  "roughly",
  "thinly",
  "thickly",
  "chopped",
  "diced",
  "minced",
  "crushed",
  "peeled",
  "halved",
  "quartered",
  "optional",
  "divided",
  "plus",
  "more",
  "to",
  "taste",
  "room",
  "temperature",
  "cup",
  "cups",
  "tablespoon",
  "tablespoons",
  "tbsp",
  "teaspoon",
  "teaspoons",
  "tsp",
  "oz",
  "ounce",
  "ounces",
  "lb",
  "lbs",
  "kg",
  "g",
  "ml",
  "l",
  "juice",
  "pink",
  "kosher",
];

export function tokenizeIngredient(ingredient) {
  let text = ingredient.toLowerCase();

  // Remove brackets
  text = text.replace(/\([^)]*\)/g, " ");

  // Remove numbers and fractions
  text = text.replace(/[0-9¼½¾⅓⅔⅛⅜⅝⅞./-]/g, " ");

  // Remove punctuation
  text = text.replace(/[^a-z\s]/g, " ");

  // Remove unwanted words
  REMOVE_WORDS.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    text = text.replace(regex, " ");
  });

  text = text.replace(/\s+/g, " ").trim();

  const tokens = [];
  function singularize(word) {
  if (word === "chilies" || word === "chiles") return "chili";

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

  const sortedDictionary = [...INGREDIENT_DICTIONARY].sort(
  (a, b) => b.token.length - a.token.length
);

for (const item of sortedDictionary) {
  for (const pattern of item.patterns) {
    const regex = new RegExp(
      `\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`
    );

    if (regex.test(text)) {
      if (!tokens.includes(item.token)) {
        tokens.push(item.token);
      }

      // Add specific token only if it is NOT just a plural form
      const normalizedPattern = singularize(pattern);

      if (
        normalizedPattern !== item.token &&
        !tokens.includes(normalizedPattern)
      ) {
        tokens.push(normalizedPattern);
      }

      text = text.replace(regex, " ");

      break;
    }
  }
}

  const remaining = text.trim();

if (remaining.length > 0) {
  const words = remaining.split(/\s+/);

  // Keep only if it's a single meaningful word
  if (words.length === 1) {
    const word = singularize(words[0]);

    if (
      word.length > 2 &&
      !REMOVE_WORDS.includes(word) &&
      !tokens.includes(word)
    ) {
      tokens.push(word);
    }
  }
}

  return [...new Set(tokens)];
}
