import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const ComputersAndLaptops = () => {
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
            <h1 className="text-4xl font-bold text-gray-900" aria-label="Computers and Laptops">
              Computers and Laptops
            </h1>
            <p className="mt-4 text-lg text-gray-600">Explore a wide range of devices and accessories</p>
          </div>

          <div className="mb-6" aria-label="Product Categories">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Laptops</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Discover laptops for gaming, business, and daily use from brands like Dell, HP, and Lenovo.</p>
                  <Link to="/laptops" className="text-[#00bf63] hover:underline mt-2 inline-block">View Laptops</Link>
                </div>
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Build your own laptop with customizable options from Framework and AVADirect.</p>
                  <Link to="/custom-laptops" className="text-[#00bf63] hover:underline mt-2 inline-block">Build Your Own</Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Desktops</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">High-performance desktops for gaming and work from ORIGIN PC and PCSpecialist.</p>
                  <Link to="/desktops" className="text-[#00bf63] hover:underline mt-2 inline-block">View Desktops</Link>
                </div>
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Create your own desktop with modular components using guides from Newegg or Crucial.</p>
                  <Link to="/custom-desktops" className="text-[#00bf63] hover:underline mt-2 inline-block">Build Your Own</Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessories</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-[#00bf63]">
                  <p className="text-gray-700">Enhance your setup with monitors, keyboards, and more, compatible with laptops and desktops.</p>
                  <Link to="/accessories" className="text-[#00bf63] hover:underline mt-2 inline-block">Shop Accessories</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need help choosing? Contact our support team.</p>
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

export default ComputersAndLaptops;