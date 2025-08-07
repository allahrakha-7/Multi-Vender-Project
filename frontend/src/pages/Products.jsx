import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOtherUsersProductsStart,
  fetchOtherUsersProductsSuccess,
  fetchOtherUsersProductsFailure,
} from "../redux/reducers/productSlice";
import ProductCard from "../components/ProductCard";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

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

  const goBack = () => {
    navigate(-1);
  };

  const filteredProducts = products
    ?.filter((item) => item.seller !== currentUser._id)
    .filter((item) => {
      const matchesCategory = !category || item.category === category;
      const matchesSearch = !search || 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
      return matchesCategory && matchesSearch;
    });

  return (
    <>
      <div className="bg-gradient-to-b from-white to-indigo-50/30">
  <IoArrowBack
    onClick={goBack}
    className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
  />
      <div className="w-11/12 mx-auto py-6 ">
        <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto mb-6">
          {category ? `${category} Products` : search ? `Search Results for "${search}"` : "All Products"}
        </h2>
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