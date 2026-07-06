import { ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <ChefHat size={26} className="text-orange-500" />

            <h2 className="text-2xl font-bold text-white">
              Cook<span className="text-orange-500">Smart</span>
            </h2>
          </div>

          <p className="text-gray-400 mt-2 max-w-lg text-sm leading-6">
            Discover delicious recipes using ingredients already available in your kitchen.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-8">

          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              13,500+
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Recipes
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              Smart
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Ingredient Matching
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              Real
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Recipe Images
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              Fast
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Recipe Discovery
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
          <p className="text-gray-600">
            © {new Date().getFullYear()} CookSmart
          </p>

          <p className="text-gray-500">
            Powered by <span className="text-white">React</span> •{" "}
            <span className="text-white">Tailwind CSS</span> •{" "}
            <span className="text-white">Epicurious Dataset</span>
          </p>


        </div>

      </div>
    </footer>
  );
};

export default Footer;