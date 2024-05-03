import Navbar from "../components/nav";
import Carousel from "../components/carousel";
import { SiBnbchain } from "react-icons/si";


const Home = () => {

const Images = [
    'https://picsum.photos/1980/1080',
    'https://picsum.photos/1980/1080',
    'https://picsum.photos/1980/1080'
    // Just some demo images for carousel
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
        <ul>
        <li>
          <h3> Step 1</h3>
          <p>Search for skilled workers in your area</p>
        </li>
        <li>
          <h3>Step 1</h3>
          <p>Search for skilled workers in your area</p>
        </li>
        <li>
          <h3>Step 1</h3>
          <p>Search for skilled workers in your area</p>
        </li>
        <li>
          <h3>Step 1</h3>
          <p>Search for skilled workers in your area</p>
        </li>
        </ul>
      </div>
    </div>
  );
};


    return(
    <div className="home">
      <Navbar />
      <Carousel images={Images} />
      <TwoColumnSection />
    </div>
    );
  };
  
  export default Home;
  