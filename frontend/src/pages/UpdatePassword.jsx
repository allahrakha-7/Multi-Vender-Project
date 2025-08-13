import { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/reducers/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function UpdatePassword() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: currentUser?.fullname,
    email: currentUser?.email,
    password: "", 
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullname: currentUser.fullname || "",
        email: currentUser.email || "",
        password: "", 
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname: formData.fullname, email: formData.email, password: formData.password }), 
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message || "Update failed"));
        toast.error(data.message || "Something went wrong. User not updated!");
        return;
    }
    
    dispatch(updateUserSuccess(data));
    toast.success("User updated successfully!");
} catch (error) {
    dispatch(updateUserFailure(error.message));
    toast.error("Something went wrong. User not updated!");
    console.error("Update error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Update Your Account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="fullname" className="text-gray-700 font-semibold">
              Enter username:
            </label>
            <input
              type="text"
              placeholder="Enter username"
              id="fullname"
              value={formData.fullname}
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
              onChange={handleChange}
         
            />
            <AiOutlineUser
              className="absolute top-9 right-3 text-gray-600"
              size={22}
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Enter email address:
            </label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              value={formData.email}
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
              onChange={handleChange}
            
            />
            <AiOutlineMail
              className="absolute top-9 right-3 text-gray-600"
              size={22}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Enter new password:
            </label>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter new password"
              required
              autoComplete="new-password"
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute top-9 right-3 text-gray-600 cursor-pointer"
                size={24}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute top-9 right-3 text-gray-600 cursor-pointer"
                size={24}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-lg cursor-pointer text-white p-3 text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "UPDATING..." : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;