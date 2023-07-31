import React from "react";
import { ReactNavbar } from "overlay-navbar";
//import logo from "../image/"
//import {FaUserAlt} from "react-icons/fa" ;
import logo from "../image/shef1.png"
//import CartIconElement from "../image/Untitled.jpeg"


const Header = () => {
    return <ReactNavbar
        burgerColor="gray"
        
        burgerColorHover="brown"

        logo={logo}
        logoWidth="100px"

        navColor1="gray"
        logoHoverSize="10px"
        logoHoverColor="yellow"

        link1Text="Home"
        link2Text="Products"
        link3Text="About"
        link4Text="Login_Reg"
        link1Url="/"
        link2Url="/products"
        link3Url="/About"
        link4Url="/Login_Reg"
        link1Size="1.3vmax"
        link1Color="black"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="yellow"
        link1Margin="1vmax"
        //CartIconElement={CartIconElement}
        profileIconColor="green"
        searchIconColor="white"
        cartIconColor="pink"
        profileIconColorHover="gray"
        searchIconColorHover="gray"
        cartIconColorHover="gray"
        cartIconMargin="1vmax"
    // profileIconElement={FaUserAlt}
    //profileIcon={true}

    />

}
export default Header;