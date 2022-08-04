import React from "react"
import './Card.css'

export default function Card({name, img, continente, capital, poblacion, id}) {
  return (
  <div className='cardContainer' id={id}>
      <h3>{name}</h3>
      <img className= 'cardImg'src={img} alt='Imagen no encontrada'/>
      <div className='infoConteiner'>
      <h5 className='content'>Capital: {capital}</h5>
      <h5 className='content'>Continente: {continente}</h5>
      <h5 className='content'>Poblacion: {poblacion}</h5>
      </div>
  </div>
  )

};
