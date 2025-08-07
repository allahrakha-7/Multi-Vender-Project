/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const initialPosts = [
  {
    id: 1,
    title: "Top 10 Deals of the Month",
    excerpt: "Discover the best discounts and offers available this month on Vendify.",
    date: "2025-08-01",
    image: "https://via.placeholder.com/400x200",
    slug: "top-10-deals-of-the-month",
  },
  {
    id: 2,
    title: "How to Shop Smart Online",
    excerpt: "Learn tips and tricks to maximize your savings while shopping online.",
    date: "2025-07-28",
    image: "https://via.placeholder.com/400x200",
    slug: "how-to-shop-smart-online",
  },
  {
    id: 3,
    title: "Introducing New Sellers on Vendify",
    excerpt: "Meet our latest partners bringing unique products to your doorstep.",
    date: "2025-07-20",
    image: "https://via.placeholder.com/400x200",
    slug: "introducing-new-sellers",
  },
  {
    id: 4,
    title: "Sustainable Shopping Guide",
    excerpt: "Explore eco-friendly products and practices on Vendify.",
    date: "2025-07-15",
    image: "https://via.placeholder.com/400x200",
    slug: "sustainable-shopping-guide",
  },
];

const Blog = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    // Example API fetch (uncomment and adjust if using backend)
    // const fetchPosts = async () => {
    //   const res = await fetch('/api/blog-posts', { credentials: "include" });
    //   const data = await res.json();
    //   setPosts(data);
    // };
    // fetchPosts();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
            <p className="mt-4 text-lg text-gray-600">
              Stay updated with the latest tips, trends, and news from Vendify
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Post</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={initialPosts[0].image}
                alt={initialPosts[0].title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900">{initialPosts[0].title}</h3>
                <p className="text-gray-600 mt-2">{initialPosts[0].excerpt}</p>
                <Link
                  to={`/blog/${initialPosts[0].slug}`}
                  className="mt-4 inline-block text-[#00bf63] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.excerpt}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(post.date).toLocaleDateString()}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-block text-[#00bf63] font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 mx-1 rounded-full ${currentPage === number
                    ? "bg-[#00bf63] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Blog;