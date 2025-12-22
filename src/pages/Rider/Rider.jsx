import React from "react";
import { useForm } from "react-hook-form";

import agentImg from "../../assets/potho/agent-pending.png";

const BeRider = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-4 mb-10 shadow p-6 sm:p-8 md:p-12 bg-white rounded-2xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#03373D]">
        Be A Rider
      </h1>
      <p className="text-sm md:w-1/2 text-[#606060] font-medium pt-3">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <hr className="mt-6 text-gray-300" />
      {/* rider from is start here */}
      <div className="grid md:grid-cols-2 gap-4 pt-12">
        {/* from */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* part -1 */}
          <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
            <fieldset className="fieldset w-full">
              <label className="label font-bold">Your Name</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Your Name"
                {...register("riderName", { required: true })}
              />
              {errors["riderName"] && (
                <span className="text-red-500 text-sm">Name is Required</span>
              )}
            </fieldset>
            <fieldset className="fieldset w-full">
              <label className="label font-bold">Your Age</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Your Age"
                {...register("riderAge", { required: true })}
              />
              {errors["riderAge"] && (
                <span className="text-red-500 text-sm">Age is Required</span>
              )}
            </fieldset>
          </div>
          {/* part-2 */}
          <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
            <fieldset className="fieldset w-full">
              <label className="label font-bold">Your Email</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Your Email"
                {...register("riderEmail", { required: true })}
              />
              {errors["riderEmail"] && (
                <span className="text-red-500 text-sm">Email is Required</span>
              )}
            </fieldset>
            <fieldset className="fieldset w-full">
              <label className="label font-bold">Your Region</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Select your region"
                {...register("riderRegion", { required: true })}
              />
              {errors["riderRegion"] && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </fieldset>
          </div>
          {/* part-3 */}
          <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
            <fieldset className="fieldset w-full">
              <label className="label font-bold">NID Number</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Your NID Number"
                {...register("riderNID", { required: true })}
              />
              {errors["riderNID"] && (
                <span className="text-red-500 text-sm">Email is Required</span>
              )}
            </fieldset>
            <fieldset className="fieldset w-full">
              <label className="label font-bold">Your Region</label>
              <input
                type="text"
                className="input w-full outline-none shadow-sm border-gray-200"
                placeholder="Contact"
                {...register("riderContact", { required: true })}
              />
              {errors["riderContact"] && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </fieldset>
          </div>

          <fieldset className="fieldset w-full mt-3">
            <label className="label font-bold">
              Which wire-house you want to work?
            </label>
            <input
              type="text"
              className="input w-full outline-none shadow-sm border-gray-200"
              placeholder="Select wire-house"
              {...register("riderWireHouse", { required: true })}
            />
            {errors["riderWireHouse"] && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </fieldset>
          <button type="submit" className="px-10 py-3 rounded shadow-sm w-full font-medium mt-6 bg-[#CAEB66]">Submit</button>
        </form>

        {/* picture */}
        <div className="flex justify-center items-center">
          <img src={agentImg} alt="agentImg" />
        </div>
      </div>
      {/* rider from is end here */}
    </div>
  );
};

export default BeRider;
