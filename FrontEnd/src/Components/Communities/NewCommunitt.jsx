import { faPlus, faSpinner, faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";

export default function NewCommunity(props){
    const communities = props.communities;
    const setCommunities = props.setCommunities;
    const {token} = useContext(UserContext);
    const [display,setDisplay] = useState(false);
    const [communityPicture, setCommunityPicture] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingDisplay, setLoadingDisplay] = useState(
        <div className="w-[250px] h-[250px] rounded-md text-white bg-black bg-opacity-35 flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl"/>
        <div className="text-xl">
            loading...
        </div>
    </div>
    )
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const decodedToken = await axios.post(`${baseurl}/auth/decode`, { access_token: token.data.access_token })
        axios.postForm(`${baseurl}/communities`, {name,description, communityPicture})
        .then((community)=>{
            axios.put(`${baseurl}/communities/members/${community?.data?.id}`,{
                userid: decodedToken?.data?.sub,
                username: decodedToken?.data?.username,
              })
              setCommunities([...communities, community.data]);
              setLoadingDisplay(
                <div className="w-[250px] h-[250px] rounded-md text-white bg-black bg-opacity-35 flex flex-col items-center justify-center">
                <div className="text-base text-center">
                Community created succesfully
                </div>
            </div>
              )
        })
        .catch((err)=>{
            console.error(err);
            setLoadingDisplay(
                <div className="w-[250px] h-[250px] rounded-md text-white bg-black bg-opacity-35 flex flex-col items-center justify-center">
                    <div className="text-xl text-[#ff0000]">
                    {`${err.code}: ${err.message}`}
                    </div>
                </div>
            )
        })
    }

    if(!display){
        return(
            <div className="fixed bottom-20 right-5 hover:cursor-pointer bg-black flex items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
            onClick={()=>setDisplay(!display)}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        )
    }

return(
    <div className="fixed flex flex-col backdrop-blur-lg  h-full w-full items-center justify-center z-40 top-0 left-0">
    <div className="p-4 w-full flex flex-col items-center text-white ">
    <div
    className="bg-black absolute top-5 left-5 flex hover:cursor-pointer items-center justify-center w-10 h-10 bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-xl font-medium text-white"
    onClick={()=>{
        setDisplay(!display)
        setCommunityPicture();
        setName("");
        setDescription("");
        setLoading(false);
    }}
    ><FontAwesomeIcon icon={faX}/></div>
    {
    !loading?
    <form
    className="p-2 h-[400px] w-[350px] flex flex-col bg-black bg-opacity-45 rounded-xl items-center justify-center placeholder:text-center text-xs sm:text-sm md:text-base border-[1px] border-white border-opacity-20"
    onSubmit={handleSubmit}
    >

<div className="flex flex-col items-center justify-center mb-[3%] ">
                <div className="h-[120px] lg:h-[150px] w-[120px] lg:w-[150px] flex flex-col justify-center bg-black bg-opacity-65 rounded-xl p-1">
                  <label
                    id="pfp_label"
                    htmlFor="communityPicture"
                    className="flex flex-col justify-center hover:cursor-pointer font-thin text-opacity-70 text-white transition-all hover:bg-white hover:bg-opacity-10 h-full w-full rounded-xl"
                  >
                    <img
                      id="pfp"
                      alt="profile picture"
                      className=" items-center rounded-xl hidden"
                    />
                    <FontAwesomeIcon
                      id="addPicture"
                      icon={faPlus}
                      className="block"
                    />
                    <p id="text_addPicture" className="block text-center">
                      add picture
                    </p>
                  </label>

                  <input
                    name="communityPicture"
                    id="communityPicture"
                    type="file"
                    accept="image/*"
                    src={communityPicture}
                    onChange={(e) => {
                      document.getElementById("addPicture").style.display =
                        "none";
                      document.getElementById("text_addPicture").style.display =
                        "none";

                      const preview = document.getElementById("pfp");
                      preview.style.display = "block";
                      const reader = new FileReader();
                      reader.onload = () => {
                        preview.src = reader.result;
                      };
                      reader.readAsDataURL(e.target.files[0]);
                      setCommunityPicture(e.target.files[0]);
                    }}
                    className="hidden"
                  ></input>
                </div>
                <div className="flex flex-row p-1 items-center text-center"></div>
              </div>

        <div className="flex flex-row w-[310px] items-center justify-center bg-black bg-opacity-65 rounded-xl mb-1">
            <label
            className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
            htmlFor="communityName"
            >Name:</label>
        <input
        className="bg-transparent text-sm h-14 text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 hover:rounded-r-xl outline-none border-none border-0 border-opacity-0 w-[70%]"
        id='communityName'
        type="text"
        placeholder='Community name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        >        
        </input>
        </div>
        <div className="flex flex-row w-[310px] items-center justify-center bg-black bg-opacity-65 rounded-xl mb-1">
        <label
        className="w-[120px] font-medium text-white text-end p-2 border-r-[1px]"
        htmlFor="communityDescription"
        >
            Description
        </label>
        <textarea
        className="bg-transparent text-sm text-white placeholder:text-white placeholder:text-opacity-70 transition-all duration-200 font-light p-3 lg:p-[17px] hover:bg-white hover:bg-opacity-10 hover:rounded-r-xl outline-none border-none border-0 border-opacity-0 w-[70%]"
        id="communityDescription"
        type="text"
        placeholder="Community description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        ></textarea>
        </div>
        <div>
            <button
            className="bg-black text-base w-16 h-10 block bg-opacity-70 hover:text-[#f87058] hover:bg-opacity-90 transition-all duration-200 p-2 rounded-[18px] font-medium text-white"
            type="submit"
            >
                <FontAwesomeIcon icon={faUpload}/>
            </button>
        </div>
    </form>
    :
    loadingDisplay
    }
    </div>
    </div>)
}