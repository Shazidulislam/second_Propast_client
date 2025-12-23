import React from "react";
import { useForm } from "react-hook-form";

const PricingCalculation = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit =(data)=>{
    console.log(data)
  }

  return (
    <div className="p-10 mt-4 mb-10 shadow-xs bg-white rounded-2xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#03373D]">
        Pricing Calculator
      </h1>
      <p className="text-sm md:w-1/2 text-[#606060] font-medium pt-3">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <hr className="mt-6 text-gray-300" />
      {/* pricing form state is here */}
      <div className="flex flex-col-reverse md:flex-row pt-10">
        {/* from */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
          <fieldset className="fieldset w-full">
            <label className="label font-bold">Parcel type</label>
            <input
              type="text"
              className="input w-full outline-none shadow-sm border-gray-200"
              placeholder="Select Parcel type"
              {...register("parcelType", { required: true })}
            />
            {errors["parcelType"] && (
              <span className="text-red-500 text-sm">Name is Required</span>
            )}
          </fieldset>
          <fieldset className="fieldset w-full">
            <label className="label font-bold">Delivery Destination</label>
            <input
              type="text"
              className="input w-full outline-none shadow-sm border-gray-200"
              placeholder="Select Delivery Destination"
              {...register("deliveryDestination", { required: true })}
            />
            {errors["deliveryDestination"] && (
              <span className="text-red-500 text-sm">Name is Required</span>
            )}
          </fieldset>
          <fieldset className="fieldset w-full">
            <label className="label font-bold">Weight (KG)</label>
            <input
              type="text"
              className="input w-full outline-none shadow-sm border-gray-200"
              placeholder="Select Delivery Destination"
              {...register("weight", { required: true })}
            />
            {errors["weight"] && (
              <span className="text-red-500 text-sm">Name is Required</span>
            )}
          </fieldset>
          <div className="grid grid-cols-4 gap-3" >
            <button type="button" className="col-span-1 btn">Reset</button>
            <button type="submit" className="col-span-3 btn bg-[#CAEB66]">Calculate</button>
          </div>
        </form>
        {/* left side content */}
        <div className="flex justify-center items-center text-[#03373D] text-7xl flex-1  font-semibold lg:text-9xl">
        <p>  50 Tk</p>
        </div>
      </div>
      {/* pricing form state is end */}
    </div>
  );
};

export default PricingCalculation;
