import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protected } from "./components/Protected";
import { AdminProtected } from "./components/AdminProtected";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Searches from "./pages/Searches";

import Booking from "./pages/User/Booking";
import UserProfilePage from "./pages/User/UserProfilePage";
import Usergigsviews from "./pages/User/Usergigsviews";
import SearchBar from "./pages/User/Search";
import BookingsPage from "./pages/User/ShowBookings";
import PaymentPage from "./pages/User/Payment";
import OtherUserProfile from "./pages/User/OtherUserProfile";

import SellerProfilePage from "./pages/Seller/SellerProfilePage";
import Gigcreate from "./pages/Seller/Gigcreate";
import ProfileDashboardPage from './pages/Seller/ProfileDashboardPage';
import SellerBookingsPage from "./pages/Seller/ShowGigBookings";
import History from "./pages/Seller/History";

import AdminLogin from "./pages/Admin/AdminLog";
import AdminGigs from "./pages/Admin/AdminGigs";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminPaymentDetails from "./pages/Admin/AdminPayments";

const App = () => {


  return (
    <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/searches" element={<Searches />}></Route>

          <Route path="/Admin" element={ <AdminLogin /> }></Route>
          <Route path="/Admingigs" element={<AdminProtected> <AdminGigs /> </AdminProtected>}></Route>
          <Route path="/Adminbookings" element={<AdminProtected> <AdminBookings /> </AdminProtected>}></Route>
          <Route path="/Adminpayments" element={<AdminProtected> <AdminPaymentDetails /> </AdminProtected>}></Route>

          <Route path="/Booking" element={<Protected> <Booking /> </Protected>}></Route>
          <Route path="/showBookings" element={<Protected> <BookingsPage /> </Protected>}></Route>
          <Route path="/UserProfilePage" element={<Protected> <UserProfilePage /> </Protected>}></Route>
          <Route path="/UserProfilePage/:userId" element={<Protected> <OtherUserProfile /> </Protected>}></Route>
          <Route path="/Usergigsviews" element={<Protected> <Usergigsviews /> </Protected>}></Route>
          <Route path="/search" element={<Protected> <SearchBar /> </Protected>}></Route>
          <Route path="/Payments" element={<Protected> <PaymentPage /> </Protected>}></Route>

          <Route path="/History" element={<Protected> <History /> </Protected>}></Route>
          <Route path="/showSellerBookings" element={<Protected> <SellerBookingsPage /> </Protected>}></Route>
          <Route path="/SellerProfilePage" element={<Protected> <SellerProfilePage /> </Protected>}></Route>
          <Route path="/Gigcreate" element={<Protected> <Gigcreate /> </Protected>}></Route>
          <Route path="/ProfileDashboard" element={<Protected> <ProfileDashboardPage /> </Protected>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
