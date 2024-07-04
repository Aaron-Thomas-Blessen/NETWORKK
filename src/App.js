import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProtected } from "./components/UserProtected";
import { ServiceProviderProtected } from "./components/ServiceProviderProtected";
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

          <Route path="/Booking" element={<UserProtected> <Booking /> </UserProtected>}></Route>
          <Route path="/showBookings" element={<UserProtected> <BookingsPage /> </UserProtected>}></Route>
          <Route path="/UserProfilePage" element={<UserProtected> <UserProfilePage /> </UserProtected>}></Route>
          <Route path="/Usergigsviews" element={<UserProtected> <Usergigsviews /> </UserProtected>}></Route>
          <Route path="/search" element={<UserProtected> <SearchBar /> </UserProtected>}></Route>
          <Route path="/Payments" element={<UserProtected> <PaymentPage /> </UserProtected>}></Route>

          <Route path="/History" element={<ServiceProviderProtected> <History /> </ServiceProviderProtected>}></Route>
          <Route path="/showSellerBookings" element={<ServiceProviderProtected> <SellerBookingsPage /> </ServiceProviderProtected>}></Route>
          <Route path="/SellerProfilePage" element={<ServiceProviderProtected> <SellerProfilePage /> </ServiceProviderProtected>}></Route>
          <Route path="/Gigcreate" element={<ServiceProviderProtected> <Gigcreate /> </ServiceProviderProtected>}></Route>
          <Route path="/ProfileDashboard" element={<ServiceProviderProtected> <ProfileDashboardPage /> </ServiceProviderProtected>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
