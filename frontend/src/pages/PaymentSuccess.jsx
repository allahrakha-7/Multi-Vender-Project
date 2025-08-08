import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function Success() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };
  return (
    <>
      <IoArrowBack
        onClick={goBack}
        className="text-2xl cursor-pointer absolute top-4 max-sm:top-2 max-sm:left-2 left-4 max-sm:text-xl font-semibold"
      />
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
      </div>
    </>
  );
}

export default Success;