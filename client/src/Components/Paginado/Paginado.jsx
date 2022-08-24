import React from "react";
import "./Paginado.css"
import { useState } from "react";

export default function Paginado({countriesPerPage, countries, paginado, currentPage}){
    const pageNumbrers = []
    const [paginadoCss, setPaginadoCss] = useState("PaginadoNum")
    
    
   
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) {
        
        pageNumbrers.push(i)
    }
    return(
        <nav className='Paginado'>
            <button disabled ={currentPage<=1} onClick={()=> paginado(currentPage -1) }>Back</button>
                
            <ul className ='ul'>
                {pageNumbrers && 
                pageNumbrers.map(number =>(
                    
                    <li className ={currentPage==number?paginadoCss:"PaginadoNum2"} key={number}>
                        
                        <a  href onClick={()=>paginado(number)}> {number}</a>  
                    </li> 
                    
                ))}
                
            </ul>
            <button disabled={pageNumbrers.length < currentPage+1?true:false} onClick={()=>paginado(currentPage + 1)}>Next</button>
        </nav>
    )
}