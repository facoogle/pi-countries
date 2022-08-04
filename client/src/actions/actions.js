import axios from "axios"
import {  GET_COUNTRIES, GET_ACTIVITIES, POST_ACTIVITIES, GET_DETALLES, ORDEN_NOMBRE, ORDEN_POBLACION, FILTER_ACTIVITY, NAME_COUNTRY, FILTER_CONTINENTE } from '../const/const.js'





 export function getCountries() {
     return async function (dispatch) {
         try {
             let json = await axios.get('/countries')
             return dispatch({
                 type: GET_COUNTRIES,
                 payload: json.data
                
             });
         } catch (error) {
             console.log(error)
         }
     }
    
 }


 






export function countryByName(name){
    return async function(dispatch){
        try{
            let json = await axios.get('/countries?name='+name)
            return dispatch({
                type:NAME_COUNTRY,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    }




export function getActivities() {
    return async function (dispatch) {
        try {
            let json = await axios.get('/activities');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        } catch (error) {
            alert('No hay actividades')
            console.log(error)
        }
    }
}

export function postActivities(payload) {
    return async function (dispatch) {
        await axios.post('/activities', payload);
        return dispatch({
            type: POST_ACTIVITIES,
        })
    }
}


export function getDetalles(id){
    return async function(dispatch){
        try {
            let json = await axios.get("/countries/"+id)
            return dispatch({
                type: GET_DETALLES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

/////////////////////ORDENADO/////////////////
export function ordenPorNombre(payload) {
    return {
        type: ORDEN_NOMBRE,
        payload
    }
}

export function ordenPorPoblacion(payload) {
    return {
        type: ORDEN_POBLACION,
        payload
    }
}



export function filterByActivity(activity){
    return {
        type: FILTER_ACTIVITY,
        payload: activity,
    }
}


export function filtrarPorContinente(continente){
    return {
        type: FILTER_CONTINENTE,
        payload: continente,
    }
}









