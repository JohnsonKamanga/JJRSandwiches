import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";

export default function LoginPage(){

    return(
        <div className="min-h-full h-screen min-w-full w-fit">
            <NavBar/>
            <div className="h-[86%]">
            login content
            </div>
            <Footer/>
        </div>
    )
}