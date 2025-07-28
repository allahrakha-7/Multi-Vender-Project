import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/reducers/userSlice.js";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const data = ('/api/auth/google', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            });
            
            dispatch(signInSuccess(data));
            
            navigate("/sign-up");
        } catch (error) {
            console.error("Could not login with Google. Google Authentication Error:", error);
        }
    };
    return (
        <>
            <button onClick={handleGoogleClick} type="button" className="bg-green-600 text-lg cursor-pointer text-white flex items-center justify-center gap-2 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Continue with Google <FaGoogle className='text-xl' />
                    </button>
        </>
    );
}

export default OAuth;