import React from "react";
import Img1 from "../../assets/potho/live-tracking.png";
import Img3 from "../../assets/potho/safe-delivery.png";
import Img2 from "../../assets/potho/tiny-deliveryman.png";

export default function FeatureCards() {
  const features = [
    {
      img: Img1,
      title: "Live Parcel Tracking",
      subtitle:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      img: Img2,
      title: "100% Safe Delivery",
      subtitle:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      img: Img3,
      title: "24/7 Call Center Support",
      subtitle:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="grid grid-cols-12  shadow-lg bg-white px-4 py-8 rounded-md"
          >
            {/* Image Column */}
            <div className="sm:col-span-2 mb-6  text-center sm:text-start sm:mb-0 col-span-12">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-32 h-32 object-contain"
              />

            </div>
              <div className="h-32 hidden sm:block border-l-2 col-span-1 border-dashed border-gray-300 mx-4"></div>
           
            {/* Vertical dotted line for md+ screens */}

            {/* Text Column */}
            <div className="flex-1 sm:col-span-9 col-span-12">
              <h3 className="text-xl text-[#03373D] font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}