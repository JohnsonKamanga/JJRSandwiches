import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";

export default function Recipes(){

    return(
        <div className="flex flex-col min-h-full h-screen">
            <NavBar/>
            <div className=" h-[86%]">
                Recipe content
            </div>
            <Footer/>
        </div>
    )
}