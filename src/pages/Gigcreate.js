import Navsign from "../components/navsign";

const Gigcreate = () => {
    const Gig = () => {
        return (
            <div className="flex flex-col items-center justify-center mt-8"> {/* Added margin top */}
                <div className="gig-container rounded-lg p-8 mb-8 w-96 border border-gray-400 rounded-l-md">
                    <div className="gigcreate">
                        <h1 className="text-3xl text-center mb-4">Create your Gig</h1>
                    </div>
                    <div className="gigtitle mb-4">
                        <label htmlFor="1" className="block">Gig Title</label>
                        <input type="text" id="1" placeholder="Enter your Gig title" className="w-full h-full border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input> {/* Rounded edges */}
                    </div>
                    <div className="gigcat mb-4">
                        <label htmlFor="2" className="block">Gig Category</label>
                        <input type="text" id="2" placeholder="Enter your Gig Category" className=" w-full h-full border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input> {/* Rounded edges */}
                    </div>
                    <div className="gigsearch mb-4">
                        <label htmlFor="3" className="block">Search tags</label>
                        <input type="text" id="3" placeholder="Enter Search Tags" className="w-full h-full border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input> {/* Rounded edges */}
                    </div>
                    <div className="gigdes mb-4">
                        <label htmlFor="4" className="block">Description</label>
                        <input type="text" id="4" placeholder="enter Description" className="w-full h-full border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input> {/* Rounded edges */}
                    </div>
                    <div className="gigperv mb-8">
                        <div className="">
                            <label htmlFor="5" className="block">Previous Works</label>
                            <input className="w-full h-full border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950" type="file" id="5" accept="image/png, image/jpeg"></input> {/* Rounded edges */}
                        </div>
                    </div>
                    <div className="gigsubmit flex justify-center">
                        <input type="submit" value="Publish Gig" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer text-lg"></input>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="Gigcreate">
            <Navsign />
            <Gig />
        </div>
    );
};

export default Gigcreate;
