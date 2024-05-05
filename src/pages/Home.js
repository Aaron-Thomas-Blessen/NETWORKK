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
      <div className="flex flex-wrap justify-between items-center mb-20 mx-auto mt-20 ml-48">
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pr-10">
          <h4 className="text-2xl font-bold mb-4">Discover</h4>
          <h1 className="text-4xl font-bold mb-6">
            Find Skilled Workers and <br />
            Offer Your Services
          </h1>
          <div className="btn">
            <button className="px-8 py-4 bg-black text-white rounded-lg mr-4">
              Get Started
            </button>
            <p className="text-gray-700">Learn more</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pl-10 mt-8 lg:mt-0">
          <ul>
            <li className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Step 1</h3>
              <p>Search for skilled workers in your area</p>
            </li>
            <li className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Step 2</h3>
              <p>Search for skilled workers in your area</p>
            </li>
            <li className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Step 3</h3>
              <p>Search for skilled workers in your area</p>
            </li>
            <li className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Step 4</h3>
              <p>Search for skilled workers in your area</p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className="home">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 lg:pl-4">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-4 text-center">
                Find Skilled Workers Nearby for Your Freelance Projects
              </h1>
            </div>

            <div className="text-center py-8 mb-4">
              <p>
                Networkk connects you with skilled workers in your area,
                providing convenient access to local job opportunities and
                trusted verified services.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-0">
              <div className="lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
                <h4 className="text-xl font-bold mb-4">Convenience</h4>
                <p>
                  Easily find and hire skilled workers for your projects, saving
                  you time and effort.
                </p>
              </div>
              <div className="lg:w-1/2 lg:pl-4">
                <h4 className="text-xl font-bold mb-4">
                  Local Job Opportunities
                </h4>
                <p>
                  Discover job opportunities in your area and connect with
                  employers seeking your skills.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 lg:pr-4">
            <img
              className="freelancer-img lg:float-right"
              src={require("../images/Freelance-worker.jpg")}
              alt="Freelance-Workers-img"
            />
          </div>
        </div>

        <section id="services-home-container" className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">
                Discover a Diverse Range of Services on Networkk
              </h1>
              <p className="text-base text-gray-700 px-48 mb-8">
                Networkk is your go-to platform for finding skilled workers in
                your area. Whether you need a carpenter, plumber, electrician,
                or any other service provider, we've got you covered. Our
                diverse range of services ensures that you can easily find the
                right professional for your needs. With Networkk, you can trust
                that you're hiring experienced professionals who will deliver
                high-quality work. Don't settle for anything less than the best
                - explore our services today and get your project started with
                ease.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={require("../images/carpentericon.png")}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">Carpentry Work</h4>
                  <p>
                    Carpenters are skilled craftsmen who specialize in the
                    construction of wooden furniture and other wooden
                    structures.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={require("../images/home repair icon.png")}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">
                    Home Repairs and Renovation
                  </h4>
                  <p>
                    Hire experienced professionals for all your home repair,
                    maintenance, and renovation needs.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="text-center">
                  <img
                    className="mx-auto mb-4"
                    src={require("../images/carpenter.jpg")}
                    alt="carpentryicon"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={require("../images/voltmeter.png")}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">
                    Electrical Work
                  </h4>
                  <p>
                    Find skilled workers in your area for all your home's
                    electrical and wiring needs and say goodbye to all your
                    troubles.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={require("../images/brickwork.png")}
                    alt="carpentryicon"
                  />
                  <h4 className="text-lg font-semibold mb-2">Masonry Work</h4>
                  <p>
                    Masonry workers are the skilled people you may hire to do
                    all your construction and building works.
                  </p>
                </div>
              </div>
            </div>
            <div className="button-container1 flex justify-center py-8">
              <div className="mx-4">
                <button className="explore px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 hover:text-white">
                  Explore
                </button>
              </div>
              <div className="mx-4">
                <button className="signup px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 hover:text-black">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mr-8 mb-8 lg:mb-0">
          <div className="mid-page-signup py-8 lg:w-1/2 lg:pr-8">
            <div className="text-container1 text-center lg:text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4">
                Find Skilled Workers Near You
              </h1>
              <div className="flex-container5 py-4">
                <p>
                  Connect with talented freelancers for all your service needs.
                </p>
              </div>
              <div className="button-container2 flex justify-center lg:justify-center lg:justify-start">
                <div className="mx-4">
                  <button className="signup1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 hover:text-white">
                    Sign Up
                  </button>
                </div>
                <div className="mx-4">
                  <button className="login1 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 hover:text-black">
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            className="freelancer-img mb-4 lg:mb-0"
            alt="Freelance-Workers-img"
            src={require("../images/Painter.jpg")}
          />
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
