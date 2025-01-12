import React, { createContext, useState } from "react";

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

  return (
    <AppContext.Provider value={{ state, setState, loginView , setLoginView , signupView , setSignupView , habits, setHabits, todayHabits, setTodayHabits}}>
      {children}
    </AppContext.Provider>
  );
};
