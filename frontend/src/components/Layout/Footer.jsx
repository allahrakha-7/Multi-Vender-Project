import {
 AiFillFacebook,
 AiFillInstagram,
 AiFillYoutube,
 AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

function Footer() {
 const footercompanyLinks = [
   {
     name: "Game & Video",
     link: "/games"
   },
   {
     name: "Phone & Tablets",
     link: "/phones"
   },
   {
     name: "Computers & Laptop",
     link: "/computers"
   },
   {
     name: "Sport Watches",
     link: "/watches"
   },
   {
     name: "Events",
     link: "/events"
   },
 ];

 const footerSupportLinks = [
   {
     name: "FAQs",
     link: "/faq"
   },
   {
     name: "Reviews",
     link: "/reviews"
   },
   {
     name: "Contact Us",
     link: "/contact"
   },
   {
     name: "Shipping",
     link: "/shipping"
   },
   {
     name: "Live chat",
     link: "/chat"
   },
 ];

 const footerProductLinks = [
   {
     name: "About us",
     link: "/about"
   },
   {
     name: "Careers",
     link: "/careers"
   },
   {
     name: "Store Locations",
     link: "/stores"
   },
   {
     name: "Our Blog",
     link: "/blog"
   },
   {
     name: "Reviews",
     link: "/reviews"
   },
 ];

 return (
   <div className="bg-white text-gray-800 border-t-4 border-green-600">
     <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gradient-to-r from-green-600 to-green-700 py-12">
       <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-bold md:w-2/5 text-white">
         <span className="text-yellow-300">Stay Connected</span> with Vendify{" "}
         <br />
         <span className="text-lg font-normal">Get exclusive deals, new arrivals & special offers!</span>
       </h1>
       <div className="flex flex-col sm:flex-row gap-3">
         <input
           type="email"
           required
           placeholder="Enter your email address..."
           className=" sm:w-80 border text-white border-white w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-white shadow-lg"
         />
         <button className="bg-white text-green-700 font-semibold hover:bg-gray-100 duration-300 px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all">
           Subscribe Now
         </button>
       </div>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-8 px-5 py-16">
       
       <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center sm:items-start">
         <div className="flex items-center mb-4">
           <MdOutlineShoppingCart className="text-[42px] text-gray-700 font-extralight" />
           <div className="flex flex-col ml-2">
             <span className="text-green-600 text-[32px] font-bold font-[Georgia]">
               Vendify
             </span>
             <p className="text-[10px] text-gray-800 ml-2 uppercase italic">
               shop from home
             </p>
           </div>
         </div>
         <p className="text-gray-600 mb-6 text-md leading-relaxed max-w-xs">
           Your ultimate shopping destination. Bringing quality products, unbeatable prices, and exceptional service right to your doorstep.
         </p>
         <div className="flex items-center gap-4">
           <AiFillFacebook 
             size={28} 
             className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform" 
           />
           <AiOutlineTwitter
             size={28}
             className="cursor-pointer text-gray-600 hover:text-black transition-colors duration-300 hover:scale-110 transform"
           />
           <AiFillInstagram
             size={28}
             className="cursor-pointer text-gray-600 hover:text-[#f77737] transition-colors duration-300 hover:scale-110 transform"
           />
           <AiFillYoutube
             size={28}
             className="cursor-pointer text-gray-600 hover:text-red-700 transition-colors duration-300 hover:scale-110 transform"
           />
         </div>
       </ul>

       <ul className="text-center sm:text-start">
         <h1 className="mb-6 font-bold text-xl text-green-600 border-b-2 border-yellow-500 pb-2">Company</h1>
         {footerProductLinks.map((link, index) => (
           <li key={index} className="mb-3">
             <Link
               className="text-gray-600 hover:text-green-600 duration-300 text-md cursor-pointer leading-6 hover:font-medium transition-all"
               to={link.link}
             >
               {link.name}
             </Link>
           </li>
         ))}
       </ul>

       <ul className="text-center sm:text-start">
         <h1 className="mb-6 font-bold text-xl text-green-600 border-b-2 border-yellow-500 pb-2">Shop</h1>
         {footercompanyLinks.map((link, index) => (
           <li key={index} className="mb-3">
             <Link
               className="text-gray-600 hover:text-green-600 duration-300 text-md cursor-pointer leading-6 hover:font-medium transition-all"
               to={link.link}
             >
               {link.name}
             </Link>
           </li>
         ))}
       </ul>

       <ul className="text-center sm:text-start">
         <h1 className="mb-6 font-bold text-xl text-green-600 border-b-2 border-yellow-500 pb-2">Support</h1>
         {footerSupportLinks.map((link, index) => (
           <li key={index} className="mb-3">
             <Link
               className="text-gray-600 hover:text-green-600 duration-300 text-md cursor-pointer leading-6 hover:font-medium transition-all"
               to={link.link}
             >
               {link.name}
             </Link>
           </li>
         ))}
       </ul>
     </div>

     <div className="bg-green-50 border-t border-green-200">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center pt-6 text-gray-600 text-sm pb-6 px-8">
         <span className="font-medium">© 2025 Vendify. All rights are reserved.</span>
         <div className="flex justify-center gap-4">
           <Link to="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
           <span>·</span>
           <Link to="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
         </div>
          <div className="sm:block flex items-center justify-evenly w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
         </div>
       </div>
     </div>
 );
}

export default Footer;