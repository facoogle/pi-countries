import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postActivities, getActivities, getCountries } from "../../actions/actions";
import { INVIERNO, VERANO, OTOÑO, PRIMAVERA } from "../../const/const";
import NavBar from "../NavBar/NavBar";
import "./ActivityCreate.css";

function validate(input) {
  let errors = {};
  if (!input.nombre) {
    errors.nombre = "Debes crear un nombre";
    
  }
  else if (!input.duracion) {
    errors.duracion = "Tienes que agregar una duracion";
  } else if (isNaN(input.duracion)) {
    errors.duracion = "Solo se permiten numeros";
  }
  else if (!input.dificultad) {
    errors.dificultad = "Tienes que agregar una duracion";
    // eslint-disable-next-line
  } else if (!input.temporada || input.temporada == "Temporada") {
    errors.temporada = "Selecciona una temporada";
  } else if (input.countryId === []) {
    errors.countryId = "Tienes que seleccionar un pais";
  }
  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  
  const countries = useSelector((state) => state.countries);
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    nombre: "",
    duracion: "",
    dificultad: "",
    temporada: "",
    countryId: [],
  });

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getCountries())
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // por name le paso valor
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(i) {
    setInput({
      ...input,
      countryId: input.countryId.filter((el) => el !== i),
    });
  }

  function handleSelect(e) {
    setInput({ ...input, countryId:[...input.countryId, e.target.value] });  // no agrega 2
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.nombre === "" ||
    input.duracion === "" || isNaN(input.duracion) ||
    input.dificultad === "" || input.dificultad > 5 || input.dificultad < 1 ||
    input.temporada === "" || input.temporada === "Temporada"||
    input.countryId.length === 0) return alert('Los campos no se completaron correctamente');
    dispatch(postActivities(input));
    
    setInput({
      nombre: "",
      duracion: "",
      dificultad: "",
      temporada: "",
      countryId: [],
    });

    alert("Se creo tu actividad correctamente");
    
  }
  

  return (
    <div className="ContainerCreate">
      <div>
        <NavBar />
      </div>

      <div className="CreateActivity">
        <div className="CreateCard">
          <div className="CreateTitl">
          </div>  

          <form className="CreateForm" onSubmit={handleSubmit}>
            <span className='TituloCrear'> Crea una Actividad </span>
            <div className="inputActivities">
              <label className='labelActivity'></label>
              <input
                className="linea"
                type="text"
                placeholder="Nombre de la actividad.."
                value={input.nombre}
                name="nombre"
                onChange={handleChange}
              />
              {errors.nombre && <p className="Error">{errors.nombre}</p>}
            </div>
            <div className="inputActivities">
              <label>Duracion</label>
              <input
                className="linea"
                type="text"
                value={input.duracion}
                name="duracion"
                placeholder="Duracion.."
                onChange={handleChange}
              />
              {errors.duracion && <p className="Error">{errors.duracion}</p>}
            </div>
            <div className="inputActivities">
              <p>Dificultad</p>
              <label>1<input className="linea" type="radio" name="dificultad" value="1" onChange={handleChange}/></label>
              <label>2<input className="linea" type="radio" name="dificultad" value="2" onChange={handleChange}/></label>
              <label>3<input className="linea" type="radio" name="dificultad" value="3" onChange={handleChange}/></label>
              <label>4<input className="linea" type="radio" name="dificultad" value="4" onChange={handleChange}/></label>
              <label>5<input className="linea" type="radio" name="dificultad" value="5" onChange={handleChange}/></label>
              {errors.dificultad && <p className="Error"> {errors.dificultad}</p>}
            </div>
            <div className="seasonInput">
            <label>Selecciona una temporada</label>
              <select
                className="linea"
                name="temporada"
                value={input.temporada}
                onChange={(e) => handleChange(e)}
              >
                <option className='op' >Temporada</option>
                <option className='op' value={INVIERNO}>Invierno</option>
                <option className='op' value={VERANO}>Verano</option>
                <option className='op' value={OTOÑO}>Otoño</option>
                <option className='op' value={PRIMAVERA}>Primavera</option>
              </select>
              {errors.temporada && <p className="Error">{errors.temporada}</p>}
            </div>
            {errors.countryId && <p className="Error">{errors.countryId}</p>}

            <div>
            <label>Selecciona un pais</label>
              <select  className="linea" onChange={(e) => handleSelect(e)}>
                
                <option disabled="true" className='op' > Selecciona un pais </option>
                {countries.map((v) => (
                  
                  <option className='op' value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="textArea">
              {input.countryId.map((country) => (
                <div className='countrieAndButton'>
                  <input className='BotonBorrar' type='button' value='Eliminar' onClick={() => handleDelete(country)}/>
                  {/*eslint-disable-next-line */}
                  {countries.map((el)=> (el.id===country)?(<div><p>{el.name}</p><img src={el.img} width="55px" height="35px"/></div>):(<div></div>))}
                  
                </div>
                
              ))}
            </div>
            <div>
              <button className='btnActivity' type="submit">Crear Actividad</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
