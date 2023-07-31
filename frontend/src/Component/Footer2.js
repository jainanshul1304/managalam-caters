import React from "react";

import playstore from "../image/mangalam.jpg";
import shef from "../image/shef1.png";
import insta from "../image/insta3.jpeg";
import whatsapp from "../image/whatsapp.jpeg";
import phone from "../image/phone.png";
import mgf from "../image/mgficon.jpeg";
import Footer from "./Footer.css";

const Footer2 = () => {
    return (
        <div id="footer">
            <div class="container text-center">
                <div class="row ">
                    <div className="col-md-4" id="leftfooter">
                        <h3>Dowled our app</h3>
                        <p>For getting latest notifications sndkjfier nfkjeiug snfkjeiugh ekjgiuerh </p>
                        <img src={playstore} alt="mangalma caters"/>
                    </div>
                    <div className="col-md-4" id="rightfooter">
                       <h3 >Mangalam Caters</h3>
                       <p>High quality is our first priority</p>
                       <div>
                        <p><img src={mgf} alt="icon"/>since 2001</p>
                       </div>
                    </div>
                    <div className="col-md-4" id="midfooter">
                        <h3>Social Media Handels </h3>
                        <p><img src={insta} class="" alt="insta" /> <a href="https://instagram.com/rahulagarwal90474?igshid=ZDdkNTZiNTM=">Instagram</a></p>
                        <p><img src={whatsapp} alt="insta" /><a href="https://www.instagram.com/"> whatsapp</a></p>
                        
                        <p><img src={phone} alt="phone" /><a href="https://www.instagram.com/">8949470133</a></p>
                    </div>
                    
                </div>
            </div>
        </div>
       
    )
}
export default Footer2;