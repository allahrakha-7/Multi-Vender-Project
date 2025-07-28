import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logoup from '../images/logo_up.png';
import sideImg from '../images/side_img2.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true); 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


    return (
        <div className="flex flex-col md:flex-row h-screen w-screen">
            <div className="w-full md:w-[768px] p-4 flex flex-col justify-center items-start md:ml-4 mt-6 md:mt-0">
                <img src={logoup} alt="logo_brand" className="mb-6" />
                <h1 className="text-3xl font-semibold mb-4 font-sans">Login to your account</h1>
                <p className="font-bold text-lg mb-6">
                    Don't have an account?{' '}
                    <Link to={"/sign-up"}><span className="text-blue-600 font-semibold text-xl cursor-pointer">Sign up</span></Link>
                </p>
                <form className="flex flex-col gap-4 w-full relative" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                            value={email} onChange={(e) => setEmail(e.target.value)}
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

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input type="checkbox" name='remember-me' id='remember-me' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                            <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>Remember me</label>
                        </div>
                        <div className='text-sm'>
                            <a href="/update-password" className='text-blue-600 hover:text-blue-500 font-semibold'>Forget your password?</a>
                        </div>
                    </div>
                    
                    <Link to='sign-in' className="bg-green-600 text-white p-3 text-lg rounded-lg uppercase cursor-pointer hover:opacity-95 disabled:opacity-80">
                        Sign In
                    </Link>
                </form>
            </div>

            <div className="hidden md:block w-full h-screen">
                <img src={sideImg} alt="side_img" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default SignIn;
