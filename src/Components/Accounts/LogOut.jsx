import { useNavigate } from "react-router-dom";

export default function LogOut(props) {
  const navigate = useNavigate();

  const showPopUp = props.showPopUp;
  const setShowPopUp = props.setShowPopUp;
  const handlePopUp = props.handlePopUp;

  return (
    <div className="backdrop-blur-lg min-h-full h-screen w-full absolute top-0 left-0">
        <div className="min-h-full h-screen w-full bg-black flex flex-col justify-center items-center bg-opacity-40 text-white">
      <div className="flex flex-col justify-center items-center p-3 bg-black bg-opacity-35 rounded-[18px] border-[1px] border-black border-opacity-75">
      <div className="text-3xl p-2 font-bold">Are You Sure You Want To Logout?</div>
      <div className="flex flex-row font-[400] text-sm">
        <div
          className="hover:cursor-pointer mx-3 p-3 rounded-[18px] transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 hover:text-[#f87058] border-[1px] border-black border-opacity-75 "
          onClick={() => {
            navigate("/HomePage");
          }}
        >
          Logout
        </div>
        <div
          className="hover:cursor-pointer mx-3 p-3 rounded-[18px] transition-all duration-200 bg-black bg-opacity-50 hover:bg-opacity-75 hover:text-[#f87058] border-[1px] border-black border-opacity-75 "
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
