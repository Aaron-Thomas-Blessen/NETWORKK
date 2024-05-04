import Navsign from "../components/navsign";

const Booking = () => {
  const Book = () => {
    return (
      <div className="flex justify-center items-center mt-8"> {/* Full width */}
        <div className="w-3/5 h-3/5 p-8 border border-black rounded-lg mr-8 pb-4 border border-gray-400"> {/* Increased width and added padding bottom */}
          <div className="Appointment">
            <div>
              <h1 className="text-2xl font-bold mb-8">Book Appointment</h1> {/* Increased font size */}
            </div>
            <div className="w-1/2 mb-4">
              <input type="date" placeholder="Choose Date" className="mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input>
            </div>
            <div className="w-1/2 mb-4 ">
              <input type="text" placeholder="Input the Google Map Location" className="mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input>
            </div>
            <div className="w-1/2 h-48 mb-4">
              <textarea placeholder="Work Description" className="mb-4 w-full h-full mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></textarea> {/* Increased height */}
            </div>
          </div>
        </div>
        <div className="w-1/5 h-2/5 p-8 bg-gray-200 rounded-lg"> {/* Increased width and height */}
          <div className="confirm text-center">
            <h1 className="text-2xl font-bold mb-8 h-80">Amount Details</h1> {/* Increased font size */}
            <input type="submit" value="Confirm" className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 cursor-pointer"></input> {/* Increased width and height */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Booking">
      <Navsign />
      <Book />
    </div>
  );
};

export default Booking;
