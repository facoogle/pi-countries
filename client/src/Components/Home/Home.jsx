import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards"
import Footer from "../Footer/Footer";






export default function Home(){
    
    

    return(
        <div className="Home">
            <div className="NavBar">
            <NavBar/>
            </div>
            <div className="Cards">
            <Cards/>
            </div>
            <div className="footer">
                <Footer/>
            </div>

        </div>
    )
}