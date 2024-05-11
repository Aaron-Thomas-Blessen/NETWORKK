import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import UserProfilePage from "./pages/UserProfilePage";
import SellerProfilePage from "./pages/SellerProfilePage";
import Gigs from "./pages/Gigs";
import Gigcreate from "./pages/Gigcreate";
import Gigssearch from "./pages/Gigssearch";
import Usergigsviews from "./pages/Usergigsviews";
import ProfileDashboardPage from './pages/ProfileDashboardPage';
import { Protected } from "./components/Protected";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/Admin" element={<Protected> <Admin /> </Protected>}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/UserProfilePage" element={<Protected> <UserProfilePage /> </Protected>}></Route>
          <Route path="/SellerProfilePage" element={<Protected> <SellerProfilePage /> </Protected>}></Route>
          <Route path="/Gigs" element={<Protected> <Gigs /> </Protected>}></Route>
          <Route path="/Gigcreate" element={<Protected> <Gigcreate /> </Protected>}></Route>
          <Route path="/Gigssearch" element={<Protected>  <Gigssearch /> </Protected>}></Route>
          <Route path="/Usergigsviews" element={<Protected> <Usergigsviews /> </Protected>}></Route>
          <Route path="/ProfileDashboard" element={<Protected> <ProfileDashboardPage /> </Protected>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
