import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import { toast } from "react-toastify";
import logoup from '../images/logo_up.png';
import sideImg from '../images/side_img1.jpg';
import { FaGoogle } from 'react-icons/fa';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`/user/create-user`, { name, email, password, avatar })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
        <div className="flex flex-col md:flex-row h-screen w-screen">
            <div className="hidden md:block w-[400px] h-screen">
                <img src={sideImg} alt="side_img" className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:flex-1 p-4 flex flex-col justify-center items-start md:pl-12 mt-4 md:mt-0">
                <img src={logoup} alt="logo_brand" className="mb-4" />
                <h1 className="text-3xl font-semibold mb-6 font-sans">Create your account</h1>
                <p className="font-bold text-lg mb-4">
                    Have an account?{' '}
                    <Link to="/login">
                        <span className="text-blue-600 font-semibold text-xl cursor-pointer">
                            Log in now
                        </span>
                    </Link>
                </p>

                <form className="flex flex-col gap-3 w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter username"
                            id="username"
                            className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <AiOutlineUser
                            className="absolute top-3 right-3 text-gray-600"
                            size={22}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <AiOutlineMail
                            className="absolute top-3 right-3 text-gray-600"
                            size={22}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={visible ? 'text' : 'password'}
                            placeholder="Enter password"
                            required
                            autoComplete="current-password"
                            className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {visible ? (
                            <AiOutlineEye
                                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                                size={24}
                                onClick={() => setVisible(false)}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                                size={24}
                                onClick={() => setVisible(true)}
                            />
                        )}
                    </div>

                    <button className="bg-green-600 text-lg cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Sign Up
                    </button>

                    <div className="flex items-center justify-center my-3">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-2 text-sm text-gray-500">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <button className="bg-green-600 text-lg cursor-pointer text-white flex items-center justify-center gap-2 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Continue with Google <FaGoogle className='text-xl' />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
