import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UpdatePassword from './pages/UpdatePassword';
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './pages/Profile';
import SellerHomePage from './pages/SellerHomePage'
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Routes/Cart';
import ProductsPage from './pages/Products';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import StoreLocations from './pages/Stores';
import Blog from './pages/Blogs';
import Reviews from './pages/Reviews';
import GamesAndVideos from './pages/GamesAndVideos';
import PhoneAndTablets from './pages/PhonesAndTablets';
import FAQs from './pages/Faqs';
import ReviewsSupport from './pages/ReviewsSupport';
import Shipping from './pages/Shipping';
import ContactUs from './pages/ContactUs';
import LiveChat from './pages/LiveChat';
import ComputersAndLaptops from './pages/ComputersAndLaptops';
import SportsAndWatches from './pages/SportsWatches'
import EventsPage from './pages/Events';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        draggable
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/update-password' element={<UpdatePassword />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/seller-dashboard' element={<SellerHomePage/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ProductsPage/>} />

        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/stores" element={<StoreLocations/>} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/reviews" element={<Reviews/>} />

        <Route path="/gamesandvideos" element={<GamesAndVideos/>} />
        <Route path="/phonesandtablets" element={<PhoneAndTablets/>} />
        <Route path="/watches" element={<SportsAndWatches/>} />
        <Route path="/events" element={<EventsPage/>} />

        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/reviews-support" element={<ReviewsSupport/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/chat" element={<LiveChat/>} />
        <Route path="/computersandlaptops" element={<ComputersAndLaptops/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
