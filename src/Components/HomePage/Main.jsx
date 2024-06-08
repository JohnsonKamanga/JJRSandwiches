import { useEffect, useState } from "react";
import BgImage1 from "./pexels-alex-green-5692286.jpg";
import BgImage2 from "./pexels-anton-porsche-37909-133578.jpg";
import BgImage3 from "./pexels-brigitte-tohm-36757-350343.jpg"

export default function Main(){

    const images = [BgImage1, BgImage2, BgImage3];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(
        ()=> {
        const interval = setInterval( () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000); 
        console.log(`Current image index: ${currentImageIndex}`);
        return () => clearInterval(interval);
    }
    , [images.length]);

    return(
        <div className="h-[88%] bg-cover bg-center transition-all duration-1000"
        style={{
            backgroundImage: `url(${images[currentImageIndex]})`
        }}
        >   <div className="p-2 bg-black opacity-75 z-[-1]">
            <h1 className=" text-white text-xl text-center">Welcome to JJRSandwiches, home to the best sandwhich recipes one could wish for</h1>
            </div>
        </div>
    )
}