import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyParcel = () => {
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate()
  const { data: parcels  , refetch} = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(parcels);
  // Actions
  const handleView = (parcel) => {
    alert("Viewing: " + parcel.parcelName);
  };

  const handlePay = (id) => {
    console.log(id)
    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/parcels/${id}`)
          .then((res) => {
            if (res?.data?.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch()
            }
          });
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto w-full p-6">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>

      {/* If no data */}
      {parcels?.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No Parcels Found</h2>
          <p className="text-gray-500">Add a parcel to get started.</p>
        </div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                {/* title */}
                <td className="truncate mxa-w-[1080px]">
                  {parcel?.parcelName}
                </td>
                {/* Type */}
                <td className="capitalize">{parcel.type}</td>

                {/* Created At */}
                <td>
                  {new Date(parcel.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                {/* Price */}
                <td>${parcel.price}</td>

                {/* Payment Status */}
                <td>
                  <span
                    className={`badge ${
                      parcel.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => handleView(parcel)}
                  >
                    View
                  </button>

                  {parcel.paymentStatus === "unpaid" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handlePay(parcel?._id)}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(parcel?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyParcel;
