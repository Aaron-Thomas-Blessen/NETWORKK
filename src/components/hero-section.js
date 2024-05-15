import Navbar from "./nav";



const HeroSection = () => {
  return (
    <>
    <Navbar />
    <div className="overflow-hidden">
      <div className=" w-screen overflow-hidden ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Fhero-section.jpg?alt=media&token=673281fe-b61b-4f7b-909b-a59978974130"
          alt="Placeholder"
          className="w-full h-screen overflow-hidden"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white text-center">Welcome to Your App</h1>
        </div>
      </div>

      {/* Nav */}
      

      {/* Inputs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-8 rounded-md shadow-md">
        
      </div>
    </div>
    </>
  );
};

export default HeroSection;

