import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOtherUsersProductsStart,
  fetchOtherUsersProductsSuccess,
  fetchOtherUsersProductsFailure,
} from "../redux/reducers/productSlice";
import ProductCard from "../components/ProductCard";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductsPage() {
  const { products, loading } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(fetchOtherUsersProductsStart());
        const res = await fetch("/api/products/all", {
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

  const goBack = () => {
    navigate(-1);
  };

  const filteredProducts = products
    ?.filter((item) => item.seller !== currentUser._id)
    .filter((item) => {
      const matchesSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesSearch;
    });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-2 py-3 bg-slate-50 shadow-md">
        <div className="w-full h-full flex items-center justify-between gap-4 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
            <Link to="/" className="shrink-0">
              <div className="font-bold text-sm flex items-center">
                <MdOutlineShoppingCart className="text-[32px] text-gray-700 font-extralight" />
                <div className="flex flex-col ml-1">
                  <span className="text-green-600 text-[28px] font-semibold font-[Georgia]">
                    Vendify
                  </span>
                  <p className="text-[10px] text-gray-800 ml-2 uppercase italic">
                    shop from home
                  </p>
                </div>
              </div>
            </Link>

            <div className="hidden sm:flex flex-1 justify-center">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white hover:border-gray-400 focus:border-gray-800 focus:outline-none w-full px-3 py-2 text-sm sm:text-base rounded-full border border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <FaSearch className="text-gray-600 text-base max-lg:hidden" />
                </button>
              </form>
            </div>
          </div>

          <nav className="hidden sm:flex items-center space-x-6 md:space-x-10">
            <Link to="/" className="text-gray-700 text-sm md:text-base">
              Home
            </Link>
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/cart" className="relative cursor-pointer">
              <AiOutlineShoppingCart size={24} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-3 h-3 text-white font-mono text-[10px] leading-tight text-center">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-b from-white to-indigo-50/30 pt-16">
        <IoArrowBack
          onClick={goBack}
          className="text-2xl cursor-pointer absolute top-25 max-sm:top-21 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
        />
        <div className="w-11/12 mx-auto py-6 ">
          <h2 className="text-[27px] mt-3 md:text-[32px] font-[700] font-Roboto">
            All Products
          </h2>
          <h3 className="text-[18px] md:text-[18px] font-[600] font-Roboto">
            Search for more exciting products
          </h3>
        </div>
        <div className="w-11/12 mx-auto">
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:m-2 lg:grid-cols-4 gap-5 mx-2 md:gap-6 xl:gap-7">
          {loading ? (
            <p className="col-span-full text-center text-gray-400">Loading products...</p>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl bg-white border border-transparent hover:border-indigo-100 hover:shadow-lg transition-all duration-200"
              >
                <ProductCard data={item} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-red-400">No products found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;