import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-full h-screen">
      <NavBar />
      <div className="h-[88%]">Account Page</div>
      <Footer />
    </div>
  );
}
