import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import UserGigView from "./pages/user-gigs-views";
import GigsSearch from "./pages/gigs-search";



const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Service" element={<Service />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
        
    

  );
};

export default App;
