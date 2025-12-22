import { FaRocket, FaGlobeAsia, FaBoxes, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";

export default function OurServices() {
  const services = [
    {
      icon: <FaRocket size={40} />, 
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: <FaGlobeAsia size={40} />, 
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FaBoxes size={40} />, 
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: <FaMoneyBillWave size={40} />, 
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: <FaBuilding size={40} />, 
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: <FaUndo size={40} />, 
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section className="w-full py-20 mb-10 rounded-2xl" style={{ backgroundColor: "#03373D" }}>
      <div className="max-w-6xl mx-auto px-4 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="max-w-3xl mx-auto text-lg opacity-90 mb-12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md transition duration-300 bg-white text-gray-900 hover:bg-[#CAEB66]  "
            >
              <div className="mb-4 text-[#03373D] flex justify-center items-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm opacity-80">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}