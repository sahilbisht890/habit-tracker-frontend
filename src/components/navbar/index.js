import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconMoonFilled, IconBulbFilled } from "@tabler/icons-react";
import { AppContext } from "../../createContext";
import axiosInstance from "../../utils/axios";
const Navbar = () => {
  const { state, setState, setSignupView } = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);

  const toggleTheme = () => {
    setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  const handleLogout =async  () => {
    try {
      const response = await axiosInstance.get('logout');
      if(response.data?.success) {
        setState((prevState) => ({
          ...prevState,
          isAuthenticated : false,
          user : null
        }))
      }
    }catch(error){
        console.log('Error while signing out',error);
    }
  }

  const handleDropdownToggle = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="w-full">
      <nav className="bg-pink-200 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-2xl  flex flex-wrap items-center justify-between mx-auto py-2 px-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/images/logo.webp"
              className="h-16"
              alt="habiit tracker Logo"
            />
            <span className="self-center text-3xl  whitespace-nowrap text-gray-800 dark:text-white pacifico-regular">
              Tracko
            </span>
          </div>
          <div className="flex md:order-2 items-center gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="cursor-pointer" onClick={toggleTheme}>
              {state.theme === "light" ? (
                <IconMoonFilled />
              ) : (
                <IconBulbFilled className="text-white" />
              )}
            </div>
            {state.isAuthenticated ? (
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={handleDropdownToggle}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/icons8.png"
                    alt="user photo"
                  />
                </button>
                {showProfile && (
                  <div
                    className="z-50 profileDropdown my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {state?.user?.username}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                         {state?.user?.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSignupView(true)}
                type="button"
                className="text-white bg-pink-700 hover:scale-110 focus:ring-4 focus:outline-none focus:ring-pink-300  rounded-lg text-sm px-4 py-2 text-center dark:bg-white dark:text-pink-800 dark:focus:ring-pink-100"
              >
                Get started
              </button>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-pink-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-pink-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 md:p-0 text-pink-700 bg-pink-700 rounded md:bg-transparent md:dark:text-pink-400"
                      : "block py-2 px-3 md:p-0 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 md:p-0 text-pink-700 bg-pink-700 rounded md:bg-transparent md:dark:text-pink-400"
                      : "block py-2 px-3 md:p-0 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:dark:hover:text-pink-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 md:p-0 text-pink-700 bg-pink-700 rounded md:bg-transparent md:dark:text-pink-400"
                      : "block py-2 px-3 md:p-0 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-pink-700 md:dark:hover:text-pink-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
