import useEffect from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup'

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [isAuthenticated, navigate])
  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignUp