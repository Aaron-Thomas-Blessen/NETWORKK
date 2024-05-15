import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Adminlog from "./pages/Admin/Admin";
import Booking from "./pages/User/Booking";
import UserProfilePage from "./pages/User/UserProfilePage";
import SellerProfilePage from "./pages/Seller/SellerProfilePage";
import Gigs from "./pages/Seller/Gigs";
import Gigcreate from "./pages/Seller/Gigcreate";
import Gigssearch from "./pages/User/Gigssearch";
import Usergigsviews from "./pages/User/Usergigsviews";
import ProfileDashboardPage from './pages/Seller/ProfileDashboardPage';
import { Protected } from "./components/Protected";
import { AdminProtected } from "./components/AdminProtected";
import AdminGigs from "./pages/Admin/AdminGigs";
import SearchBar from "./pages/User/Search";
import BookingsPage from "./pages/User/ShowBookings";
import SellerBookingsPage from "./pages/Seller/ShowGigBookings";
import PaymentPage from "./pages/User/Payment";

const App = () => {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/Adminlog" element={<Adminlog />}></Route>
          <Route path="/Admingigs" element={<AdminProtected> <AdminGigs /> </AdminProtected>}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
          <Route path="/showBookings" element={<BookingsPage />}></Route>
          <Route path="/showSellerBookings" element={<SellerBookingsPage />}></Route>
          <Route path="/UserProfilePage" element={<Protected> <UserProfilePage /> </Protected>}></Route>
          <Route path="/search" element={<Protected> <SearchBar /> </Protected>}></Route>
          <Route path="/SellerProfilePage" element={<Protected> <SellerProfilePage /> </Protected>}></Route>
          <Route path="/Gigs" element={<Protected> <Gigs /> </Protected>}></Route>
          <Route path="/Payments" element={<Protected> <PaymentPage /> </Protected>}></Route>
          <Route path="/Gigcreate" element={<Protected> <Gigcreate /> </Protected>}></Route>
          <Route path="/Gigssearch" element={<Protected>  <Gigssearch /> </Protected>}></Route>
          <Route path="/Usergigsviews" element={<Protected> <Usergigsviews /> </Protected>}></Route>
          <Route path="/ProfileDashboard" element={<Protected> <ProfileDashboardPage /> </Protected>}></Route>
        </Routes>
    </BrowserRouter>
        
    

  );
};

export default App;
