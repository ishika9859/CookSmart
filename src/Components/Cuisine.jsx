import React from "react";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Cuisine = ({ filterByArea }) => {
  const featuredAreas = [
    "Italian",
    "British",
    "Canadian",
    "Chinese",
    "Japanese",
    "Italian",
    "Mexican",
    "Russian",
    "Thai",
  ];

  return (
    <>
      <div className="bg-gray-900/80 border-b border-y-gray-800 shadow-inner shadow-black/20">
        <div className="max-w-8xl mx-auto px-4 lg:px-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 py-4 items-center">
            <div className="flex items-center text-lg font-bold text-yellow-400 pr-3 whitespace-nowrap">
              <Globe className="w-5 h-5 mr-2 " />
              Globe Cuisines:
            </div>

            {featuredAreas.map((area) => (
              <Link
                to={`search/${area}`}
                onClick={() => filterByArea(area)}
                key={area}
                className="cursor-pointer text-gray-200 text-sm whitespace-nowrap font-medium hover:text-white transition duration-200 py-1.5 px-4
              rounded-full bg-gray-800 border-gray-700 hover:bg-orange-600 hover:shadow-lg hover:shadow-organge-800/50 transform hover:scale-[1.05] "
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cuisine;
