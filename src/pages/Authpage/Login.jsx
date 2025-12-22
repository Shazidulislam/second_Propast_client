import React from "react";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../Components/Sheard/Auth/SocialLogin";
import useAuth from "../../hooks/useAuth";


const Login = () => {

    const {register ,handleSubmit  , formState:{errors}} = useForm()
    const {signInUser} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const form = location?.state?.from || "/"

    const onSubmit =async(data)=>{
        const result = await signInUser(data?.email , data?.password)
        if(result.user){
           alert("Login successfully!")
           navigate(form)
        }
        console.log(data)
    }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-medium">Login Now</h1>
        <form onSubmit={handleSubmit(onSubmit)} >
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" {...register("email" , {required:true})} className="input" placeholder="Email" />
            {
                errors.email?.type === "required" && <p className="text-red-500">Email is Required!</p>
            }
            <label className="label">Password</label>
            <input type="password" {...register("password" , {required:true , minLength:8 ,})} className="input" placeholder="Password" />
           {
            errors.password?.type === "required" && <p className="text-red-600">Password is required!</p>
           }
           {
            errors.password?.type === "minLength" && <p className="text-red-600">Password  must be 8 charaters longer!</p>
           }
            <button className="btn bg-[#CAEB66] mt-4">Login</button>
          </fieldset>
          <p className="font-medium"><small>Don't have an account? <Link to={"/register"} className="hover:text-[#CAEB66]">Register</Link> </small></p>
        </form>
        <SocialLogin method={"Login"}/>
      </div>
    </div>
  );
};

export default Login;
