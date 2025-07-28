import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function UpdatePassword() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-8 border border-gray-300 rounded-xl">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Update Your Account
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative">
                    <label htmlFor="username" className="text-gray-700 font-semibold">Enter username:</label>
                                            <input
                                                type="text"
                                                placeholder="Enter username"
                                                id="username"
                                                className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                                                onChange={handleChange}
                                            />
                                            <AiOutlineUser
                                                className="absolute top-9 right-3 text-gray-600"
                                                size={22}
                                            />
                                        </div>
                    <div className="relative">
                    <label htmlFor="email" className="text-gray-700 font-semibold">Enter email address:</label>
                                            <input
                                                type="email"
                                                placeholder="Enter email"
                                                id="email"
                                                className="border p-3 pr-10 rounded-lg border-gray-400 focus:outline-sky-600 w-full"
                                                onChange={handleChange}
                                            />
                                            <AiOutlineMail
                                                className="absolute top-9 right-3 text-gray-600"
                                                size={22}
                                            />
                                        </div>
                    <div className="relative">
                    <label htmlFor="password" className="text-gray-700 font-semibold">Enter password:</label>
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
                    <Link to='/sign-in' className="bg-green-600 text-lg cursor-pointer text-white p-3 text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Update
                    </Link>
                </form>
            </div>
        </div>
        </>
    );
}

export default UpdatePassword;
