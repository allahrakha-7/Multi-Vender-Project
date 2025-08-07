import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProductDetails({data}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const isInCart = cart.some((item) => item._id === data._id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`, {
          withCredentials: true,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch product");
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    if (!product) fetchProduct();
    else setLoading(false);
  }, [id, product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Product added to cart!");
    }
  };

    const handleRemoveFromCart = () => {
      dispatch(removeFromCart(data._id));
      toast.success("Product removed from cart!");
    };

  if (loading) return <div className="text-center py-20">Loading product details...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;
  if (!product) return <div className="text-center text-red-500 py-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 sm:px-6 md:px-12">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden"> {/* Changed max-w-6xl to w-full */}
        <div className="w-full h-64 sm:h-96 md:h-[500px]">
          {product.images && product.images.length > 1 ? (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={1}
              className="w-full h-full"
            >
              {product.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`product-${i}`}
                    className="w-full h-full object-contain bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain bg-white"
            />
          ) : null}
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700">{product.name || "N/A"}</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl break-words">
            {product.description || "No description available"}
          </p>
          <div className="flex items-center font-semibold gap-2">
            <span className="text-md sm:text-base md:text-lg text-green-600 font-semibold">
              Rs. {product.discountPrice || 0}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-500 line-through">
                  Rs. {product.originalPrice}
                </span>
                <span className="ml-auto text-xs sm:text-sm md:text-base font-semibold bg-yellow-100 text-yellow-800 px-2 rounded-full">
                  {product.originalPrice && product.discountPrice
                    ? Math.round(
                        ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
                      ) || 0
                    : "0"}
                  % OFF
                </span>
              </>
            )}
          </div>
          <div className="flex justify-between text-sm sm:text-base text-gray-500">
            <span>Stock: {product.stock || 0}</span>
            <span>Category: {product.category || "N/A"}</span>
          </div>
          <p className="text-xs sm:text-sm md:text-base italic text-gray-500">
            Shop: {product.shop || "N/A"}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              className="w-full sm:w-auto bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
              onClick={() => alert("Buy Now clicked!")}
            >
              Buy Now
            </button>
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
          <button
            className="w-full sm:w-auto mt-2 text-sm sm:text-base md:text-lg bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
            onClick={() => navigate(-1)}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;