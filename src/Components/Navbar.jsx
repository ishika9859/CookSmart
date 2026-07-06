import React from "react";
import { useState } from "react";
import { ChefHat } from "lucide-react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (input.trim()) {
      handleSearch(input.trim());
      navigate(`search/${input}`);
      setInput("");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/50  border-b border-blue-900/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            <Link
              to={"/"}
              className="flex items-center text-2xl font-black text-white hover:text-yellow-400 transition duration-400 tracking-wide"
            >
              <ChefHat className="text-orange-500 w-7 h-7 mr-2 fill-orange-400/20" />
              <span className="text-orange-500">Cook</span>Smart
            </Link>

            <form
              className="flex-1 max-w-lg mx-4 hidden sm:flex"
              onSubmit={searchHandler}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search dishes..."
                className="w-full px-5 py-2 border border-gray-700 bg-gray-900 text-gray-50 rounded-l-full focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition placeholder-gray-500 shadow-inner shadow-black/50"
              />
              <button
                type="submit"
                className="bg-linear-to-r from bg-orange-600 to-orange-300 text-white p-2.5 rounded-r-full hover:from-orange-700 to-orange-400 transition duration-300 shadow-lg shadow-orange-800/50 hover:shadow-xl hover:shadow-orange-800/90"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
