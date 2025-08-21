import { useNavigate } from "react-router-dom";

function SellerOrderDetails() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/seller-dashboard');
  };

  return (
    <>
      <div className="m-2 mt-8">
        <h2 className="text-[27px] mt-2 md:text-[32px] font-[700] font-Roboto relative">
          All Orders
          <span className="absolute -bottom-2 left-0 h-[2px] w-10 rounded-full bg-green-500/80" />
        </h2>
        <div>
          <h3 className="text-center mt-4 text-xl sm:text-lg sm:text-center font-Roboto">No orders yet by customers for you, to ship!</h3>
        </div>
        <div className="text-center text-xl sm:text-lg sm:text-center font-Roboto mt-2">
          <button onClick={goBack} className="bg-green-500 border px-6 py-2 rounded-md text-white text-lg">Go Back</button>
        </div>
      </div>
    </>
  )
}

export default SellerOrderDetails;