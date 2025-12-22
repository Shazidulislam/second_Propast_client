import { Link, NavLink, useNavigate } from "react-router";
import ProFastButton from "../Button/PropastButton";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navItems = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/SendaPercel"}>Send A Percel</NavLink>
      </li>
      <li>
        <NavLink to={"/beRider"}>Be A Rider</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
    </>
  );
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await logout();
    if (result) {
      alert("User Logout successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="navbar  shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <ProFastButton></ProFastButton>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      {user ? (
        <div
          onClick={handleLogOut}
          className="navbar-end cursor-pointer  px-6 py-2 rounded font-medium"
        >
          <p>Log Out</p>
        </div>
      ) : (
        <Link
          className="navbar-end cursor-pointer px-6 py-2 rounded font-medium"
          to={"/login"}
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export default Navbar;
