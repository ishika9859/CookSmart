


export const recommendRecipes = (recipes, selectedIngredients) => {
  if (!selectedIngredients.length) return [];

 const selected = selectedIngredients.map((item) =>
  item.toLowerCase().trim()
);

  return recipes
    .map((recipe) => {
      const matchedTokens = recipe.tokens.filter((token) =>
        selected.includes(token)
      );

      const missingTokens = recipe.tokens.filter(
        (token) => !selected.includes(token)
      );

      return {
        ...recipe,
        matchedTokens,
        missingTokens,
        matchedCount: matchedTokens.length,
        missingCount: missingTokens.length,
      };
    })
    .filter((recipe) => recipe.matchedCount > 0)
    .sort((a, b) => {
      if (b.matchedCount !== a.matchedCount) {
        return b.matchedCount - a.matchedCount;
      }

      return a.missingCount - b.missingCount;
    })
    .slice(0, 30);
};