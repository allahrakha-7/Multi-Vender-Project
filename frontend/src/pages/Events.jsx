import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" role="main">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-6 animate-pulse" aria-label="Upcoming Events">
            Upcoming Events
          </h1>
          <p className="text-xl md:text-2xl text-green/90 mb-10 drop-shadow-md">
            Join us for exciting tech, sports, and watch-related events!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event 1: Tech Expo */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Tech Expo 2025</h2>
              <p className="text-gray-700 mb-4">Discover the latest in computers and gadgets.</p>
              <p className="text-sm text-gray-600 mb-2">Date: Aug 15, 2025</p>
              <p className="text-sm text-gray-600">Location: Tech City Hall</p>
              <Link to="/events/tech-expo" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                Learn More
              </Link>
            </div>

            {/* Event 2: Sports Marathon */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Sports Marathon 2025</h2>
              <p className="text-gray-700 mb-4">Run with the best athletes and win prizes!</p>
              <p className="text-sm text-gray-600 mb-2">Date: Aug 20, 2025</p>
              <p className="text-sm text-gray-600">Location: Central Park</p>
              <Link to="/events/sports-marathon" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                Learn More
              </Link>
            </div>

            {/* Event 3: Watch Launch */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Luxury Watch Launch</h2>
              <p className="text-gray-700 mb-4">Unveil the newest watch collections.</p>
              <p className="text-sm text-gray-600 mb-2">Date: Aug 25, 2025</p>
              <p className="text-sm text-gray-600">Location: Grand Plaza</p>
              <Link to="/events/watch-launch" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                Learn More
              </Link>
            </div>

            {/* Event 4: Community Workshop */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Tech & Sports Workshop</h2>
              <p className="text-gray-700 mb-4">Learn and connect with experts.</p>
              <p className="text-sm text-gray-600 mb-2">Date: Aug 30, 2025</p>
              <p className="text-sm text-gray-600">Location: Online & Local Venue</p>
              <Link to="/events/workshop" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                Learn More
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-white/80 text-lg mb-4">Stay updated with our latest events!</p>
            <Link
              to="/contact"
              className="inline-block bg-[#00bf63] text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl"
              aria-label="Contact for Events"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;