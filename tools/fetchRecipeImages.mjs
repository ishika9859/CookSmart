import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

const FILE_PATH = "./src/data/recipeDetails.json";

const recipes = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];

  // Skip already processed recipes
  if (
    recipe.image &&
    recipe.image.startsWith("https://assets.epicurious.com")
  ) {
    continue;
  }

  const slug = recipe.image;

  const url = `https://www.epicurious.com/recipes/food/views/${slug}`;

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const imageUrl = $('meta[property="og:image"]').attr("content");

    if (imageUrl) {
      recipe.slug = slug;
      recipe.image = imageUrl;

      console.log(`✅ [${i + 1}/${recipes.length}] ${recipe.title}`);
    } else {
      console.log(`⚠️ No image -> ${recipe.title}`);
    }
  } catch (err) {
    if (err.response?.status === 429) {
      console.log("⏳ Rate limited. Waiting 30 seconds...");

      await new Promise((resolve) => setTimeout(resolve, 30000));

      i--;
      continue;
    }

    console.log(`❌ Failed -> ${recipe.title}`);
  }

  // Save after EVERY recipe
  fs.writeFileSync(FILE_PATH, JSON.stringify(recipes, null, 2));

  // Prevent hammering Epicurious
  await new Promise((resolve) => setTimeout(resolve, 200));
}

console.log("🎉 Finished!");
