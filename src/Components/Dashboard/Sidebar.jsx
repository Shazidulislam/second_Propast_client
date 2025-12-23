import React, { useState } from "react";
import { Link } from "react-router";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import ProFastButton from "../Sheard/Button/PropastButton";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const {logout} = useAuth()
  console.log(isActive);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
 
  return (
    <div>
      {/* small screen navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to={"/"}>
              <ProFastButton />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="w-5 h-5 " />
        </button>
      </div>

      {/* sidebar */}

      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out `}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow rounded-lg justify-center items-center mx-auto ">
            <Link to={"/"}>
              <ProFastButton />
            </Link>
          </div>
          <div className=" pt-2">
          <nav className="flex flex-col gap-2 ">
             <Link  className="pl-4 py-3 bg-white"  to={"/dashboard/myParcel"}>My Parcel</Link>  
             <Link  className="pl-4 py-3 bg-white"  to={"/dashboard/myParcel"}>My Parcel</Link>  
             <Link  className="pl-4 py-3 bg-white"  to={"/dashboard/myParcel"}>My Parcel</Link>  
             <Link  className="pl-4 py-3 bg-white"  to={"/dashboard/myParcel"}>My Parcel</Link>  
             <Link  className="pl-4 py-3 bg-white"  to={"/dashboard/myParcel"}>My Parcel</Link>  
          </nav>
        </div>
        </div>
        {/* nav Items */}
        
        {/* nav Items end here */}
        <hr />
          <button
            onClick={logout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
