import { useEffect, useState } from "react";
import BgImage1 from "./pexels-alex-green-5692286.jpg";
import BgImage2 from "./pexels-anton-porsche-37909-133578.jpg";
import BgImage3 from "./pexels-brigitte-tohm-36757-350343.jpg";
import { NavLink } from "react-router-dom";

export default function Main() {
  const images = [BgImage1, BgImage2, BgImage3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="h-[88%] flex items-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      {" "}
      <div className="p-2 bg-black bg-opacity-35 flex flex-col items-center justify-center min-w-full w-screen min-h-full">
        <h1 className="text-white font-bold text-3xl md:text-5xl text-center ">
          Welcome to JJRSandwiches
        </h1>
        <h2 className="text-white font-bold text-lg md:text-2xl text-center ">
          The Home of Sandwiches
        </h2>
        <div className="text-white text-center flex flex-col items-center">
          <p className=" p-3 my-2 bg-opacity-35 rounded-2xl md:max-w-[70%] text-sm md:text-base">
            Your ultimate blog spot for all things sandwich-related! Here, we
            celebrate the art of sandwich-making with mouth-watering recipes,
            expert tips, and inspiring stories behind every bite.<br></br>{" "}
            Whether you're a classic BLT lover, an adventurous gourmet
            enthusiast, or someone looking to recreate cherished family
            favorites, our blog is your go-to resource for creating the perfect
            sandwich.<br></br> Join our community of sandwich aficionados and
            elevate your sandwich game to newer heights.
          </p>
        </div>
        <div className=" rounded-3xl border-[2px] p-2 text-xs md:text-sm text-white hover:cursor-pointer transition-colors duration-300 hover:bg-white hover:bg-opacity-40">
          <NavLink to="/LoginPage">Join The Community</NavLink>
        </div>
      </div>
    </div>
  );
}
