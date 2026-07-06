import React from "react";
import Slider from "react-slick";
import { useFetch } from "./useFetch";
import { Divide } from "lucide-react";
import RecipieCard from "./RecipieCard";
import { Link } from "react-router-dom";
import { CakeSlice, Loader } from "lucide-react";

const TredingRecipie = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);
  // console.log("my meal data", data);
  const meals = data?.meals || [];

  const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",

  appendDots: () => null,
  customPaging: () => null,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
  const SlickSlider = Slider.default || Slider;

  if (loading)
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-orange-400" />
        Loading{title}...
      </div>
    );
  return (
    <>
      <section className="mt-2 mx-auto ">
        <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight border-1-4 border-yellow-400 pl-4 flex items-center">
          <CakeSlice className="w-6 h-6 mr-3 text-orange-500" />
          {title}
        </h2>

        <div className="w-full mx-auto ">
          <SlickSlider {...settings}>
            {meals.map((meal) => (
              <div key={meal.idMeal} className="px-2 sm:px-4 flex justify-center">
                <Link to={`/recipe/${meal.idMeal}/`}>
                
                <div className="relative bg-gray-900 rounded-xl shadow-xl shadow-black/50 overflow-hidden group transform transition duration-500 cursor-pointer border border-gray-800 hover:shadow-orange-600/50 mb-5">
                  {/* hover div */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-500/80 transition duration-500   "></div>

                  <div className="flex justify-center items-center p-5">
                    <img
                      src={meal?.strMealThumb}
                      alt={meal.strMeal}
                      className="h-[120px] w-[120px] rounded-xl border border-yellow-400 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>

              </div>
            ))}
          </SlickSlider>
        </div>
      </section>
    </>
  );
};

export default TredingRecipie;
