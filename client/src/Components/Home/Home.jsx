import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards"







export default function Home(){
    
    

    return(
        <div className="Home">
            <div className="NavBar">
            <NavBar/>
            </div>
            <div className="Cards">
            <Cards/>
            </div>
            

        </div>
    )
}