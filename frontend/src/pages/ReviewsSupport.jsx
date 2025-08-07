import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const ReviewsSupport = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("latest");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/reviews", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    setAverageRating(reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0);
  }, [reviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating <= 0 || !newReview.comment.trim()) {
      toast.error("Please provide a rating and comment.");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newReview,
          userId: currentUser?._id,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      const data = await res.json();
      setReviews([data, ...reviews]);
      setNewReview({ rating: 0, comment: "" });
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    return new Date(b.createdAt) - new Date(a.createdAt); // Default to latest
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="mt-4 text-lg text-gray-600">
            Hear what our customers have to say about Vendify
          </p>
        </div>

        {/* Rating Summary */}
        <section className="mb-12 text-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall Rating</h2>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-4xl font-bold text-[#00bf63]">{averageRating}</span>
            <span className="text-2xl text-gray-600">/ 5</span>
          </div>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
        </section>

        {/* Sort Options */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <label className="block text-gray-700 mb-2">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bf63]"
          >
            <option value="latest">Latest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {/* Reviews Section */}
        <section className="mb-12">
          {loading ? (
            <p className="text-center text-gray-600">Loading reviews...</p>
          ) : sortedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-900">
                      {review.user?.username || "Anonymous"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No reviews available yet.</p>
          )}
        </section>

        {/* Submit Review Section */}
        {currentUser ? (
          <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leave a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`cursor-pointer ${i < newReview.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      onClick={() => handleRatingChange(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Comment</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bf63]"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00bf63] text-white font-semibold py-2 rounded-full hover:bg-green-700 transition"
                disabled={loading}
              >
                Submit Review
              </button>
            </form>
          </section>
        ) : (
          <p className="text-center text-gray-600 mb-12">
            Please <Link to="/sign-in" className="text-[#00bf63] hover:underline">sign in</Link> to leave a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSupport;