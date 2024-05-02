import Navbar from "../components/nav";

const Gigcreate = () => {
    const Gig = () =>{
        return(
            <div className="gig">
                <div className="gigcreate">
                    <h1>Create your Gig</h1>
                </div>
                <div className="gigtitle">
                    <input type="text" placeholder="Enter your Gig title"></input>
                </div>
                <div className="gigcat">
                    <input type="text" placeholder="Enter your Gig Category"></input>
                </div>
                <div className="gigsearch">
                    <input type="text" placeholder="Enter Search Tags"></input>
                </div>
                <div className="gigdes">
                    <input type="text" placeholder="enter Description"></input>
                </div>
                <div className="gigperv">
                    <input type="text" placeholder="enter Description"></input>
                </div>
                <div className="gigtitle">
                    <input type="text" placeholder="enter you gig title"></input>
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
  

