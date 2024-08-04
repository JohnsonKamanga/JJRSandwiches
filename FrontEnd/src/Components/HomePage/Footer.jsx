import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex justify-between md:justify-normal p-2">
      <div className="mx-1 flex flex-col items-center md:items-start font-[350]">
      <div className="font-medium">Contacts</div>
        <div className="my-1">
        <a
        className="hover:text-[#f29260] transition-all flex items-center"
        href="https://x.com/kamanga_johnson?s=09"
        ><FontAwesomeIcon icon={faXTwitter}/>
        <span className="hidden md:block ml-1 text-xs">
        @kamanga_johnson
        </span>
        </a>
        </div>
        <div className="my-1">
          <a 
          className="hover:text-[#f29260] transition-all flex items-center"
          href="mailto:johnsonkamanga2@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="hidden md:block ml-1 text-xs">JohnsonKamanga2@gmail.com</span>
          </a>
        </div>
      </div>
      <div className="mx-1 flex flex-col items-center font-[350]">
        <div className="font-medium">Portfolio</div>
      <div>
          <a
          className="hover:text-[#f29260] transition-all flex items-center"
          href="https://github.com/JohnsonKamanga">
            <FontAwesomeIcon icon={faGithub}/>
            <span className="hidden md:block ml-1 text-xs">JohnsonKamanga
            </span>
          </a>
        </div>
      </div>
      <div className="mx-1 flex flex-col items-end md:w-full font-[350]">
        <div
        className="font-medium"
        >
            Attributions</div>
        <NavLink to="/Attributions">
        <span className="hover:text-[#f29260] text-xs transition-all flex items-center"
        >
            Full List
            </span>
        </NavLink>
      </div>
    </div>
  );
}
