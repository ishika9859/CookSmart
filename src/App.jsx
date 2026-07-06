import React, { useCallback, useState } from "react";
import Navbar from "./Components/Navbar";
import Cuisine from "./Components/Cuisine";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./Components/HomeView";
import RecipieDetails from "./Components/RecipieDetails";
import SearchView from "./Components/SearchView";
import RecipieByIngredients from "./Components/RecipieByIngredients";
import IngredientRecipeDetails from "./Components/IngredientRecipeDetails";
import Footer from "./Components/Footer";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error:${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  //FILTER BY CATEGORY
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe],
  );

  //FILTER BY AREA
  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe],
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error:${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
          <Navbar handleSearch={handleSearch} />
          <Cuisine filterByArea={filterByArea} />
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  filterByCategory={filterByCategory}
                  selectedIngredients={selectedIngredients}
                  setSelectedIngredients={setSelectedIngredients}
                />
              }
            />
            <Route path="/recipe/:id" element={<RecipieDetails />} />
            <Route
              path="/search/:query"
              element={
                <SearchView meals={searchResult} loading={searchLoading} />
              }
            />
            <Route
              path="/recipes-by-ingredients"
              element={
                <RecipieByIngredients
                  selectedIngredients={selectedIngredients}
                />
              }
            />
            <Route
              path="/ingredient-recipe/:id"
              element={<IngredientRecipeDetails />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
