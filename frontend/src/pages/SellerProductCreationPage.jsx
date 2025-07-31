import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../redux/reducers/productSlice";
import { RxCross2 } from "react-icons/rx";


function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    images: [],
    shopId: "",
    shop: { name: "" },
  });

  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!currentUser) return;

      try {
        dispatch(fetchProductsStart());
        const res = await fetch(`/api/product/get/${currentUser._id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch products");

        dispatch(fetchProductsSuccess(data));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    fetchProducts();
  }, [dispatch, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + formData.images.length > 5) {
      setImageUploadError(true);
      toast.error("You can only upload up to 5 images per listing!");
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    const uploadPromises = selectedFiles.map((file) => storeImage(file));
    try {
      const urls = await Promise.all(uploadPromises);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      setImageUploadError(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setImageUploadError(true);
      toast.error("Image upload failed (2 MB max per image!)");
    } finally {
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        reject("File size exceeds 2MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "multi_vendor_images");

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

      xhr.onload = () => {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url);
        } else {
          reject(xhr.responseText);
        }
      };

      xhr.onerror = () => reject("XHR request failed");
      xhr.send(formData);
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    if (!currentUser) {
      toast.error("Please log in first!");
      return;
    }

    if (formData.images.length < 1) {
      toast.error("You must upload at least one image!");
      return;
    }

    try {
      setUploading(true);
      dispatch(createProductStart());
      const userRef = currentUser._id;
      const shopId = currentUser._id;
      const shop = { name: currentUser.username || "Default Shop" };

      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, userRef, shopId, shop }),
      });

      const data = await res.json();
      console.log("API Response:", data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      dispatch(createProductSuccess(data));
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
        images: [],
        shopId: "",
        shop: { name: "" },
      });
      setFile([]);
    } catch (error) {
      console.error("Submission Error:", error);
      dispatch(createProductFailure(error.message));
      toast.error(error.message || "Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveProduct = () => {
    try {
      const res 
    } catch (error) {
      
    }
  }

  return (
    <div className="w-full mt-9 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl space-y-10">
        <form onSubmit={handleSubmit} className="bg-white w-full p-6 rounded-xl shadow space-y-5">
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <FaPlus /> Create Product
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="font-medium">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
                min="0"
              />
            </div>
            <div>
              <label className="font-medium">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
                min="0"
              />
            </div>
            <div>
              <label className="font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border focus:ring-1 border-gray-300 rounded-lg p-2 mt-1"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:ring-1 focus:outline-none rounded-lg p-2 mt-1 resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <FaImage className="inline mr-1" /> Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none cursor-pointer"
            />
            {imageUploadError && (
              <p className="text-red-500 text-sm mt-1">Image upload failed!</p>
            )}
            <div className="flex gap-3 mt-2 flex-wrap">
              {formData.images.map((src, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || loading}
            className="bg-green-600 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {uploading || loading ? "Creating..." : "Create Product"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow bg-white hover:shadow-lg transition duration-200 space-y-2"
            >
              <img
                src={product.images?.[0] || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
                
              /><RxCross2 onClick={handleRemoveProduct} className="relative left-69 bottom-43 cursor-pointer text-red-600 text-xl"/>
              <h4 className="text-lg font-bold text-green-800">{product.name}</h4>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 line-through text-sm">
                  Rs. {product.originalPrice}
                </span>
                <span className="text-green-600 font-semibold">
                  Rs. {product.discountPrice}
                </span>
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 rounded-full">
                  {product.originalPrice && product.discountPrice
                    ? Math.round(
                      ((product.originalPrice - product.discountPrice) /
                        product.originalPrice) *
                      100
                    ) || 0
                    : "0"}% OFF
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Stock: {product.stock}</span>
                <span>Category: {product.category}</span>
              </div>
              <p className="text-[10px] italic text-gray-400">
                Shop: {product.shop?.name || "N/A"}
              </p>
            </div>
          ))}
        </div>
        {products.length === 0 && !loading && (
          <p className="text-gray-500 text-center w-full col-span-full">
            No products created yet.
          </p>
        )}

      </div>
    </div>
  );
}

export default CreateProduct;