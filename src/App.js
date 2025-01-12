import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
import { AppProvider } from "./createContext";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./utils/authGuard";

const App = () => {

  return (
    <AppProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={
            <AuthGuard>
               <Dashboard/>
             </AuthGuard>
            } />
        </Routes>
      </Layout>
    </Router>
    </AppProvider>
  );
};

export default App;
