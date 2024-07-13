import NavBar from "./NavBar";
import Main from "./Main";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <div>
    <div className="flex flex-col min-h-full h-screen min-w-full w-fit">
      <NavBar />
      <Main />
      <Footer />
    </div>
    </div>
  );
}
