import React from "react";
import "./NavBar.css"

import { Link } from "react-router-dom";


export default function NavBar(){
    
    return(

        <div className="NavBar">
        <div className="NavBarName">PAISES-ACTIVIDADES</div>
        <div className="NavContent">
        <a href="/home/" className='NavLink'>Home</a>
        
        <Link className='NavLink' to='/activity'>Crear actividad</Link>
        </div>
        
        </div>
    )
}