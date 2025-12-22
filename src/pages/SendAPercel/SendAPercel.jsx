import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendaPercel = () => {
  const servicesCenter = useLoaderData();
  const { user } = useAuth(); // get logged-in user

  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const regionsDuplicate = servicesCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    if (!region) return [];
    return servicesCenter
      .filter((c) => c.region === region)
      .map((c) => c.district);
  };

  const generateTrackingId = () => {
    const date = new Date();

    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");

    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();

    return `PCL-${datePart}-${rand}`;
  };

  const onSubmit = async (data) => {
    const isDocument = data.type === "document";
    const weight = parseFloat(data.weight) || 0;
    const isWithinCity = data.senderDistrict === data.receiverDistrict;

    let price = 0;
    let breakdown = "";

    // ---------------------------------
    // 🔥 PRICE CALCULATION + BREAKDOWN
    // ---------------------------------

    if (isDocument) {
      price = isWithinCity ? 60 : 80;

      breakdown = `
      <div style="text-align:left; line-height:2.9;">
        <p><b>Parcel Type:</b> Document (Paper/Letter Items)</p>
        <p><b>Delivery Zone:</b> ${
          isWithinCity
            ? "Same District (Inside City)"
            : "Different District (Outside City)"
        }</p>
        <p><b>Charge Applied:</b> ৳${price} — ${
        isWithinCity
          ? "Standard inside-city document fee"
          : "Standard outside-city document fee"
      }</p>
      </div>
    `;
    } else {
      if (weight <= 3) {
        price = isWithinCity ? 110 : 150;

        breakdown = `
        <div style="text-align:left; line-height:2.6;">
          <p><b>Parcel Type:</b> Regular Item / Non-Document</p>
          <p><b>Total Weight:</b> ${weight} kg</p>
          <p><b>Delivery Zone:</b> ${
            isWithinCity
              ? "Same District (Inside City)"
              : "Different District (Outside City)"
          }</p>
          <p><b>Base Charge (up to 3kg):</b> ৳${price}</p>
        </div>
      `;
      } else {
        const extraWeight = weight - 3;
        const extraCost = extraWeight * 40;

        price = isWithinCity ? 110 + extraCost : 150 + extraCost + 40;

        breakdown = `
        <div style="text-align:left; line-height:2.6;">
          <p><b>Parcel Type:</b> Regular Item / Non-Document</p>
          <p><b>Total Weight:</b> ${weight} kg</p>
          <p><b>Delivery Zone:</b> ${
            isWithinCity
              ? "Same District (Inside City)"
              : "Different District (Outside City)"
          }</p>
          <p><b>Base Charge (first 3kg):</b> ৳${isWithinCity ? 110 : 150}</p>
          <p><b>Extra Weight Charge:</b> ${extraWeight} kg × 40 = ৳${extraCost}</p>
          ${
            !isWithinCity
              ? `<p><b>Additional Out-of-City Fee:</b> ৳40 — applied for inter-district service</p>`
              : ""
          }
        </div>
      `;
      }
    }

    // ---------------------------------
    // ⭐ GET CURRENT DATE & TIME
    // ---------------------------------
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // ---------------------------------
    // 🔥 SWEET ALERT FOR SUMMARY
    // ---------------------------------

    //save to the server

    Swal.fire({
      title: "Parcel Price Breakdown",
      html: `
      ${breakdown}

      <hr />

      <h3 style="margin-top: 10px; font-size:16px; opacity:0.8;">
        <b>Time:</b> ${formattedTime}
      </h3>

      <h2 style="margin-top:15px; font-size:22px;">
        <span style="
          padding:10px 16px;
          border-radius:10px;
          color:#000;
          display:inline-block;
          font-weight:bold;
        ">
          Total Payable: ৳${price}
        </span>
      </h2>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment 💸",
      cancelButtonText: "Back to Edit 🔙",
      reverseButtons: true,
      position: "center",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelInfo = {
          ...data,
          price,
          createdByEmail: user?.email || "",
          creatorName: user?.displayName || "",
          receiverEmail: data.receiverEmail || "",
          // trackingId: "TRK-" + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
          createdAtUnix: Date.now(),
          status: "pending",
          paymentStatus: "unpaid",
          generateTrackingId: generateTrackingId(),
        };

        axiosSecure.post("/parcels", parcelInfo).then((res) => {
          console.log("after saving data", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/myParcel");
            //!!! TODO add payment method
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created. Please Pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });

        console.log("Proceeding to payment with:", parcelInfo);

      } else {
        Swal.fire(
          "Edit Your Parcel",
          "You can update your information now.",
          "info"
        );
      }
    });
  };
  return (
    <div className="p-10 mt-4 mb-10 rounded-lg bg-white shadow">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#03373D]">
        Add Parcel
      </h1>
      <hr className="mt-6 text-gray-300" />
      <h2 className="text-[#03373D] mt-5 text-2xl xl:text-3xl font-semibold">
        Enter your parcel details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Type */}
        <div className="flex gap-4 mt-6">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="document"
              {...register("type", { required: true })}
              className="radio-green"
            />
            Document
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="non-document"
              {...register("type", { required: true })}
              className="radio-green"
            />
            Non-Document
          </label>
          {errors.type && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Parcel Name & Weight */}
        <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
          <fieldset className="fieldset w-full">
            <label className="label font-bold">Parcel Name</label>
            <input
              type="text"
              className="input w-full outline-none border-gray-200"
              placeholder="Parcel Name"
              {...register("parcelName", { required: true })}
            />
            {errors.parcelName && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label font-bold">Parcel Weight (KG)</label>
            <input
              type="number"
              placeholder="Weight (kg)"
              disabled={type !== "non-document"}
              {...register("weight", { required: type === "non-document" })}
              className="input w-full outline-none border-gray-200"
            />
            {errors.weight && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </fieldset>
        </div>

        <hr className="mt-6 text-gray-300" />

        {/* Sender & Receiver */}
        <div className="sm:grid lg:grid-cols-2 pt-4 gap-6">
          {/* Sender */}
          <div>
            <h1 className="text-xl text-[#03373D] font-semibold sm:text-2xl">
              Sender Details
            </h1>

            <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
              <fieldset className="fieldset w-full">
                <label className="label font-bold">Sender Name</label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="input w-full outline-none border-gray-200"
                  {...register("senderName", { required: true })}
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="label font-bold">Sender Email</label>
                <input
                  type="email"
                  placeholder="Sender Email"
                  className="input w-full outline-none border-gray-200"
                  {...register("senderEmail", { required: true })}
                />
              </fieldset>
            </div>

            <div className="sm:grid grid-cols-2 w-full mt-2 gap-4">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue=""
                  className="select w-full outline-none border-gray-200"
                >
                  <option value="" disabled>
                    Pick a region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue=""
                  className="select w-full outline-none border-gray-200"
                >
                  <option value="" disabled>
                    Pick a district
                  </option>
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <fieldset className="fieldset w-full mt-4">
              <label className="label font-bold">Sender Contact No</label>
              <input
                type="text"
                placeholder="Sender Contact Number"
                className="input w-full outline-none border-gray-200"
                {...register("contact-number", { required: true })}
              />
              {errors["contact-number"] && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </fieldset>

            {/* Pickup Instruction */}
            <fieldset className="fieldset w-full mt-4">
              <label className="label font-bold">Pickup Instruction</label>
              <textarea
                placeholder="Pickup Instruction"
                {...register("senderInstruction")}
                className=" w-full outline-none border p-4 border-gray-200"
                rows={3}
                cols={5}
              ></textarea>
            </fieldset>
          </div>

          {/* Receiver */}
          <div>
            <h1 className="text-xl text-[#03373D] font-semibold sm:text-2xl">
              Receiver Details
            </h1>

            <div className="sm:grid grid-cols-2 w-full mt-4 gap-4">
              <fieldset className="fieldset w-full">
                <label className="label font-bold">Receiver Name</label>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="input w-full outline-none border-gray-200"
                  {...register("receiverName", { required: true })}
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="label font-bold">Receiver Email</label>
                <input
                  type="email"
                  placeholder="Receiver Email"
                  className="input w-full outline-none border-gray-200"
                  {...register("receiverEmail", { required: true })}
                />
              </fieldset>
            </div>

            <div className="sm:grid grid-cols-2 w-full mt-2 gap-4">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue=""
                  className="select w-full outline-none border-gray-200"
                >
                  <option value="" disabled>
                    Pick a region
                  </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue=""
                  className="select w-full outline-none border-gray-200"
                >
                  <option value="" disabled>
                    Pick a district
                  </option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <fieldset className="fieldset w-full mt-4">
              <label className="label font-bold">Receiver Contact No</label>
              <input
                type="text"
                placeholder="Receiver Contact Number"
                className="input w-full outline-none border-gray-200"
                {...register("receiver-number", { required: true })}
              />
              {errors["receiver-number"] && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </fieldset>
            {/* Delivery  Instruction */}
            <fieldset className="fieldset w-full mt-4">
              <label className="label font-bold">Delivery Instruction</label>
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className=" w-full outline-none border p-4 border-gray-200"
                rows={3}
                cols={5}
              ></textarea>
            </fieldset>
          </div>
        </div>

        <p className="py-4 text-[12px] font-semibold">
          * PickUp Time 4pm-7pm Approx.
        </p>

        <button
          type="submit"
          className="px-10 cursor-pointer py-3 text-sm font-semibold rounded bg-[#CAEB66]"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendaPercel;
