import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function OrderDetails() {
  const { id } = useParams(); // product ID from route
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/details/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch product");
      } catch (err) {
        toast.error(err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");
        // Remove sensitive fields
        // const { password, role, ...safeData } = data;
        // setUser(safeData);
      } catch (err) {
        toast.error(err.message);
      }
    };

    Promise.all([fetchProduct(), fetchUser()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! 🚀");
    // Here you’ll call your backend order API
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <>
      <div className="flex justify-center items-center mt-2">
      <div className="w-[50%] border rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Details:</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>City:</strong> {user.city}</p>
              <p><strong>Postal Code:</strong> {user.postalCode}</p>
              <p><strong>Country:</strong> {user.country}</p>
            </div>
          ) : (
            <p>No user details found.</p>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Place Order
        </button>
      </div>
      </div>
      </>
  );
}


export default OrderDetails