import { faPlus, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../Accounts/UserContext";
import { baseurl } from "../../routes";

export default function NewCommunity(){
    const {token} = useContext(UserContext);
    const [display,setDisplay] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const decodedToken = await axios.post(`${baseurl}/auth/decode`, { access_token: token.data.access_token })
        axios.post(`${baseurl}/communities`, {name,description})
        .then((community)=>{
            console.log("community created");
            axios.put(`${baseurl}/communities/members/${community?.data?.id}`,{
                userid: decodedToken?.data?.sub,
                username: decodedToken?.data?.username,
              })
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    if(!display){
        return(
            <div className="fixed z-40 hover:cursor-pointer top-[500px] right-3 rounded-xl flex items-center justify-center w-10 h-10 hover:w-11 hover:h-11 bg-[#f29260] hover:bg-[#f87058]"
            onClick={()=>setDisplay(!display)}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        )
    }

return(
    <div className="fixed flex flex-col backdrop-blur-lg  h-full w-full items-center justify-center z-40 top-0">
    <div className=" ">
    <div
    className="rounded-full flex items-center justify-center bg-white w-7 h-7 hover:cursor-pointer"
    onClick={()=>{setDisplay(!display)}}
    ><FontAwesomeIcon icon={faX}/></div>
    <form
    className="h-[200px] w-[200px] bg-gray-500"
    onSubmit={handleSubmit}
    >
        <div>
            <label
            htmlFor="communityName"
            ></label>
        <input
        id='communityName'
        type="text"
        placeholder='enter community name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        >        
        </input>
        </div>
        <div>
        <label
        htmlFor="communityDescription"
        >
        </label>
        <input
        id="communityDescription"
        type="text"
        placeholder="enter description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        ></input>
        </div>
        <div>
            <button
            className="bg-red-500"
            type="submit"
            >submit</button>
        </div>
    </form>
    </div>
    </div>)
}