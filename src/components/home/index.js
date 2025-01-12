import { useContext } from "react";
import { AppContext } from "../../createContext";

const Home = () => {
    const {setSignupView , state} = useContext(AppContext);
  
    return (
      <div className="w-full flex flex-col-reverse md:flex-row justify-between py-10 px-4 dark:bg-gray-800 dark:text-gray-200">
        <div className="md:w-1/2 sm:w-full md:text-left  md:mb-0 mt-4 md:mt-5 flex flex-col items-center justify-between mb-3 md:items-start">
          <div>
            <div className="text-6xl md:text-8xl font-medium text-pink-700 dark:text-pink-500 pacifico-regular">
              Habit Tracker
            </div>
            <div className="text-pink-900 dark:text-gray-300 text-2xl mt-2 md:mt-5 font-medium">
              Build better habits, track your progress, and achieve your goals with ease.
            </div>
          </div>
          
          <div>
            {
               !state?.isAuthenticated && <button className="text-white px-3 py-2 bg-pink-700 dark:bg-pink-600 rounded hover:scale-110"
               onClick={() => setSignupView(true)}
           >
             Get Started
           </button> 
        }

          </div>
        </div>
  
        <div className="md:w-1/2 sm:w-full flex justify-center">
          <img
            src="/images/habit-tracker.jpg"
            alt="Habit Tracker"
            className="rounded-md w-[95%] sm:w-[90%] md:w-[95%] lg:w-[80%] shadow-lg dark:shadow-gray-800"
          />
        </div>
      </div>
    );
  };
  
  export default Home;
  