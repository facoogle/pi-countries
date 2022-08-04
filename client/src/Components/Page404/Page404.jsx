import React from "react";
import "./Page404.css"
import img from "../Page404/404.webp"
import { Link } from "react-router-dom";

export default function Page404(){
    return(
        <div className="Page404">
            <h2>ME PARECE QUE ESTA RUTA NO EXISTE</h2>
            <img src={img} alt="" />
            <h1>404</h1>
            <Link to ='/home'>
                <button className='LandingButton'> IR A HOME </button>
            </Link>
        </div>
    )
}