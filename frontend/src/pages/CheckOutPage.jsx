import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/CheckOutSteps";
import Checkout from "../components/CheckOut";
import Footer from '../components/Layout/Footer';

const CheckOutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckOutPage