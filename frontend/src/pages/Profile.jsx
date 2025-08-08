import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} from '../redux/reducers/userSlice.js';
import { FaPhoneAlt, FaMapMarkedAlt, FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";
import { AiOutlineEyeInvisible } from 'react-icons/ai'

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef();
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        password: currentUser?.password || "",
        phoneNumber: currentUser?.phoneNumber || "",
        role: currentUser.role?.role || "user",
        addressInfo: currentUser?.addressInfo?.[0] || {
            country: "",
            city: "",
            address1: "",
            address2: "",
            zipCode: "",
        },
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) navigate("/sign-in");
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setFileUploadError(true);
                setFilePerc(0);
                return;
            }
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = async (file) => {
        try {
            setFileUploadError(false);
            setFilePerc(0);

            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            data.append('folder', 'multi_vendor_images');

            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    setFilePerc(progress);
                }
            });

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    const res = JSON.parse(xhr.responseText);
                    if (xhr.status === 200 && res.secure_url) {
                        setFormData((prev) => ({ ...prev, avatar: res.secure_url }));
                    } else {
                        console.error("Upload failed:", res);
                        setFileUploadError(true);
                    }
                }
            };

            xhr.send(data);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error('Image Upload failed!');
            setFileUploadError(true);
        }
    }

    const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name in formData.addressInfo) {
        setFormData((prev) => ({
            ...prev,
            addressInfo: {
                ...prev.addressInfo,
                [name]: value
            }
        }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            dispatch(updateUserStart());
            const submitData = {
            ...formData,
            addressInfo: [formData.addressInfo]
        };
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(submitData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                toast.error(data.message);
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            toast.success("Profile updated successfully!");
        } catch (error) {
            dispatch(updateUserFailure(error.message))
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false); 
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                credentials:'include'
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            toast.success('User has been deleted successfully!');
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            toast.error('Something went wrong. Account can not be deleted!');
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
    if (currentUser) {
        setFormData({
            username: currentUser.username || "",
            email: currentUser.email || "",
            password: "", // Keep empty for security
            phoneNumber: currentUser.phoneNumber || "",
            role: currentUser.role?.role || "user",
            addressInfo: currentUser.addressInfo?.[0] || {
                country: "",
                city: "",
                address1: "",
                address2: "",
                zipCode: "",
            },
        });
    }
}, [currentUser]);

    return (
        <>
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-green-50 py-10 px-4">
            <Link to='/' className="flex mx-auto font-medium cursor-pointer" >&nbsp;<IoArrowBackOutline className="text-black font-black text-2xl"/></Link>
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4">
                    <div className="flex flex-col items-center text-center">
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type='file'
                            ref={fileRef}
                            hidden
                            accept='image/*'
                            className="hover:cursor-pointer"
                        />
                        <img
                            src={formData.avatar || currentUser.avatar}
                            alt="profile"
                            onClick={() => fileRef.current.click()}
                            className="w-28 h-28 rounded-full hover:cursor-pointer object-cover border-4 border-white shadow-md"
                        />
                        <p className='text-sm self-center'>
                            {fileUploadError ? (
                                <span className='text-red-700'>
                                    Error uploading image (Must be less than 2MB)
                                </span>
                            ) : filePerc > 0 && filePerc < 100 ? (
                                <span className='text-green-700'>{`Uploading ${filePerc}%`}</span>
                            ) : filePerc === 100 ? (
                                <span className='text-green-700'>Image successfully uploaded!</span>
                            ) : (
                                ''
                            )}
                        </p>
                        <h2 className="mt-4 text-2xl font-bold font-serif text-green-900">{currentUser.username}</h2>
                        <p className="text-sm italic mt-1 text-gray-500">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"><FaUser className="inline mr-2" />Username:</label>
                            <input type="text" name="username" id="username" placeholder="Enter username"   defaultValue={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"><FaEnvelope className="inline mr-2" />Email:</label>
                            <input type="email" name="email" id="email" placeholder="Enter email"   defaultValue={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"><AiOutlineEyeInvisible className="inline mrr-2" /> Password:</label>
                            <input type="password" name="password" id="password" placeholder="Enter password" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"><FaPhoneAlt className="inline mr-2" />Phone Number:</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} placeholder="Enter phone number" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"><FaUserTag className="inline mr-2" />Role:</label>
                            <select
                                name="role" id="role"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                value={formData.role}
                            >
                                <option value="user">User</option>
                                <option value="admin">Seller</option>
                            </select>
                        </div>

                        <h4 className="text-lg font-semibold text-green-900 pt-2"><FaMapMarkedAlt className="inline mr-2" />Address Information</h4>
                        {['country','city','address1', 'address2', 'zipCode'].map((key) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}:</label>
                                <input
                                    type="text"
                                    name={key}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>
                        ))}

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-xl hover:opacity-95 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>

                            <Link to='/sign-up'><button
                                type="button"
                                className="mt-4 bg-red-600 text-white py-2 px-4 max-sm:px-2 max-sm:py-2  rounded-xl hover:opacity-95 cursor-pointer"
                                disabled={loading} onClick={handleDeleteUser}
                            >
                                Delete Accuont
                            </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Profile;
