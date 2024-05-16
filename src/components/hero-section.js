
const HeroSection = () => {
  return (
    <>
    
    <div className="overflow-hidden">
      <div className=" w-screen overflow-hidden ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Fpexels-ono-kosuki-5974053.jpg?alt=media&token=61bd4e41-6f9b-4765-9ff3-16d7154478fc"
          alt="Placeholder"
          className="w-full h-screen overflow-hidden"
        />
        <div className="absolute top-0 left-0 w-1/2 h-screen flex flex-col justify-center lg:ml-16 items-start">
          <h1 className="text-4xl font-bold text-blue-gray-900 text-left">Find the right skilled service at <span><img src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-text1__1_-removebg-preview.png?alt=media&token=ff8304f7-1b98-4d3d-92dc-af6d60f928dc" className="w-1/2"/></span></h1>
          <div className="w-full flex flex-row " >
        <input
          type="text"
          placeholder="What services are you looking for ?"
          className="w-8/12 h-16 mt-7 relative px-4 py-4 mb-4 border rounded-l-md"
        />
        <button class=" w-2/12 h-16  mt-7 align-middle relative bg-gray-900 text-white rounded-r-md border border-blue-gray-300">
              Search
            </button>
        </div>
        </div>
        
      </div>

    </div>
    </>
  );
};

export default HeroSection;

