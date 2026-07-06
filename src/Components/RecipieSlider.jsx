import React , { useEffect, useState } from "react";
import Slider from "react-slick";
import { useFetch } from "./useFetch";
import { Divide } from "lucide-react";
import RecipieCard from "./RecipieCard";

import { Clock , Loader } from "lucide-react";

const RecipieSlider = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);
  // console.log("my meal data", data);
  const meals = data?.meals || [];

  const [slidesToShow, setSlidesToShow] = useState(3);

  // test
useEffect(() => {
  const updateSlides = () => {
    if (window.innerWidth < 640) {
      setSlidesToShow(1);
    } else if (window.innerWidth < 1024) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  };

  updateSlides();

  window.addEventListener("resize", updateSlides);

  return () => window.removeEventListener("resize", updateSlides);
}, []);

// test

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow:  slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  const SlickSlider = Slider.default || Slider;

  if(loading) return(
    <div className="text-center p-8 text-gray-300">
      <Loader className="animate-spin inline-block mr-2 text-orange-400"/>
      Loading{title}...

    </div>
  )
  return (
    <>
      <section className="mt-2 mx-auto ">
        <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight border-1-4 border-yellow-400 pl-4 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-orange-500" />
          {title}
        </h2>

        <div style={{ width: "90%", margin: "auto", padding: "10px" }}>
          <SlickSlider {...settings}>

            {meals.map((meal) => (
              <div key={meal.idMeal} className="px-10 flex justify-center">
                <RecipieCard meal={meal} />
              </div>
            ))}

          </SlickSlider>
        </div>
      </section>
    </>
  );
};

export default RecipieSlider;
