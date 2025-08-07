// pages/Reviews.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Sample review data (replace with API fetch if needed)
const initialReviews = [
  {
    id: 1,
    user: "Ali Khan",
    rating: 4.5,
    comment: "Great selection of products and fast delivery! Highly recommend.",
    date: "2025-08-01",
  },
  {
    id: 2,
    user: "Sara Ahmed",
    rating: 5,
    comment: "Amazing customer service, the best online shopping experience!",
    date: "2025-07-28",
  },
  {
    id: 3,
    user: "Hassan Iqbal",
    rating: 4,
    comment: "Good deals, but shipping took a bit longer than expected.",
    date: "2025-07-20",
  },
];

const Reviews = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating((totalRating / reviews.length).toFixed(1) || 0);
  }, [reviews]);

  // Handle review submission (simulated, replace with API call)
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        user: currentUser ? currentUser.username : "Anonymous",
        ...newReview,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 0, comment: "" });
    }
  };

  // Handle rating selection
  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

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

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-900">{review.user}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
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
        </section>

        {/* Submit Review Section */}
        {currentUser && (
          <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leave a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Rating:</label>
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
                <label className="block text-gray-700 mb-2">Comment:</label>
                <textarea
                  className="w-full resize-none p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00bf63]"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <div className=" flex justify-center items-center">
              <button
                type="submit"
                className="w-[50%] bg-[#00bf63] text-white font-semibold py-3 rounded-full hover:bg-green-700 transition"
              >
                Submit Review
              </button>
              </div>
            </form>
          </section>
        )}
        {!currentUser && (
          <p className="text-center text-gray-600 mb-12">
            Please <Link to="/sign-in" className="text-[#00bf63] hover:underline">sign in</Link> to leave a review.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default Reviews;