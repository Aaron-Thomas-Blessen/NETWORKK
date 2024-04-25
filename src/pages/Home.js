import Navbar from "../components/nav";
import Carousel from "../components/carousel";
const Home = () => {

  const images = [
    'https://picsum.photos/1980/1080',
    'https://picsum.photos/1980/1080',
    'https://picsum.photos/1980/1080',
    // Just some demo images
  ];


const TwoColumnSection = () => {
  return (
    <div className="two-column-section">
      <div className="left-column">
      <h4>Discover</h4>
      <h1>Find Skilled Workers and <br/>Offer Your Services</h1>
      <div className="btn">
        <button>Get Started</button>
        <p>Learn more</p>
      </div>
      </div>
      <div className="right-column">

      </div>
    </div>
  );
};


    return(
    <div className="home">
      <Navbar />
      <Carousel images={images} />
      <TwoColumnSection />
    </div>
    );
  };
  
  export default Home;
  