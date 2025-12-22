// Coverage.jsx
import { useLoaderData } from "react-router";
import MapSection from "./MapSection";

export default function Coverage() {
  const servicesCenter = useLoaderData();

  return (
    <div className="w-full  gap-6  py-10">
      <h1 className="text-3xl  text-[#03373D] sm:text-5xl font-bold ">
        We are available in <span className="">64 districts</span>
      </h1>

      <MapSection servicesCenter={servicesCenter} />
    </div>
  );
}
