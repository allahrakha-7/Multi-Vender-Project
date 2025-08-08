import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Cancel() {
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
        <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
        <p>You can try again anytime.</p>
      </div>
    </>
  );
}


export default Cancel;