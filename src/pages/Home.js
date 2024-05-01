import Navbar from "../components/nav";
import Carousel from "../components/carousel";

const Home = () => {
  const images = [
    "https://picsum.photos/1980/1080",
    "https://picsum.photos/1980/1080",
    "https://picsum.photos/1980/1080",
  ];

  const TwoColumnSection = () => {
    return (
      <div className="flex justify-between items-center bg-offwhite p-10">
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold">Discover</h4>
          <h1 className="text-3xl font-bold">
            Find Skilled Workers and <br /> Offer Your Services
          </h1>
          <div>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Get Started</button>
            <p className="text-gray-600 mt-2 cursor-pointer hover:text-gray-800">Learn more</p>
          </div>
        </div>
        <div>
          <ul className="list-disc space-y-2">
            <li>
              <h3 className="text-lg font-semibold">Step 1</h3>
              <p>Search for skilled workers in your area</p>
            </li>
            <li>
              <h3 className="text-lg font-semibold">Step 2</h3>
              <p>Connect and schedule a meeting</p>
            </li>
            <li>
              <h3 className="text-lg font-semibold">Step 3</h3>
              <p>Hire them and get the job done</p>
            </li>
            <li>
              <h3 className="text-lg font-semibold">Step 4</h3>
              <p>Rate and give feedback</p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className="home bg-offwhite py-10">
        <img className="freelancer-img mx-auto" src={require("../images/Freelance-worker.jpg")} alt="Freelance Workers"/>
        <div className="text-center p-4 font-myfont">
          <h1 className="text-4xl">Find Skilled Workers Nearby for Your Freelance Projects</h1>
        </div>
        <div className="p-4">
          <p>
            Networkk connects you with skilled workers in your area, providing convenient access to local job opportunities and trusted verified services.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <h4 className="text-lg font-semibold">Convenience</h4>
            <p>Easily find and hire skilled workers for your projects, saving you time and effort.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Local Job Opportunities</h4>
            <p>Discover job opportunities in your area and connect with employers seeking your skills.</p>
          </div>
        </div>
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold">Discover a Diverse Range of Services on Networkk</h1>
          <p className="mx-auto w-3/4 mt-4">
            Networkk is your go-to platform for finding skilled workers in your area. Whether you need a carpenter, plumber, electrician, or any other service provider, we've got you covered. Our diverse range of services ensures that you can easily find the right professional for your needs. With Networkk, you can trust that you're hiring experienced professionals who will deliver high-quality work. Don't settle for anything less than the best - explore our services today and get your project started with ease.
          </p>
        </div>
        {/* Example for one service block */}
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="text-center">
            <img className="mx-auto" src={require("../images/carpentericon.png")} alt="Carpentry Work"/>
            <h4 className="text-lg font-semibold mt-2">Carpentry Work</h4>
            <p>Carpenters are skilled craftsmen who specialize in the construction of wooden furniture and other wooden structures.</p>
          </div>
          {/*
          <div className="text-center">
            <img className="mx-auto" src={require("../images/path.to/home repair icon.png")} alt="Home Repairs and Renovation"/>
            <h4 className="text-lg font-semibold mt-2">Home Repairs and Renovation</h4>
            <p>Hire experienced professionals for all your home repair, maintenance, and renovation needs.</p>
          </div>
        </div>
        {/* Additional services and sign-up section */}
        <div className="flex justify-around items-center my-10">
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Explore</button>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors">Sign Up</button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="text-center">
            <img className="mx-auto" src={require("../images/voltmeter.png")} alt="Electrical Work"/>
            <h4 className="text-lg font-semibold mt-2">Electrical Work</h4>
            <p>Find skilled workers in your area for all your home's electrical and wiring needs.</p>
          </div>
          <div className="text-center">
            <img className="mx-auto" src={require("../images/brickwork.png")} alt="Masonry Work"/>
            <h4 className="text-lg font-semibold mt-2">Masonry Work</h4>
            <p>Masonry workers are the skilled people you may hire to do all your construction and building works.</p>
          </div>
        </div>
        {/* Offers and FAQ Section */}
        <div className="my-10 p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">What Network Offers</h1>
            <p className="text-lg mt-2">Explore the key features and benefits of using our platform.</p>
          </div>
          <div className="space-y-4 mt-4">
            <h4 className="text-lg font-semibold">Connects you to the right person</h4>
            <p>Detailed matching system ensures you find the right professional for your needs.</p>
            <h4 className="text-lg font-semibold">Map based interface</h4>
            <p>Use our interactive map to locate services and job opportunities near you.</p>
            <h4 className="text-lg font-semibold">Safe and Secure Services</h4>
            <p>All professionals on our platform are verified and reviewed to ensure your safety and satisfaction.</p>
          </div>
        </div>
        {/* Team Section */}
        <div className="bg-offwhite p-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Our Team</h1>
            <p className="text-lg">Meet the talented individuals behind Networkk</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Aaron Thomas Blessen</h2>
              <h3 className="text-md font-semibold">CMO</h3>
              <p className="text-sm">Experienced strategist with a passion for innovation and growth.</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Akshay Gopan</h2>
              <h3 className="text-md font-semibold">CTO</h3>
              <p className="text-sm">Tech enthusiast with expertise in developing cutting-edge solutions.</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Alan Philip</h2>
              <h3 className="text-md font-semibold">COO</h3>
              <p className="text-sm">Operations expert focused on delivering exceptional user experiences.</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Chandrasekhar C.A</h2>
              <h3 className="text-md font-semibold">Marketing Director</h3>
              <p className="text-sm">Strategic marketer driving brand awareness and customer acquisition.</p>
            </div>
          </div>
        </div>
        {/* Contact and Footer */}
        <div className="bg-gray-100 py-10">
        <div className="text-center">
            <img className="mx-auto" src={require("../images/Painter.jpg")} alt="Home Repairs and Renovation"/>
            <h4 className="text-lg font-semibold mt-2">Home Repairs and Renovation</h4>
            <p>Hire experienced professionals for all your home repair, maintenance, and renovation needs.</p>
          </div>
        </div>
        <div className="flex justify-between items-center px-10 py-5 bg-white">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Explore</button>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors">Sign Up</button>
        </div>
        <img className="freelancer-img mx-auto mt-5" src={require("../images/Painter.jpg")} alt="Freelance Workers"/>
        <div className="text-center py-5">
          <div className="font-myfont">
            <h1 className="text-4xl">Find Skilled Workers Near You</h1>
          </div>
          <p>Connect with talented freelancers for all your service needs.</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-colors">Sign Up</button>
            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition-colors">Log In</button>
          </div>
        </div>

        <div className="bg-gray-100 p-10">
          <h1 className="text-3xl font-bold text-center">What Networkk Offers</h1>
          <h4 className="text-xl text-center mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <h4 className="text-lg font-semibold">Connects you to the right person</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Map based interface</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Safe and Secure Services</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10">
          <h1 className="text-3xl font-bold text-center">Frequently Asked Questions</h1>
          <p className="text-center mt-2">Find answers to commonly asked questions about our platform and services.</p>
          <div className="space-y-3 mt-4">
            <div className="border-t border-b py-2">
              <h4 className="font-semibold">How does it work?</h4>
            </div>
            <div className="border-b py-2">
              <h4 className="font-semibold">Is it safe?</h4>
            </div>
            <div className="border-b py-2">
              <h4 className="font-semibold">How do I sign Up?</h4>
            </div>
            <div className="border-b py-2">
              <h4 className="font-semibold">Can I offer my services?</h4>
            </div>
            <div className="border-b py-2">
              <h4 className="font-semibold">How can I get paid?</h4>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Contact</button>
          </div>
        </div>

        <footer className="bg-offwhite p-5">
          <div className="flex justify-between items-center">
            <p>© 2024 Networkk All rights reserved.</p>
            <div className="flex gap-4">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookies Settings</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    );
  };

  return (
    <div className="home bg-offwhite">
      <Navbar />
      <Carousel images={images} />
      <TwoColumnSection />
      <Two />
    </div>
  );
};

export default Home;


