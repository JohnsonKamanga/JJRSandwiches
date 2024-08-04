import Footer from "../HomePage/Footer";
import NavBar from "../HomePage/NavBar";
import GroupLogo from "./default-community-picture.jpg";
import UserLogo from "./default-user-picture.jpg";
import RecipePic from "./default-recipe-picture.jpg";

export default function Attributions() {
  return (
    <div>
      <div className="min-h-full h-screen w-full flex flex-col">
        <NavBar />
        <div className="flex flex-col lg:flex-row items-center lg:items-start p-2 bg-gray-600 bg-opacity-30" id="main">
          <div className="lg:w-[60%] lg:mx-2">
            <div className="text-3xl text-center p-2 text-white">Images</div>
            <div className="grid grid-cols-2  bg-gray-600 bg-opacity-30 p-2 rounded-md">
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit lg:w-full rounded-[26px]"
                    src="https://img.freepik.com/free-photo/fresh-sandwiches-arrangement-wooden-background_23-2148617300.jpg?t=st=1722679533~exp=1722683133~hmac=661b98b750670fa18782e45bd0a57979f34e4b7af13fbb5fccb1b926d0869038&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/fresh-sandwiches-arrangement-wooden-background_9365468.htm#query=sandwiches%20background&position=9&from_view=keyword&track=ais_hybrid&uuid=197f1fc9-ac39-47e6-888d-9587ba072538">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/top-view-delicious-sandwiches-arrangement-with-copy-space_23-2148617388.jpg?t=st=1722679990~exp=1722683590~hmac=2261d540fe14b4fe56cdf6ecc93f15803efac7f0aabf7ccb6f45e727c8710d82&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/top-view-delicious-sandwiches-arrangement-with-copy-space_9365390.htm?query=sandwiches background">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/top-view-fresh-sandwiches-assortment-wooden-background_23-2148617304.jpg?t=st=1722680176~exp=1722683776~hmac=12b1eaeac50f0ef3c4088b5148640dfd2fa7e5357a4fe634d768f64f1a31adb6&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/top-view-fresh-sandwiches-assortment-wooden-background_9365473.htm#query=sandwiches%20background&position=21&from_view=keyword&track=ais_hybrid&uuid=25c02d48-912f-45e0-907e-bc5cebdf1dac">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/fresh-sandwiches-arrangement-wooden-background_23-2148617310.jpg?t=st=1722680332~exp=1722683932~hmac=a77517efd39c47ac15a73d68f647d10589c9c0955bef76a757821e798f7e5f98&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/fresh-sandwiches-arrangement-wooden-background_9365467.htm#query=sandwiches%20background&position=13&from_view=keyword&track=ais_hybrid&uuid=312ae407-ad3b-400e-9b0f-77137eec231b">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/top-view-healthy-sandwiches-composition-cement-background_23-2148617317.jpg?t=st=1722680434~exp=1722684034~hmac=d42d16af0cb2e740d0075e84509c1c071aaa7cd29678a39ee85d7f863da00789&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/top-view-healthy-sandwiches-composition-cement-background_9365461.htm#query=sandwiches%20background&position=24&from_view=keyword&track=ais_hybrid&uuid=4f385cbb-ae93-47a3-bdb9-d5309d98ffd0">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/two-sandwiches-tablecloth-with-copy-space_23-2148465132.jpg?t=st=1722680592~exp=1722684192~hmac=9512c5f826752ddeb7d5773052168e9d6c6ab726c01cc80f89a4468ef6bd1f54&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/two-sandwiches-tablecloth-with-copy-space_7086679.htm#query=sandwiches%20background&position=24&from_view=keyword&track=ais_hybrid&uuid=83fa427d-5346-4dfa-b518-895739e9ba82">
                    Freepik
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between m-2 rounded-[28px] p-2 text-white font-thin bg-black bg-opacity-50">
                <div className="mb-1 flex flex-col items-center">
                  <img
                    className="w-fit rounded-[26px]"
                    src="https://img.freepik.com/free-photo/top-view-fresh-sandwiches-composition-cement-background_23-2148617338.jpg?t=st=1722680652~exp=1722684252~hmac=d3cfe89e630ce59c8ae34f37f88111e7156cb9c16946870e2db8aa1413031014&w=740"
                  />
                </div>
                <div className="p-3">
                  Image by{" "}
                  <a className="font-medium hover:text-[#f29260] transition-all" href="https://www.freepik.com/free-photo/top-view-fresh-sandwiches-composition-cement-background_9365434.htm#query=sandwiches%20background&position=23&from_view=keyword&track=ais_hybrid&uuid=b821d45f-8f46-44ac-9022-72efef1958e2">
                    Freepik
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[40%] lg:min-h-full lg:mx-2 text-white text-center mb-5">
            <div className="text-3xl text-center p-2">Logos</div>
            <div className="grid grid-cols-2  bg-gray-600 bg-opacity-30 p-2 rounded-md">
              <div className="m-1 p-2 bg-black bg-opacity-40 rounded-[28px]">
                <div className="mb-1 sm:h-[300px] lg:h-[200px] flex flex-col items-center">
                  <img className="rounded-[26px] h-full" src={GroupLogo} />
                </div>
                <div className="p-2">
                  <a className="hover:text-[#f29260] transition-all" href="https://www.vecteezy.com/free-vector/group-of-people-icon">
                    Group Of People Icon Vectors by Vecteezy
                  </a>
                </div>
              </div>
              <div className="m-1 p-2 bg-black bg-opacity-40 rounded-[28px]">
                <div className="mb-1 sm:h-[300px] lg:h-[200px] flex flex-col items-center">
                  <img className="rounded-[26px] h-full" src={UserLogo} />
                </div>
                <div className="p-2">
                  <a className="hover:text-[#f29260] transition-all" href="https://www.vecteezy.com/free-vector/default-profile-picture">
                    Default Profile Picture Vectors by Vecteezy
                  </a>
                </div>
              </div>
              <div className="m-1 p-2 bg-black bg-opacity-40 rounded-[28px]">
                <div className="mb-1 sm:h-[300px] lg:h-[200px] flex flex-col items-center">
                  <img className="rounded-[26px] h-full" src={RecipePic} />
                </div>
                <div className="p-2">
                  <a className="hover:text-[#f29260] transition-all" href="https://www.vecteezy.com/free-vector/sandwich">
                    Sandwich Vectors by Vecteezy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
