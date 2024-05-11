import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import UserProfilePage from "./pages/UserProfilePage";
import SellerProfilePage from "./pages/SellerProfilePage";
import Gigcreate from "./pages/Gigcreate";
import Gigssearch from "./pages/Gigssearch";
import Usergigsviews from "./pages/Usergigsviews";
import ProfileDashboardPage from './pages/ProfileDashboardPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/UserProfilePage" element={<UserProfilePage />}></Route>
          <Route path="/SellerProfilePage" element={<SellerProfilePage />}></Route>
          <Route path="/Gigcreate" element={<Gigcreate />}></Route>
          <Route path="/Gigssearch" element={<Gigssearch />}></Route>
          <Route path="/Usergigsviews" element={<Usergigsviews />}></Route>
          <Route path="/ProfileDashboard" element={<ProfileDashboardPage />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
