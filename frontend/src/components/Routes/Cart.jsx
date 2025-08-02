import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

function Cart() {
  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      <div className="p-4">
        <div className="mb-6">
        <h2 className="text-[27px] md:text-[32px] font-[700] font-[Georgia] relative">
            Your Cart:
            <span className="absolute -bottom-2 left-0 h-[3px] w-10 rounded-full bg-yellow-500/80" />
        </h2>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-7 mb-12">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="group rounded-xl bg-white border border-transparent hover:border-indigo-100 hover:shadow-lg transition-all duration-200"
                >
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;