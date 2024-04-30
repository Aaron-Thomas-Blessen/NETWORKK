import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { IsSignedUpProvider } from "./Context/Context";

const App = () => {
  return (
    <BrowserRouter>
      <IsSignedUpProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Service" element={<Service />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </IsSignedUpProvider>
    </BrowserRouter>
  );
};

export default App;
