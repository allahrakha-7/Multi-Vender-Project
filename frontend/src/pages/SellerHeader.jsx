import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

function SellerHeader() {
    const { currentUser } = useSelector((state) => state.user);
    const [profileOptions, setProfileOptions] = useState(false);
    const profileRef = useRef();

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOptions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm px-2 sm:px-4 py-2 sm:py-3 bg-slate-50 shadow-md">
                <div className="flex justify-between items-center gap-2 sm:gap-4 md:gap-8 flex-1 min-w-0 max-w-7xl mx-auto">
                    <Link to="/seller-dashboard" className="shrink-0">
                        <div className="font-bold flex items-center">
                            <MdOutlineShoppingCart className="text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] text-gray-700 font-extralight" />
                            <div className="flex flex-col ml-1">
                                <span className="text-green-600 text-[16px] xs:text-[20px] sm:text-[24px] md:text-[28px] font-semibold font-[Georgia] leading-tight">
                                    Vendify
                                </span>
                                <p className="text-[6px] xs:text-[8px] sm:text-[10px] text-gray-800 ml-1 sm:ml-2 uppercase italic">
                                    shop from home
                                </p>
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center">
                        <Link to="/seller-dashboard" className="text-gray-700 text-lg lg:text-xl xl:text-2xl font-semibold relative">
                            Seller Dashboard
                            <span className="absolute -top-1 -right-23 lg:-right-30 shadow-white shadow-sm text-xs lg:text-sm px-1 lg:px-3 py-1 lg:py-1.5 rounded-full text-red-500 font-medium bg-white border border-red-200">
                                Seller Account
                            </span>
                        </Link>
                    </nav>

                    <div className="flex-1 md:hidden text-center">
                        <h1 className="text-gray-700 text-sm xs:text-base sm:text-lg font-semibold">
                            Seller Dashboard
                        </h1>
                        <span className="text-[10px] xs:text-xs text-red-500 font-medium">
                            Seller Account
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3 relative" ref={profileRef}>
                        <div className="relative cursor-pointer">
                            <img
                                src={currentUser.avatar}
                                alt="profile"
                                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-300 hover:border-gray-400 transition-colors"
                                onClick={() => setProfileOptions((prev) => !prev)}
                            />
                            {profileOptions && (
                                <div className="absolute right-0 mt-2 w-32 xs:w-36 sm:w-40 font-semibold bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <Link 
                                        to='/' 
                                        className="block px-3 sm:px-4 py-2 sm:py-3 text-center text-xs xs:text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        onClick={() => setProfileOptions(false)}
                                    >
                                        Switch to User
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default SellerHeader;