import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const SportsAndWatches = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <IoArrowBack
        onClick={goBack}
        className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" role="main">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900" aria-label="Sports and Watches">
              Sports and Watches
            </h1>
            <p className="mt-4 text-lg text-gray-600">Explore top-tier sports gear and stylish watches</p>
          </div>

          <div className="mb-6" aria-label="Product Categories">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sports Gear</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">High-performance sports equipment for football, basketball, and more from brands like Nike and Adidas.</p>
                  <Link to="/sports-gear" className="text-[#00bf63] hover:underline mt-2 inline-block">View Sports Gear</Link>
                </div>
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Customizable sports kits and accessories tailored to your needs.</p>
                  <Link to="/custom-sports-gear" className="text-[#00bf63] hover:underline mt-2 inline-block">Customize Your Gear</Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Watches</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Elegant and smart watches from brands like Rolex, Apple, and Garmin.</p>
                  <Link to="/watches" className="text-[#00bf63] hover:underline mt-2 inline-block">View Watches</Link>
                </div>
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Design your own watch with personalized straps and dials.</p>
                  <Link to="/custom-watches" className="text-[#00bf63] hover:underline mt-2 inline-block">Design Your Watch</Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessories</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Enhance your sports and watch experience with fitness trackers and watch bands.</p>
                  <Link to="/sports-accessories" className="text-[#00bf63] hover:underline mt-2 inline-block">Shop Accessories</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need assistance? Contact our support team.</p>
            <Link
              to="/contact"
              className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
              aria-label="Contact Support"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SportsAndWatches;