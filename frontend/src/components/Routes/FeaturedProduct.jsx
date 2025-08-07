import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchOtherUsersProductsStart,
  fetchOtherUsersProductsSuccess,
  fetchOtherUsersProductsFailure,
} from "../../redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FeaturedProduct() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchOtherUsersProductsStart());
        const res = await fetch("/api/products", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch products");

        dispatch(fetchOtherUsersProductsSuccess(data));
      } catch (error) {
        dispatch(fetchOtherUsersProductsFailure(error.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const featuredProducts = products?.filter((item) =>
    item.featuredProducts && (currentUser ? item.seller !== currentUser._id : true)
  ).slice(0, 12);
  const hasExcess = products?.filter((item) =>
    item.featuredProducts && (currentUser ? item.seller !== currentUser._id : true)
  ).length > 12;

  const handleOnClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      toast.error("Signup to create your account!");
      navigate("/");
    }
  };

  return (
    <section className="w-full my-2 bg-gradient-to-b from-white to-indigo-50/40">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto relative">
            Featured Products
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-7 mb-12 relative">
          {loading ? (
            <p className="col-span-full text-center text-gray-400">Loading products...</p>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            featuredProducts.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl bg-white border border-transparent hover:border-indigo-100 hover:shadow-lg transition-all duration-200"
              >
                <ProductCard data={item} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No products found</p>
          )}

          {hasExcess && (
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent blur-sm pointer-events-none" />
          )}
          {hasExcess && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Link to="/products" onClick={handleOnClick}>
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  explore more...
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProduct;