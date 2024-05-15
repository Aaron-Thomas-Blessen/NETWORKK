import { SlMagnifier, SlStar } from "react-icons/sl";


const HingeSign = ({rating, name, review}) => (
    <div className="bg-white border p-2 w-64 rounded-xl shadow-md">
        <img className="w-full h-40"></img>
        
        <div className="flex bg-slate-100 mt-5 w-12 h-auto p-1 align-middle">
            <p className="text-base">{rating}</p>
            <SlStar className="m-1 fill-amber-400"/>
        </div>
        <div className="p-1">
        <p className="text-gray-700 mb-4">I can fix anything</p>
        <p className="  text-gray-900">From Rs. 200</p>
        </div>
    </div>
  );


const GigsSearch = () => {
  return (
    <>
        <div className="flex justify-between items-center bg-gray-200 p-4">
          <img src="path_to_logo" alt="Logo" className="h-10 mr-2" />
        </div>

        <div className="flex flex-row w-full justify-center mt-16 ">
            <input
                type="text"
                placeholder="What are you looking for..."
                className="border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" />
            <button
                type="button"
                className="bg-slate-700 text-white py-2 px-4 w-12 rounded-r-md ">
                <SlMagnifier />
            </button>

        </div> 
            
        <div className="flex flex-row justify-evenly mt-14">
            <HingeSign rating={4.5}/>
            <HingeSign rating={3.5}/>
            <HingeSign rating={4.2}/>
            <HingeSign rating={4.0}/>
            <HingeSign rating={3.8}/>
        </div>
        <div className="flex flex-row justify-evenly mt-14">
            <HingeSign rating={4.5}/>
            <HingeSign rating={3.5}/>
            <HingeSign rating={4.2}/>
            <HingeSign rating={4.0}/>
            <HingeSign rating={3.8}/>
        </div>
        
    </>
  );
};

export default GigsSearch;
