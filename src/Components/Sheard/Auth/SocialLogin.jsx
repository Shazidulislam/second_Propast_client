import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = ({method }) => {
    const {signInWithGoogle} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const form = location?.state?.from || "/"

    const handleGoogleSignIn =async()=>{
       const result = await signInWithGoogle()
       if(result.user){
        alert("Succssfull login")
        navigate(form)
       }
    }
    return (
        <div onClick={handleGoogleSignIn} className='text-center'>
            <p className='text-xl text-gray-400 mb-4'>or</p>
            <div>
                <button className='bg-gray-100 rounded py-2 cursor-pointer flex justify-center items-center gap-2 w-full px-3'>
                    <span> <FcGoogle size={24}/></span>
                    <span className='font-medium'>{method} With Google</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;