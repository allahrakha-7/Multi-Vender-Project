import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../../redux/reducers/userSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const categories = [
    "Personal Care",
    "Household Items",
    "Health & Medicine",
    "Entertainment",
    "Decorations",
    "Electronics",
    "Stationery and Bags",
    "Others",
  ];

  const products = [
    "Computers and Laptops",
    "Cosmetics and Body Care",
    "Accessories",
    "Cloths and Shoes",
    "Gifts",
    "Pet Care",
    "Mobile and Tablets",
    "Music and Gaming",
    "Others",
  ];

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await fetch("/api/auth/signout");
      const result = await data.json(); // Parse JSON response
      if (data.success === false || !result.success) {
        dispatch(signOutUserFailure(result.message));
        toast.error(result.message || "Something went wrong!");
        return;
      }
      dispatch(signOutUserSuccess(result));
      toast.success(result.message || "Signed Out Successfully!");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-2 py-3 bg-slate-50 shadow-md">
        <div className="w-full h-full flex items-center justify-between gap-4 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
            <button
              type="button"
              className="sm:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <HiMenuAlt3 size={24} />
            </button>

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
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white hover:border-gray-400 focus:border-gray-800 focus:outline-none w-full px-3 py-2 text-sm sm:text-base rounded-full border border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <FaSearch className="text-gray-600 text-base max-lg:hidden" />
                </button>
              </div>
            </div>
          </div>

          <nav className="hidden sm:flex items-center space-x-6 md:space-x-10">
            <Link to="/" className="text-gray-700 text-sm md:text-base">
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsProductOpen(true)}
              onMouseLeave={() => setIsProductOpen(false)}
            >
              <button
                type="button"
                className="flex items-center text-gray-700 text-sm md:text-base"
              >
                Products
                <IoIosArrowDown
                  className={`ml-1 transition-transform ${isProductOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md transition-all duration-200 ease-in-out z-50 ${isProductOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                <ul className="py-2 text-gray-700 text-sm max-h-[320px]">
                  {products.map((product, index) => (
                    <li
                      key={index}
                      className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        to={`/products/${product
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                type="button"
                className="flex items-center mr-5 text-gray-700 text-sm md:text-base"
              >
                Categories
                <IoIosArrowDown
                  className={`ml-1 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md transition-all duration-200 ease-in-out z-50 ${isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                <ul className="py-2 text-gray-700 text-sm max-h-[320px] overflow-y-auto">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link
                        to={`/categories/${category
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {currentUser ? (
              <>
                <Link to="/cart" className="relative cursor-pointer">
                  <AiOutlineShoppingCart size={24} />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-3 h-3 text-white font-mono text-[10px] leading-tight text-center">
                    {cart.length}
                  </span>
                </Link>
                <div className="relative cursor-pointer" ref={profileRef}>
                  <img
                    src={currentUser.avatar}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    onClick={() => setProfileOptions((prev) => !prev)}
                  />
                  {profileOptions && (
                    <div className="absolute right-0 mt-2 w-35 font-semibold bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <Link
                        to="/seller-dashboard"
                        className="block px-2 py-3 text-center text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOptions(false)}
                      >
                        Switch to Seller
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-2 py-3 text-center text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOptions(false)}
                      >
                        Edit Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-center px-4 py-2 text-sm cursor-pointer text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/sign-in"
                className="bg-[#00bf63] cursor-pointer text-white text-sm md:text-base font-semibold px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-green-700 border border-green-700 transition"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 sm:hidden">
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-lg">Menu</div>
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <RxCross2 size={22} />
              </button>
            </div>

            <div className="relative flex items-center mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white hover:border-gray-400 focus:border-gray-800 focus:outline-none flex-1 px-4 py-2 text-sm rounded-full border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={(e) => e.preventDefault()}
                className="absolute right-3"
              >
                <FaSearch className="text-gray-700 text-base" />
              </button>
            </div>

            <nav className="space-y-3">
              <Link
                to="/"
                className="block py-2 text-gray-800 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              <div className="border-t border-gray-200 pt-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-2 text-gray-800 font-medium"
                  onClick={() => setMobileProductsOpen((p) => !p)}
                >
                  <span>Products</span>
                  <IoIosArrowDown
                    className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileProductsOpen && (
                  <ul className="pl-3 py-1 space-y-1">
                    {products.map((product, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/products/${product
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setMobileOpen(false)}
                        >
                          {product}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-2 text-gray-800 font-medium"
                  onClick={() => setMobileCategoriesOpen((p) => !p)}
                >
                  <span>Categories</span>
                  <IoIosArrowDown
                    className={`transition-transform ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileCategoriesOpen && (
                  <ul className="pl-3 py-1 space-y-1">
                    {categories.map((category, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/categories/${category
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => setMobileOpen(false)}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;