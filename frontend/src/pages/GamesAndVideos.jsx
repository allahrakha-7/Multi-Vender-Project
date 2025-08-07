// pages/GamesAndVideos.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Sample data
const gamesList = [
  { id: 1, name: "Bouncing Ball", description: "A simple interactive ball game." },
  { id: 2, name: "Tetris Challenge", description: "Classic Tetris with a twist." },
  { id: 3, name: "Maze Runner", description: "Navigate through a fun maze." },
];

const videosList = [
  {
    id: 1,
    title: "Vendify Tour 2025",
    description: "Explore our latest store updates and features.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed URL
  },
  {
    id: 2,
    title: "Top Deals Unboxed",
    description: "Unboxing the best deals available this month.",
    url: "https://www.youtube.com/embed/0bS6f3i0_5w", // Placeholder YouTube embed URL
  },
  {
    id: 3,
    title: "Shopping Tips",
    description: "Expert tips for smart online shopping.",
    url: "https://www.youtube.com/embed/1Z1p0u9m4eY", // Placeholder YouTube embed URL
  },
];

const GamesAndVideos = () => {
  useEffect(() => {
    // p5.js sketch for a simple bouncing ball game
    const sketch = (p) => {
      let ballX = 50;
      let ballY = 50;
      let ballSpeedX = 3;
      let ballSpeedY = 2;

      p.setup = () => {
        p.createCanvas(400, 300).parent("game-canvas");
      };

      p.draw = () => {
        p.background(220);
        p.ellipse(ballX, ballY, 20, 20);
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballX > p.width - 10 || ballX < 10) ballSpeedX *= -1;
        if (ballY > p.height - 10 || ballY < 10) ballSpeedY *= -1;
      };
    };

    // Load p5.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js";
    // eslint-disable-next-line no-undef
    script.onload = () => new p5(sketch);
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("games");

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

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Games & Videos</h1>
            <p className="mt-4 text-lg text-gray-600">
              Enjoy entertainment and insights with Vendify
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 flex justify-center space-x-6">
            <button
              className={`px-4 py-2 rounded-full font-semibold ${activeTab === "games"
                ? "bg-[#00bf63] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab("games")}
            >
              Games
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold ${activeTab === "videos"
                ? "bg-[#00bf63] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
          </div>

          {/* Content Section */}
          {activeTab === "games" ? (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Play Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Game Canvas */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div id="game-canvas" className="mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900">Bouncing Ball</h3>
                  <p className="text-gray-600">A simple interactive ball game.</p>
                </div>
                {/* Other Games */}
                {gamesList.slice(1).map((game) => (
                  <div
                    key={game.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{game.name}</h3>
                    <p className="text-gray-600">{game.description}</p>
                    <Link
                      to={`/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="mt-4 inline-block text-[#00bf63] font-semibold hover:underline"
                    >
                      Play Now
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Watch Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosList.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mt-4">{video.title}</h3>
                    <p className="text-gray-600">{video.description}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-[#00bf63] font-semibold hover:underline"
                    >
                      <FaPlayCircle className="mr-2" /> Watch Now
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesAndVideos;