import { SlMagnifier } from "react-icons/sl";
import Navsign from "../../components/navsign";

const GigsSearch = () => {
  const Search = () => {
  return (
    <>

        <div className="flex flex-row w-full justify-center mt-16 ">
        <input
                type="text"
                placeholder="What are you looking for..."
                className="border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"
            />
            <button
                type="button"
                className="bg-black text-white py-2 px-4 w-12 rounded-r-md "
            >
                <SlMagnifier />
            </button>

        </div> 
        
    </>
  );
}
return(
    <div className="Gigsearch">
        <Navsign />
        <Search />
    </div>
);
};

export default GigsSearch;
