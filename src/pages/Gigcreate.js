import Navbar from "../components/nav";

const Gigcreate = () => {
    const Gig = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="gig mb-8 w-96">
                    <div className="gigcreate">
                        <h1 className="text-3xl text-center mb-4">Create your Gig</h1>
                    </div>
                    <div className="gigtitle mb-4">
                        <label htmlFor="1" className="block">Gig Title</label>
                        <input type="text" id="1" placeholder="Enter your Gig title" className="border-black border min-w-full px-4 py-2"></input>
                    </div>
                    <div className="gigcat mb-4">
                        <label htmlFor="2" className="block">Gig Category</label>
                        <input type="text" id="2" placeholder="Enter your Gig Category" className="border-black border min-w-full px-4 py-2"></input>
                    </div>
                    <div className="gigsearch mb-4">
                        <label htmlFor="3" className="block">Search tags</label>
                        <input type="text" id="3" placeholder="Enter Search Tags" className="border-black border min-w-full px-4 py-2"></input>
                    </div>
                    <div className="gigdes mb-4">
                        <label htmlFor="4" className="block">Description</label>
                        <input type="text" id="4" placeholder="enter Description" className="border-black border min-w-full px-4 py-2"></input>
                    </div>
                    <div className="gigperv mb-4">
                        <div className="">
                            <label htmlFor="5" className="block">Previous Works</label>
                            <input className="border border-black p-4 w-full px-4 py-2" type="file" id="5" accept="image/png, image/jpeg"></input>
                        </div>
                    </div>
                    <div className="gigsubmit flex justify-center">
                        <input type="submit" value="Publish Gig" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 cursor-pointer text-lg"></input>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="Gigcreate">
            <Navbar />
            <Gig />
        </div>
    );
};

export default Gigcreate;
