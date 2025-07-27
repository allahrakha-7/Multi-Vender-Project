import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useMemo } from "react";

const FeaturedProduct = () => {
  const { allProducts = [] } = useSelector((state) => state.products);

  const featuredData = useMemo(() => allProducts.slice(0, 10), [allProducts]);

  return (
    <section className="w-full bg-gradient-to-b from-white to-indigo-50/30 py-4">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto relative">
            Featured Products
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
          </h2>
          {featuredData.length > 0 && (
            <span className="hidden md:inline-block text-sm px-3 py-1 rounded-full bg-indigo-100 text-amber-400 font-medium">
              {featuredData.length} items
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 xl:gap-7 mb-12">
          {featuredData.length > 0
            ? featuredData.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl border border-transparent hover:border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  <ProductCard data={item} />
                </div>
              ))
            : Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;

const SkeletonCard = () => (
  <div className="animate-pulse bg-white p-4 rounded-xl shadow-sm">
    <div className="w-full h-40 bg-gray-200 rounded-md mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="flex items-center justify-between">
      <div className="h-6 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-20 bg-gray-200 rounded" />
    </div>
  </div>
);
