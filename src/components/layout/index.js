import { useContext , useEffect, useRef} from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { AppContext } from "../../createContext";
import LoginFormModal from "../forms/loginModal";
import SignupFormModal from "../forms/signupModal";
import axiosInstance from "../../utils/axios";

const Layout = ({ children }) => {
    const { state ,setState,  loginView , setLoginView , signupView , setSignupView} = useContext(AppContext);
    const apiCalled = useRef(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
         const response =  await axiosInstance.get('checkAuthentication');
         if(response.data.success){
          const userData = response.data.user ;
          setState((prevState) => ({
            ...prevState,
            isAuthenticated : true,
            user : userData
          }));
         }
        } catch (err) {
          try {
          const response =   await axiosInstance.get('refreshToken');
          if(response.data.success){
            const userData = response.data.user ;
            setState((prevState) => ({
              ...prevState,
              isAuthenticated : true,
              user : userData
            }));
           } 
          } catch (refreshErr) {
            console.log("Please Login Again",refreshErr);
          }
        }
      };
  
      if(!apiCalled.current){
        apiCalled.current = true ;
        checkAuth();
      }
    }, []);
  
  return (
    <>
      <LoginFormModal isFormVisible={loginView} setIsFormVisible={setLoginView}/>
      <SignupFormModal isFormVisible={signupView} setIsFormVisible={setSignupView}/>
      <div className={state.theme}>
        <Navbar />
        <main className="pt-[20px] pb-[20px] dark:bg-gray-800">
          <div className="max-w-screen-2xl mx-auto p-4">{children}</div>
        </main>
        <Footer />
      </div>

    </>
  );
};

export default Layout;
