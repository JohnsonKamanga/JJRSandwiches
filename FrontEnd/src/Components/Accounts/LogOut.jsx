import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LogOut(props) {
  const navigate = useNavigate();
  const {setIsSignedIn, setToken} = useContext(UserContext);
  const showPopUp = props.showPopUp;
  const setShowPopUp = props.setShowPopUp;
  const handlePopUp = props.handlePopUp;

  return (
    <div className="backdrop-blur-lg min-h-full h-screen w-full z-50 absolute top-0 left-0">
        <div className="min-h-full h-screen w-full bg-black flex flex-col justify-center items-center bg-opacity-40 text-white">
      <div className="flex flex-col justify-center items-center p-3 bg-black bg-opacity-35 rounded-md border-[1px] border-white border-opacity-5">
      <div className="text-xl text-center sm:text-2xl p-2 font-medium">Are You Sure You Want To Logout?</div>
      <div className="flex flex-row font-extralight text-xs sm:text-sm">
        <div
          className="hover:cursor-pointer mx-3 p-3 rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 hover:text-[#f87058] border-[1px] border-white border-opacity-5 hover:border-opacity-15 "
          onClick={() => {
            setToken();
            sessionStorage.removeItem("token");
            setIsSignedIn(false);
            navigate("/HomePage");
          }}
        >
          Logout
        </div>
        <div
          className="hover:cursor-pointer mx-3 p-3 rounded-md transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 hover:text-[#f87058] border-[1px] border-white border-opacity-5 hover:border-opacity-15 "
          onClick={handlePopUp}
        >
          Go Back
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
