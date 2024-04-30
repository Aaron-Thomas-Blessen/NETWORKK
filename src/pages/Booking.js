import Navbar from "../components/nav";

const Booking = () => {
  const Book = () => {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="w-2/5 p-4 border-black border mr-4">
          <div className="Appointment">
            <h1 className="text-xl font-bold mb-4">Book Appointment</h1>
            <input type="date" placeholder="Choose Date" className="mb-2 border rounded p-2 w-full"></input>
            <input type="text" placeholder="Input the Google Map Location" className="mb-2 border rounded p-2 w-full"></input>
            <textarea placeholder="Work Description" className="mb-2 border rounded p-2 w-full"></textarea>
          </div>
        </div>
        <div className="w-2/5 p-4 bg-gray-200">
          <div className="confirm h-full">
            <h1 className="text-xl font-bold mb-4">Amount Details</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <input type="submit" value="Confirm" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"></input>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Booking">
      <Navbar />
      <Book />
    </div>
  );
};

export default Booking;
