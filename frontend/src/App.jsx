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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
