import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";

export default function Ratings(){

    return(
        <div className="flex flex-col min-h-full h-screen">
            <NavBar/>
            <div className="h-[86%]">
                ratings contents
            </div>
            <Footer/>
        </div>
    )
}