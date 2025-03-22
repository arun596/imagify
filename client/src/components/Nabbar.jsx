import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Nabbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 
            sm:py-3 rounded-full hover:scale-105 transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p
                onClick={() => navigate("/buy")}
                className="text-xs sm:text-sm font-medium text-gray-600 cursor-pointer"
              >
                Credits left: {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group">
              {/* Profile Icon with onClick for mobile */}
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt="Profile"
                onClick={toggleDropdown}
              />

              {/* Dropdown (Visible on hover or when clicked) */}
              <div
                className={`absolute ${
                  isOpen ? "block" : "hidden"
                } group-hover:block top-full right-0 z-10 text-black rounded-md w-40 bg-white border shadow-md`}
              >
                <ul className="list-none p-2 text-sm">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2
             sm:px-10 text-sm rounded-full cursor-pointer">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nabbar;
