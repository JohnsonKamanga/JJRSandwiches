export default function DropDown({isOpen}){

    return(
        <div className=" ">

            {isOpen ? (
                <ul className="p-1 rounded-b-md bg-blue-500 flex flex-col">
            <li className="mb-1 hover:text-white hover:cursor-pointer">
                Manage Account
            </li>
            <li className="mb-1 hover:text-white hover:cursor-pointer">
                Search
            </li>
            <li className="hover:text-white hover:cursor-pointer">
                Messages
            </li>
            </ul>
            )
            :
           ( <div></div>)
        }
        </div>
    )
}