import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"


export default function LandingPage(){
    return(
        <div className="LandingPage">
            <div className="LandingContainer">
            <h1 className = 'LandingTitle'> Bienvenidos a Paises y Actividades </h1>
            <Link to ='/home'>
                <button className='LandingButton'> INGRESAR </button>
            </Link>
            </div>
        </div>
    )
}