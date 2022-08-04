import React from "react";
import "./Paginado.css"

export default function Paginado({countriesPerPage, countries, paginado}){
    const pageNumbrers = []
    
    console.log("asdadsadas " + countriesPerPage)
   
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) {
        
        pageNumbrers.push(i)
    }
    return(
        <nav className='Paginado'>
            
                
            <ul className ='ul'>
                {pageNumbrers && 
                pageNumbrers.map(number =>(
                    <li className ='PaginadoNum' key={number}>
                        
                        <a  href onClick={()=>paginado(number)}> {number} </a>  
                    </li> 
                    
                ))}
                
            </ul>
            
        </nav>
    )
}