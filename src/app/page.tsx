import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Story from "../components/Story";
import Partners from "../components/Partners";
import Tweets from "../components/Tweets";
import Events from "../components/Events";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div id="story">
        <Story />
      </div>
      <div id="products">
        <Products />
      </div>
      <div id="partners">
        <Partners />
      </div>
      <div id="tweets">
        <Tweets />
      </div>
      <div id="events">
        <Events />
      </div>
      <Footer />
    </div>
  );
}
