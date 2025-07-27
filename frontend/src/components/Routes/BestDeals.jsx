import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    const topEight = sortedData.slice(0, 8);
    setData(topEight);
  }, [allProducts]);

  return (
    <section className="w-full my-2 bg-gradient-to-b from-white to-indigo-50/40">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[27px] md:text-[32px] font-[700] font-Roboto relative">
            Best Deals
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
          </h2>
          <span className="hidden md:inline-block text-sm px-3 py-1.5 rounded-full bg-white shadow-sm text-amber-400 font-medium">
            Hand‑picked for you
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-7 mb-12">
          {data && data.length > 0
            ? data.map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl bg-white border border-transparent hover:border-indigo-100 hover:shadow-lg transition-all duration-200"
                >
                  <ProductCard data={item} />
                </div>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl bg-white p-4 shadow-sm">
    <div className="w-full h-40 bg-gray-200 rounded-md mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="flex items-center justify-between">
      <div className="h-6 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-20 bg-gray-200 rounded" />
    </div>
  </div>
);
