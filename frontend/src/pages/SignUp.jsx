import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import logoup from "../images/logo_up.png";
import sideImg from "../images/side_img1.jpg";

function SignUp () {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
      navigate("/sign-in");
    } catch (err) {
      setError(err.message);
      toast.error("Signup failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="hidden md:block w-[400px] h-screen">
        <img src={sideImg} alt="Signup visual" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:flex-1 p-4 flex flex-col justify-center items-start md:pl-12 mt-4 md:mt-0">
        <img src={logoup} alt="Vendify logo" className="mb-4" />
        <h1 className="text-3xl font-semibold mb-4">Create your account</h1>

        <p className="font-medium text-base mb-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
            Log in now
          </Link>
        </p>

        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-blue-500 w-full"
              onChange={handleChange}
              required
            />
            <AiOutlineUser className="absolute top-3 right-3 text-gray-600" size={22} />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-blue-500 w-full"
              onChange={handleChange}
              required
            />
            <AiOutlineMail className="absolute top-3 right-3 text-gray-600" size={22} />
          </div>

          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-blue-500 w-full"
              autoComplete="current-password"
            />
            {visible ? (
              <AiOutlineEye
                onClick={() => setVisible(false)}
                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                size={22}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setVisible(true)}
                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                size={22}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white text-lg py-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-70 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <div className="flex items-center justify-center my-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <OAuth />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
