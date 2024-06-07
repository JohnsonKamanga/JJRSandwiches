import NavBar from "./NavBar";
import Main from "./Main";
import Footer from "./Footer";

export default function HomePage(){

    return (
        <div className="flex flex-col min-h-full h-screen ">
            <NavBar/>
            <Main/>
            <Footer/>
        </div>
    )
}