import { Link } from "react-router-dom";
import hero from "../../images/hero.png";

function Hero() {
  return (
    <div
      className="relative max-sm:min-h-[102vh] min-h-[70vh] my-6 sm:min-h-[80vh] lg:min-h-[90vh] w-full bg-no-repeat flex items-center justify-center sm:justify-start"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-3/5 xl:w-1/2 font-[Georgia] text-center sm:text-left px-3 sm:px-8">
        <h1 className="text-3xl max-sm:text-md sm:text-2xl md:text-4xl lg:text-3xl font-black italic text-gray-950 leading-tight sm:leading-[1.2] capitalize">
          Welcome to Vendify <br />Your best ever
          shopping platform
        </h1>

        <p className="pt-6 mb-6 sm:pt-5 text-sm max-sm:text-lg sm:text-base md:text-lg lg:text-xl text-white font-[400] italic leading-relaxed sm:leading-8">
          Discover endless possibilities at your fingertips! From daily essentials to luxury finds, we bring the world's best products right
          to your doorstep. Experience seamless shopping with unbeatable prices,
          lightning-fast delivery, and customer service that truly cares.
          Whether you're searching for the latest tech gadgets, trendy fashion,
          home essentials, or unique gifts - Vendify makes every purchase a
          delightful journey from home to heart.
        </p>

        <Link to="/products" className="inline-block">
          <div className="w-[140px] sm:w-[160px] bg-gray-950 h-[45px] sm:h-[49px] text-white my-4 sm:my-2 hover:bg-white hover:text-green-900 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300">
            <span className="font-[Georgia] italic text-lg sm:text-xl">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
