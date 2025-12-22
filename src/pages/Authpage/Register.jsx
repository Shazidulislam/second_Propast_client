import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../Components/Sheard/Auth/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const navigate = useNavigate("/");

  const onSubmit = async (data) => {
    console.log(data);

    // create user
    const result = await createUser(data?.email, data?.password);
    if (result?.user) {
      alert("User create successfully")
      console.log(result.user);
      navigate("/");
    }

    console.log(result);
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-medium">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("text", { required: true })}
              className="input"
              placeholder="Name"
            />
            {errors.text?.type === "required" && (
              <p className="text-red-500">Name is required!</p>
            )}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required!</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: " Password  must be 8 charaters longer!",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                  message:
                    "Password must include upper, lower, number & special char",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required!</p>
            )}
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            <button className="py-2 bg-[#CAEB66] btn mt-4 rounded-md">
              Register
            </button>
          </fieldset>
          <p>
            <small className="font-medium">
              Already have an account?{" "}
              <Link to={"/login"} className="hover:text-[#CAEB66]">
                Login
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin method={"Register"} />
      </div>
    </div>
  );
};

export default Register;
