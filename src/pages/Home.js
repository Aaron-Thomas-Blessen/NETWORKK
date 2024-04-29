const Home = () => {
  return (
    <div className="home">
      <img
        className="freelancer-img"
        src="../images/Freelance-worker.jpg"
        alt="Freelance-Workers-img"
      />

      <div
        className="flex-container1"
        style={{
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        <h1>Find Skilled Workers Nearby for Your Freelance Projects</h1>
      </div>

      <div className="flex-container2">
        <p>
          Networkk connects you with skilled workers in your area, providing
          convenient access to local job opportunities and trusted verified
          services.
        </p>
      </div>

      <div className="flex-container3">
        <div>
          <h4>Convenience</h4>
          <p>
            Easily find and hire skilled workers for your projects, saving you
            time and effort.
          </p>
        </div>
        <div>
          <h4>Local Job Opportunities</h4>
          <p>
            Discover job opportunities in your area and connect with employers
            seeking your skills.
          </p>
        </div>
      </div>

      <section id="services-home-container">
        <div className="center-text">
          <h1>Discover a Diverse Range of Services on Networkk</h1>
          <p className="section__text">
            Networkk is your go-to platform for finding skilled workers in your
            area. Whether you need a carpenter, plumber, electrician, or any
            other service provider, we've got you covered. Our diverse range of
            services ensures that you can easily find the right professional for
            your needs. With Networkk, you can trust that you're hiring
            experienced professionals who will deliver high-quality work. Don't
            settle for anything less than the best - explore our services today
            and get your project started with ease.
          </p>
        </div>

        <div className="services-container1">
          <div>
            <img
              className="carpenter"
              src="carpentericon.png"
              alt="../images/carpentryicon.jpg"
            />
            <br />
            <h4 style={{ textAlign: "center" }}>Carpentry Work</h4>
            <p style={{ textAlign: "center" }}>
              Carpenters are skilled craftsmen who specialize in the
              construction of wooden furniture and other wooden structures.
            </p>
          </div>
          <br />

          <div>
            <img
              className="home-repair"
              src="home repair icon.png"
              alt="home-repair-icon"
            />
            <br />
            <h4 style={{ textAlign: "center" }}>Home Repairs and Renovation</h4>
            <p style={{ textAlign: "center" }}>
              Hire experienced professionals for all your home repair,
              maintenance, and renovation needs.
            </p>
          </div>
        </div>

        <img className="carpenter-img" src="carpenter.jpg" alt="service-img" />

        <div className="services-container2">
          <div>
            <img
              className="electrical"
              src="voltmeter.png"
              alt="electrical-work-icon"
            />
            <br />
            <h4 style={{ textAlign: "center" }}>Electrical Work</h4>
            <p style={{ textAlign: "center" }}>
              Find skilled workers in your area for all your home's electrical
              and wiring needs.
            </p>
          </div>
          <br />

          <div>
            <img className="masonry" src="brickwork.png" alt="masonry-icon" />
            <br />
            <h4 style={{ textAlign: "center" }}>Masonry Work</h4>
            <p style={{ textAlign: "center" }}>
              Masonry workers are the skilled people you may hire to do all your
              construction and building works.
            </p>
          </div>
        </div>
      </section>

      <div className="button-container1">
        <div>
          <button className="explore">Explore</button>
        </div>

        <div>
          <button className="signup">Sign Up</button>
        </div>
      </div>

      <img
        className="freelancer-img"
        alt="Freelance-Workers-img"
        src="Painter.jpg"
      />

      <div className="mid-page-signup">
        <div className="text-container1">
          <div
            className="flex-container4"
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
          >
            <h1>Find Skilled Workers Near You</h1>
          </div>

          <div className="flex-container5">
            <p style={{ marginLeft: "-4vh" }}>
              Connect with talented freelancers for all your service needs.
            </p>
          </div>

          <div className="button-container2">
            <div>
              <button style={{ color: "white" }} className="signup1">
                Sign Up
              </button>
            </div>

            <div>
              <div className="mid-login">
                <button className="login1">Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Offers">
        <div className="Offerhead">
          <h1>What Network Offers</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        </div>
        <div className="offerpts">
          <h4>Connects you to the right person</h4>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </h6>
          <h4>Map based interface</h4>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </h6>
          <h4>Safe and Secure Services</h4>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </h6>
        </div>
      </div>
      <div className="freq">
        <div className="freqhead">
          <h1>Frequently asked Questions</h1>
          <h6>
            Find answers to commonly asked questions about our platform and
            services.
          </h6>
          <button>Contact</button>
        </div>
        <div className="freqques">
          <hr></hr>
          <h4>How does it work?</h4>
          <hr></hr>
          <h4>Is it safe?</h4>
          <hr></hr>
          <h4>How do I sign Up?</h4>
          <hr></hr>
          <h4>Can I offer my services?</h4>
          <hr></hr>
          <h4>How can I get paid?</h4>
          <hr></hr>
        </div>
      </div>
      <div className="Team">
        <div className="Teamhead">
          <h6>Connecting</h6>
          <h1>Our Team</h1>
          <h6>Meet the talented individuals behind Networkk</h6>
        </div>
        <div className="Teamname">
          <div className="Aaron">
            <h2>Aaron Thomas Blessen</h2>
            <h3>CMO</h3>
            <h4>
              Experienced strategist with a passion for innovation and growth.
            </h4>
            <button>LinkedIn</button>
            <button>Twitter</button>
            <button>Portfolio</button>
          </div>
          <div className="Akshay">
            <h2>Akshay Gopan</h2>
            <h3>CTO</h3>
            <h4>
              Tech enthusiast with expertise in developing cutting-edge
              solutions.
            </h4>
            <button>LinkedIn</button>
            <button>Twitter</button>
            <button>Portfolio</button>
          </div>
          <div className="Alan">
            <h2>Alan Philip</h2>
            <h3>COO</h3>
            <h4>
              Operations expert focused on delivering exceptional user
              experiences.
            </h4>
            <button>LinkedIn</button>
            <button>Twitter</button>
            <button>Portfolio</button>
          </div>
          <div className="Chand">
            <h2>Chandrasekhar C.A</h2>
            <h3>Marketing Director</h3>
            <h4>
              Strategic marketer driving brand awareness and customer
              acquisition.
            </h4>
            <button>LinkedIn</button>
            <button>Twitter</button>
            <button>Portfolio</button>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="contacthead">
          <div className="contactus">
            <h1>Contact Us</h1>
            <h6>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </h6>
          </div>
          <div className="contactdet">
            <h3>Email</h3>
            <h6>hello@relume.io</h6>
            <h3>Phone</h3>
            <h6>+1 (555) 000-0000</h6>
            <h3>Office</h3>
            <h6>123 Sample St, Sydney NSW 2000 AU</h6>
          </div>
        </div>
        <div className="contactmap">map here</div>
      </div>
      <div className="news">
        <div className="newshead">
          <h2>LOGO</h2>
          <h5>
            Stay up to date on features and releases by joining our newsletter.
          </h5>
          <input type="email" placeholder="Your Email"></input>
          <button>Subscribe</button>
          <h6>
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </h6>
        </div>
        <div className="newsfollow">
          <h3>Follow us</h3>
          <h4>Facebook</h4>
          <h4>Instagram</h4>
          <h4>Twitter</h4>
          <h4>LinkedIn</h4>
          <h4>Youtube</h4>
        </div>
      </div>
      <hr></hr>
      <div class="footer">
        <div class="left">
          <h6>© 2024 Networkk All rights reserved.</h6>
        </div>
        <div class="right">
          <h6>Privacy Policy</h6>
          <h6>Terms of Service</h6>
          <h6>Cookies Settings</h6>
        </div>
      </div>
    </div>
  );
};

export default Home;
