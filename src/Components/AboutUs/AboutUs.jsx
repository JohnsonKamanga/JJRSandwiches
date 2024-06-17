import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import BgImage1 from "./fast-food-2132863_1920.jpg";
import BgImage2 from "./food-6697405_1920.jpg";
import BgImage3 from "./sandwich-2301387_1920.jpg";
import BgImage4 from "./toast-6011147_1920.jpg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const content = [
    {
      name: "Our Story",
      value: (
        <div>
          <h2 className="font-bold text-lg sm:text-xl text-center">Our Story</h2>
          <p className="p-2 font-normal">
            Founded by a group of sandwich enthusiasts, JJRSandwiches is a
            tribute to the humble yet extraordinary sandwich. We started this
            platform with a simple idea: to create a space where people can
            share their love for sandwiches, exchange recipes, and celebrate the
            spirit of culinary creativity.
          </p>
        </div>
      ),
    },
    {
      name: "Our Mission",
      value: (
        <div>
          <h2 className="font-bold text-lg sm:text-xl text-center">Our Mission</h2>

          <p className="p-2 font-normal">
            Our mission is to bring together sandwich lovers from all corners of
            the world. We aim to inspire, educate, and connect through the
            universal love of sandwiches. By sharing our favorite recipes and
            inviting you to share yours, we hope to build a vibrant community
            where everyone can discover new flavors and techniques.
          </p>
        </div>
      ),
    },
    {
      name: "Community and Sharing",
      value: (
        <div>
          <h2 className="font-bold text-lg sm:text-xl text-center">
            Community and Sharing
          </h2>

          <p className="p-2 font-normal">
            At JJRSandwiches, we believe in the power of food to bring people
            together. Our platform is designed to encourage interaction,
            discussion, and sharing. Whether you're a seasoned chef or a kitchen
            novice, your recipes, tips, and stories are what make our community
            special. We celebrate the diverse and innovative ways people create
            and enjoy sandwiches.
          </p>
        </div>
      ),
    },
    {
      name: "What We Offer",
      value: (
        <div>
          <h2 className="font-bold text-lg sm:text-xl text-center">What We Offer</h2>
          <ul className="p-2 list-disc text-s">
            <li className="mx-5">
              Diverse Recipes: From timeless classics to innovative new
              combinations, our collection of sandwich recipes is vast and
              varied. Each recipe is contributed by passionate sandwich makers
              from around the world, offering a taste of different cultures and
              culinary traditions.
            </li>
            <li className="mx-5">
              Tips and Tricks: Learn from the best with our handy tips and
              tricks section. Whether it's mastering the perfect toast,
              balancing flavors, or finding the best ingredients, our community
              shares valuable insights to elevate your sandwich-making skills.
            </li>
            <li className="mx-5">
              Community Stories: Food is not just about eating; it's about
              sharing experiences and creating memories. Read and share stories
              about your sandwich-making adventures, favorite food moments, and
              the special people you share them with.
            </li>
          </ul>
        </div>
      ),
    },
    {
      name: "Get Involved",
      value: (
        <div className="p-2 font-normal">
          <h2 className="font-bold text-xl text-center">Get Involved</h2>
          <p>
            Join us in our mission to celebrate the sandwich. Whether you have a
            family recipe that's been passed down through generations or a new
            creation you're excited to share, JJRSandwiches is the perfect place
            to showcase your culinary talents.</p>
            <ul className=" list-disc ">
              <li className="mx-5">
                Share Your Recipe: Submit your favorite sandwich recipes and
                get featured on our website.
              </li>
              <li className="mx-5">
                Connect with Others: Engage with fellow sandwich enthusiasts
                through comments, forums, and social media.
              </li>
              <li className="mx-5">
                Stay Inspired: Follow our blog for the latest sandwich trends,
                seasonal recipes, and community highlights.
              </li>
            </ul>
          
        </div>
      ),
    },
  ];

  const images = [BgImage1, BgImage2, BgImage3, BgImage4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col min-h-full h-screen">
      <NavBar />
      <div
      className="h-[88%] flex text-white items-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      <div className="flex flex-col sm:justify-between bg-black bg-opacity-35 min-h-full text-center text-xs sm:text-sm md:text-base">
        <div>
        <h1 className="font-bold text-2xl sm:text-3xl mt-[2%]">About Us</h1>

        <p className="p-2 font-normal">
          Welcome to JJRSandwiches, where the art of sandwich-making meets the
          joy of community, sharing, and food!
        </p>
        </div>
        <div className="flex flex-row h-[350px] sm:h-[285px] items-center text-center mx-2 lg:mx-[20%] p-3 border-[1px] border-white rounded-[24px]">
          <button
            onClick={() =>
              setCurrentContentIndex(
                currentContentIndex > 0 ? currentContentIndex - 1 : 0
              )
            }
            className="p-2 bg-gray-200 border-[1px] border-white hover:animate-bounce rounded-full"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-black"/>
          </button>
          {content[currentContentIndex].value}
          <button
            onClick={() =>
              setCurrentContentIndex(
                currentContentIndex + 1 < content.length
                  ? currentContentIndex + 1
                  : currentContentIndex
              )
            }
            className="p-2 bg-gray-200 border-[1px] border-white hover:animate-bounce  rounded-full"
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-black"/>
          </button>
        </div>

        <p className="p-2 font-normal mb-[2%]">
          Thank you for being a part of our community. Together, let's explore,
          create, and share the delicious world of sandwiches, one recipe at a
          time.
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
}
