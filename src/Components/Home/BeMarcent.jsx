import React from 'react';
import marchent from "../../assets/potho/location-merchant.png"
import beaMerchentBG from "../../assets/potho/be-a-merchant-bg.png"
const BeMarcent = () => {
    return (
        <div  data-aos="zoom-in-up" className='grid grid-cols-3 justify-around items-center gap-4 p-8 sm:p-20 bg-[#03373D] my-10 rounded-2xl relative'>
            {/* !!! right side content */}
             <div className='col-span-3 sm:col-span-2 '>
                <h1 className='text-2xl sm:text-4xl font-bold text-white'>Merchant and Customer Satisfaction is Our First Priority</h1>
                <p className='text-white py-5'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='md:flex gap-4 space-y-4 md:space-y-0'>
                    <button className='bg-[#CAEB66] px-6  py-2 rounded-full cursor-pointer font-medium'>Become A Merchent</button>
                    <button className='border border-[#CAEB66] text-[#CAEB66]  px-6  py-2 rounded-full cursor-pointer font-medium'>Earn with Profast Courier</button>
                </div>
             </div>
             {/*!! left side content */}
             <div className='col-span-3 sm:col-span-1'>
              <img src={marchent} alt="" />
             </div>
             {/* absolite img in top */}
             <div className='absolute top-0 '>
                 <img src={beaMerchentBG} alt="" />
             </div>
        </div>
    );
};

export default BeMarcent;
