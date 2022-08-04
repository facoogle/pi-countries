import React from "react";
import "./Detalles.css"
import { useParams} from "react-router-dom"
import NavBar from "../NavBar/NavBar";
import {useDispatch,useSelector} from "react-redux"
import {getDetalles } from "../../actions/actions"
import { useEffect } from "react";


export default function Detalles(){

    const dispatch = useDispatch()
    const { ID } = useParams();
    const detalles = useSelector((state)=> state.detalles)
    
    

    useEffect(()=>{
        
        dispatch(getDetalles(ID))
        
         console.log('useEffect called');
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    
    
    console.log(detalles)
    

return(
    <div >
        <NavBar/>
    <div  className='Detalles' >{
        detalles.id ? 
            <div className='DetallesCard'>
                <h2>{detalles.id}</h2>
                <h1 className=''>{detalles.name}</h1>
                <img className='DetallesImage' src={detalles.img} alt='Imagen no encontrada' />
                <h3>Continente: {detalles.continente}</h3>
                <h3>Capital: {detalles.capital}</h3>
                <h3>Subregion: {detalles.subregion}</h3>
                <h3>Area: {detalles.area} Km2</h3>
                <h3>Poblacion: {detalles.poblacion}</h3>
                <div className="ContainerCardsActivities">{
                    detalles.activities.length?
                    (<h1>ACTIVIDADES CREADAS</h1>):(<h1>SIN ACTIVIDADES</h1>)
                }
                <div className="CardsActivities">
                {detalles.activities?.map((el)=>
                
                   
                    <div key={el.id} className="MiniCardActivity">
                    <div className="one"> Nombre: {el.nombre} </div>
                    <div className="one"> Dificultad {el.dificultad} de 5 </div>
                    <div className="one"> Duracion {el.duracion} horas </div>
                    <div className="one"> Temporada {el.temporada} </div>
                    </div>
                    
                )}
                </div>
                </div>
                


            </div> :  <div className='loading'>
              <p> Loading... </p>
              </div>
              
    }</div></div>
)

}