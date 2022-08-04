import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCountries, getActivities, ordenPorNombre, ordenPorPoblacion , filterByActivity, countryByName, 
  filtrarPorContinente } from "../../actions/actions";




import Paginado from "../Paginado/Paginado";

import { ASCENDENTE, DESCENDENTE, POBLACION_MAYOR, POBLACION_MENOR,  
  EUROPA, NORTE_AMERICA, SUD_AMERICA, ASIA, AFRICA, OCEANIA, ANTARTIDA } from "../../const/const";



import Card from "../Card/Card";
import "./Cards.css";

export default function Cards() {
  const dispatch = useDispatch();
  
  const countries = useSelector((state) => state.filteredCountry);
  const activities = useSelector((state) => state.activities);

  
  
  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities());
    
  }, [dispatch]);
  


//////// SEARCH//////////////////////////////////

  const [inputSearchBar, setInputSearchBar] = useState('')

  function onSubmitSearchbar(e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(countryByName(inputSearchBar))
    setInputSearchBar('')
  }
  
  
  function onInputChangeSearchbar(e){
      e.preventDefault();
      setInputSearchBar(e.target.value)
  }





 
  /////////////////PAGINADO///////////////////
  const [currentPage, setCurrentPage] = useState(1);  //act
  const [countriesPerPage] = useState(10)
  const lastCountry = currentPage * countriesPerPage ;  // 1 10
  const firstCountry = lastCountry - countriesPerPage; // 10 - 10 .. 0
  const currentCountry = countries.slice(firstCountry, lastCountry);   
  const [, setOrden] = useState("");
 

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };
////////////////////ORDENADO///////////////////////////



function handleSort(e) {
  e.preventDefault();
  
  dispatch(ordenPorNombre(e.target.value));                 // A - Z 
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`);
}


function handleSortPoblacion(e) {
  e.preventDefault();
  dispatch(ordenPorPoblacion(e.target.value));
  setCurrentPage(1);                                            //  1-2 2-1
  setOrden(`Ordenado ${e.target.value}`);
}


function handleSelectActivity(e){
  setCurrentPage(1)
  dispatch(filterByActivity(e.target.value))
}                                                                     // Activity

let oneActivity = activities.map(item=>{
  return [item.nombre,item]});
let activitiesMapArr = new Map(oneActivity); // Pares de clave y valor       REVISAR
let oneActivityPerName = [...activitiesMapArr.values()]; // Conversión a un array
console.log("SOY" +activitiesMapArr)

function handleSelectContinente(e){
  e.preventDefault()
  setCurrentPage(1)
  dispatch(filtrarPorContinente(e.target.value))
}





//////////////////////////////////////////////////////

  


  return (
    
    
    
    <div className="">
      
    <div className="Opciones">
      <div className="OrdenRegion">
      <p>Filtra por Continente</p>
        <select name='continente' onChange={handleSelectContinente}>
            <option hidden={true}>Select REGION</option>
            <option value='all'>ALL REGIONS</option>
            <option value={EUROPA}>EUROPA</option>
            <option value={ASIA}>ASIA</option>
            <option value={NORTE_AMERICA}>NORTE AMERICA</option>
            <option value={SUD_AMERICA}>SUDAMERICA</option>
            <option value={OCEANIA}>OCEANIA</option>
            <option value={AFRICA}>AFRICA</option>
            <option value={ANTARTIDA}>ANTARTIDA</option>
        
            
        </select>
        </div>

    


    <div className="Search">
    <p>Busca un pais</p>
      <form onSubmit={onSubmitSearchbar}>
            <input type="text" onChange={onInputChangeSearchbar} value={inputSearchBar}/>
            <input className="{button}" type="submit" value="Buscar Pais"/>
        </form>
    </div>



    <div className="OrdenAlfabetico">
    <p>Ordenar alfabeticamente</p>
      <select className='ordenPorNombre'
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value={ASCENDENTE}> A-Z </option>
          <option value={DESCENDENTE}> Z-A </option>
        </select>
    </div>




        <div className="OrdenPoblacion">
        <p>Ordenar por Poblacion</p>
    <select className=''
          onChange={(e) => {
            handleSortPoblacion(e);
          }}
        >
          <option value={POBLACION_MAYOR}>Mayor</option>
          <option value={POBLACION_MENOR}>Menor</option>
          
        </select>
        </div>
    

        
        <div className="OrdenActividades">
        <p>Ordenar por Actividad</p>
        <select name='activities' onChange={handleSelectActivity}>
            <option value="ninguna">Filtrar por Actividades</option>
            {oneActivityPerName.length?
            oneActivityPerName.map( el => {return <option key={el.id}>{el.nombre}</option>} ) : 
            <option disabled>No hay actividades creadas</option>}        
        </select>
        </div>
</div>





      <div className='cardsBox'>  

        {
        currentCountry?.map((country) => {
            
          return (
            <div key={country.id}>
              <a href={"/home/" + country.id}  className="Links" >
                <Card
                  name={country.name}
                  img={country.img}
                  continente={country.continente}
                  capital={country.capital}
                  poblacion={country.poblacion}
                  
                />
                </a>

                
            </div>
          )  
        })}
        
        
        
        <Paginado
        
        countriesPerPage={countriesPerPage}
        countries={countries.length}
        paginado={paginado}
        
        
      />
      </div>
      
    </div>
    
  );
}