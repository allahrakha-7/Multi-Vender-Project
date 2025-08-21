import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import p5 from "p5";

// Sample data
const gamesList = [
  { id: 1, name: "Bouncing Ball", description: "Control the ball with arrow keys and score points!" },
  { id: 2, name: "Tetris Challenge", description: "Stack falling blocks with arrow keys!" },
  { id: 3, name: "Maze Runner", description: "Navigate the maze with arrow keys!" },
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
  const [activeTab, setActiveTab] = useState("games");
  const [activeGame, setActiveGame] = useState("Bouncing Ball");
  const navigate = useNavigate();
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // p5.js sketch for multiple games
    const sketch = (p) => {
      let ballX = 200, ballY = 150;
      // eslint-disable-next-line no-unused-vars
      let ballSpeedX = 3, ballSpeedY = 2; 
      let ballSize = 20, ballColor = [255, 0, 0];
      let blockX = 200, blockY = 0, blockSpeed = 2, blockSize = 20;
      let playerX = 50, playerY = 250, playerSize = 20;
      let maze = [];

      p.setup = () => {
        p.createCanvas(400, 300).parent("game-canvas");
        p.noStroke();
        // Initialize maze (simple walls)
        maze = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
      };

      p.draw = () => {
        p.background(220);
        if (gameActive) {
          if (activeGame === "Bouncing Ball") {
            ballColor = [p.sin(p.frameCount * 0.05) * 127 + 128, p.cos(p.frameCount * 0.03) * 127 + 128, p.sin(p.frameCount * 0.07) * 127 + 128];
            p.fill(...ballColor);
            p.ellipse(ballX, ballY, ballSize, ballSize);

            if (p.keyIsDown(p.LEFT_ARROW)) ballX -= 5;
            if (p.keyIsDown(p.RIGHT_ARROW)) ballX += 5;
            if (p.keyIsDown(p.UP_ARROW)) ballY -= 5;
            if (p.keyIsDown(p.DOWN_ARROW)) ballY += 5;

            if (ballX > p.width - ballSize / 2 || ballX < ballSize / 2) {
              ballSpeedX *= -1;
              setScore((prev) => prev + 10);
              console.log("Boing! +10 points");
            }
            if (ballY > p.height - ballSize / 2 || ballY < ballSize / 2) {
              ballSpeedY *= -1;
              setScore((prev) => prev + 10);
              console.log("Boing! +10 points");
            }

            ballX = p.constrain(ballX, ballSize / 2, p.width - ballSize / 2);
            ballY = p.constrain(ballY, ballSize / 2, p.height - ballSize / 2);
          } else if (activeGame === "Tetris Challenge") {
            blockY += blockSpeed;
            if (blockY > p.height) {
              blockY = 0;
              blockX = p.random(0, p.width - blockSize);
              setScore((prev) => prev + 5);
              console.log("Block stacked! +5 points");
            }
            p.fill(0, 0, 255);
            p.rect(blockX, blockY, blockSize, blockSize);

            if (p.keyIsDown(p.LEFT_ARROW) && blockX > 0) blockX -= 5;
            if (p.keyIsDown(p.RIGHT_ARROW) && blockX < p.width - blockSize) blockX += 5;
          } else if (activeGame === "Maze Runner") {
            p.fill(0, 255, 0);
            p.rect(playerX, playerY, playerSize, playerSize);

            if (p.keyIsDown(p.LEFT_ARROW)) playerX -= 5;
            if (p.keyIsDown(p.RIGHT_ARROW)) playerX += 5;
            if (p.keyIsDown(p.UP_ARROW)) playerY -= 5;
            if (p.keyIsDown(p.DOWN_ARROW)) playerY += 5;

            playerX = p.constrain(playerX, 0, p.width - playerSize);
            playerY = p.constrain(playerY, 0, p.height - playerSize);

            // Draw maze
            p.fill(100);
            for (let y = 0; y < maze.length; y++) {
              for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === 1) {
                  p.rect(x * 40, y * 40, 40, 40);
                }
              }
            }
            // Simple win condition (reach bottom right)
            if (playerX > p.width - playerSize && playerY > p.height - playerSize) {
              setScore((prev) => prev + 50);
              console.log("Maze completed! +50 points");
              setGameActive(false);
            }
          }
        }
      };

      p.keyPressed = () => {
        if (gameActive) {
          if (activeGame === "Bouncing Ball" && (p.keyCode === p.LEFT_ARROW || p.keyCode === p.RIGHT_ARROW || p.keyCode === p.UP_ARROW || p.keyCode === p.DOWN_ARROW)) {
            ballSpeedX = 3 * (p.keyCode === p.LEFT_ARROW ? -1 : p.keyCode === p.RIGHT_ARROW ? 1 : 0);
            ballSpeedY = 2 * (p.keyCode === p.UP_ARROW ? -1 : p.keyCode === p.DOWN_ARROW ? 1 : 0);
          }
        }
      };
    };

    // Load p5.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js";
    script.onload = () => new p5(sketch);
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [gameActive, activeGame]);

  const goBack = () => {
    navigate(-1);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0); // Reset score on start
  };

  return (
    <>
      <IoArrowBack
        onClick={goBack}
        className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors"
      />

      <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Games & Videos</h1>
            <p className="mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Enjoy entertainment and insights with Vendify
            </p>
          </div>

          {/* Main Tab Navigation */}
          <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base ${activeTab === "games"
                ? "bg-[#00bf63] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-colors`}
              onClick={() => {
                setActiveTab("games");
                setGameActive(false); // Reset game state when switching tabs
              }}
            >
              Games
            </button>
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base ${activeTab === "videos"
                ? "bg-[#00bf63] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-colors`}
              onClick={() => {
                setActiveTab("videos");
                setGameActive(false); // Reset game state when switching tabs
              }}
            >
              Videos
            </button>
          </div>

          {/* Content Section */}
          {activeTab === "games" ? (
            <section className="mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6">Enjoyable Play Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {/* Game Selector */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4 sm:mb-6 flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                  {gamesList.map((game) => (
                    <button
                      key={game.id}
                      className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base ${activeGame === game.name
                        ? "bg-[#00bf63] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        } transition-colors`}
                      onClick={() => {
                        setActiveGame(game.name);
                        setGameActive(false); // Reset game when switching
                      }}
                    >
                      {game.name}
                    </button>
                  ))}
                </div>
                {/* Active Game Canvas */}
                <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md w-full">
                  <div id="game-canvas" className="mb-3 sm:mb-4 md:mb-6 w-full h-auto">
                    <button
                      onClick={startGame}
                      className="w-full bg-[#00bf63] text-white py-1 sm:py-2 md:py-2.5 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base"
                      disabled={gameActive}
                    >
                      {gameActive ? "Playing..." : "Play"}
                    </button>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">{activeGame}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">{gamesList.find(g => g.name === activeGame)?.description}</p>
                  {gameActive && (
                    <p className="text-green-600 font-semibold mt-1 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base">Score: {score}</p>
                  )}
                </div>
                {/* Other Games (Links) */}
                {gamesList.filter(g => g.name !== activeGame).map((game) => (
                  <div
                    key={game.id}
                    className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900">{game.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{game.description}</p>
                    <Link
                      to={`/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="mt-2 sm:mt-3 md:mt-4 inline-block text-[#00bf63] font-semibold text-xs sm:text-sm md:text-base hover:underline"
                    >
                      Play Now
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6">Watch Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {videosList.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
                  >
                    <div className="relative w-full h-0 pb-[56.25%] sm:pb-[60%] md:pb-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 mt-2 sm:mt-3 md:mt-4">{video.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{video.description}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 sm:mt-3 md:mt-4 inline-flex items-center text-[#00bf63] font-semibold text-xs sm:text-sm md:text-base hover:underline"
                    >
                      <FaPlayCircle className="mr-1 sm:mr-2" /> Watch Now
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