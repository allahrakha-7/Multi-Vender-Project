import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

function OrderDetails() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const product =
    Array.isArray(products) && products.length > 0 ? products[0] : null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phoneNumber: "",
    country: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!currentUser) {
      toast.error("Please sign in to place order");
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please sign in to place an order");
      navigate("/signup");
      return;
    }
    if (!product?._id) {
      toast.error("No product selected");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        userId: currentUser._id,
        ...formData,
        cart: [
          {
            productId: product._id,
            quantity: 1,
          },
        ],
        paymentInfo: {
          status: "Unpaid",
        },
      };

      const res = await fetch("/api/order/place-order-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to place order");
      }

      navigate("/order-success");
    } catch (err) {
      toast.error(err.message || "Failed to place order");
      navigate("/order-cancel");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) {
      toast.error("No product selected");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product: {
            _id: product._id,
            name: product.name,
            price: Math.round(product.discountPrice * 100), 
            image: product.images?.[0] || "/placeholder.jpg",
          },
          userId: currentUser._id,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      toast.error(`Payment error: ${error.message}`);
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-16">
      <IoArrowBack
        onClick={() => navigate('/products')}
        className="text-2xl cursor-pointer absolute top-4 left-4 font-semibold z-10 hover:text-blue-600 transition-colors"
      />
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              Complete Your Order
            </h1>
            <p className="text-blue-100 mt-2">
              Review product details and provide shipping information carefully!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* LEFT SIDE - Product */}
            <div className="lg:w-1/2 p-8 bg-gray-50">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Product Details
                </h2>
                {loading || !product ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">
                      Loading product details...
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-md mb-6">
                        <img
                          src={product.images?.[0] || "/placeholder.jpg"}
                          alt={product.name || "Product"}
                          className="w-full h-64 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          <span className="text-2xl font-bold text-green-600">
                            Rs. {product.discountPrice || 0}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              Rs. {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-center">
                            <div className="font-semibold text-gray-700">
                              Total
                            </div>
                            <div className="text-green-600 font-bold text-center">
                              Rs. {product.discountPrice || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {product && (
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mt-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Order Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">
                          Rs. {product.discountPrice || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold text-lg text-green-600">
                            Rs. {product.discountPrice || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-gray-300"></div>

            {/* RIGHT SIDE - Shipping Form */}
            <div className="lg:w-1/2 p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      1
                    </div>
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                      2
                    </div>
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Pakistan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Lahore"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Apartment, suite, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleOnChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="75500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!product}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;