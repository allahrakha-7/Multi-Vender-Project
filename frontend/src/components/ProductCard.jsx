import { Link } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCard({ data }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item._id === data._id);

  const handleAddToCart = () => {
    if (!currentUser) {
      toast.error("Signup to create your account!");
      navigate("/");
      return;
    }
    dispatch(addToCart(data));
    toast.success("Added to cart successfully!");
  };

  const handleRemoveFromCart = () => {
    if (!currentUser) {
      toast.error("Signup to create your account!");
      navigate("/");
      return;
    }
    dispatch(removeFromCart(data._id));
    toast.success("Product removed from cart!");
  };

  
  const handleOnClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      toast.error("Signup to create your account!");
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm p-4 relative border cursor-pointer border-gray-400 hover:shadow-md transition-all duration-200">
        <Link onClick={handleOnClick} to={`/product/${data._id}`}>
          <div>
            <img
              src={data.images[0]}
              alt={data.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <hr className="border-t border-gray-300 my-2" />
            <h2 className="text-2xl font-semibold text-green-600 line-clamp-1">
              {data.name}
            </h2>
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
              {data.description}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-lg font-semibold text-green-600">
                Rs. {data.discountPrice}
              </p>
              <span className="text-sm p-2 line-through text-gray-400">
                Rs. {data.originalPrice}
              </span>
              <span className="ml-auto text-xs sm:text-xs lg:text-xs md:text-base font-semibold bg-yellow-100 text-yellow-800 px-2 rounded-full">
                {data.originalPrice && data.discountPrice
                  ? Math.round(
                      ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
                    ) || 0
                  : "0"}
                % OFF
              </span>
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-between sm:flex-row gap-2 mt-4">
          <Link to='/placeorder'>
          <button
            className="w-full sm:w-auto cursor-pointer bg-green-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-700 transition"
          >
            Buy Now
          </button>
          </Link>
          {isInCart ? (
            <button
              className="w-full sm:w-auto cursor-pointer bg-red-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-700 transition"
              onClick={handleRemoveFromCart}
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="w-full sm:w-auto cursor-pointer bg-blue-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-700 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
        <div className="flex items-center justify-start gap-2 text-yellow-700 font-semibold text-md mt-2">
          Ratings:
          {[...Array(5)].map((_, i) => (
            <IoMdStar
              key={i}
              className={i < Math.round(data.ratings || 0) ? "" : "text-gray-300"}
            />
          ))}
          <span className="text-xs text-gray-500">({data.ratings || 0}/5)</span>
        </div>
      </div>
    </>
  );
}

export default ProductCard;