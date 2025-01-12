import React, { createContext, useState } from "react";
import dayjs from 'dayjs'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: "light",
    isAuthenticated: false,
  });

  const [loginView , setLoginView] = useState(false);
  const [signupView , setSignupView] = useState(false);
  const [habits, setHabits] = useState(null);
  const [todayHabits, setTodayHabits] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("DD-MM-YYYY"));


  return (
    <AppContext.Provider value={{ state, setState, loginView , setLoginView , signupView , setSignupView , habits, setHabits, todayHabits, setTodayHabits , selectedDate, setSelectedDate}}>
      {children}
    </AppContext.Provider>
  );
};
