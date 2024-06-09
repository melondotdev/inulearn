import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import Logo from '../assets/logo2.png';

const Navbar = () => {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar);
  
  return (
    <div className="navbar flex justify-between items-center h-24 font-anton z-50 mt-3 px-4 text-4xl relative">
      <div className="navbar-left h-full flex justify-start items-center top-0 bottom-0 pt-1">
        <Link to="/" className="navbar-logo flex items-center">
          <img src={Logo} alt='inutech' className="w-16"></img>
          <p className="drop-shadow-md ml-2">Inu <span className='text-inu_peach'>Learn</span></p>
        </Link>
      </div>
      <div className="navbar-right h-full flex justify-start items-center top-0 bottom-0 pt-1">
        <Link to="login">
          <button className="py-1 px-4 border-2 border-white rounded-3xl text-2xl hover:bg-inu_darkorange ease-in-out duration-300 mr-2">Login</button>
        </Link>
        <Link to="#" className={`menu-bars ${sidebar ? "opacity-0" : "opacity-100"} mx-4 bg-transparent hover:text-inu_darkorange ease-in-out duration-300`}>
          <FaIcons.FaBars onClick={showSidebar} className="drop-shadow-md" />
        </Link>
      </div>
      <div className={`nav-menu bg-inu_darkorange w-20 h-full fixed flex flex-col justify-between items-center top-0 pt-8 px-8 ${sidebar ? "right-0 duration-300" : "-right-full duration-300"}`}>
        <div className="nav-menu-top flex flex-col items-center">
          <Link
            to="#"
            className="nav-menu-item w-full p-4 ease-in-out duration-300 hover:text-inu_lightorange"
            onClick={showSidebar}
          >
            <AiIcons.AiOutlineClose />
          </Link>
          <Link
            to="/"
            className="nav-menu-item w-full p-4 ease-in-out duration-300 hover:text-inu_lightorange"
            style={{ color: location.pathname === "/" ? "#FED08E" : "" }}
            data-tooltip-id="home"
            data-tooltip-content="Home"
          >
            <IoIcons.IoHomeOutline />
          </Link>
        </div>
        <div className="nav-menu-bottom flex flex-col items-center mb-8">
          <a
            href="https://x.com/inutech_canada"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-menu-item w-full p-4 ease-in-out duration-300 hover:text-inu_lightorange"
          >
            <RiIcons.RiTwitterXLine />
          </a>
          <a
            href="https://discord.gg/cPxQHBfDwj"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-menu-item w-full p-4 ease-in-out duration-300 hover:text-inu_lightorange"
          >
            <RiIcons.RiDiscordLine />
          </a>
        </div>
        <Tooltip id="home" className='text-3xl'/>
        <Tooltip id="mail" className='text-3xl'/>
        <Tooltip id="about" className='text-3xl'/>
        <Tooltip id="lore" className='text-3xl'/>
        <Tooltip id="lancer" className='text-3xl'/>
      </div>
    </div>
  );
};

export default Navbar;
