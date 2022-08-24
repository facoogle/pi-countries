
import { GET_COUNTRIES, SEARCH_COUNTRY, POST_ACTIVITIES, GET_DETALLES, GET_ACTIVITIES, ASCENDENTE, ORDEN_NOMBRE, ORDEN_POBLACION, POBLACION_MAYOR, FILTER_ACTIVITY, NAME_COUNTRY, FILTER_CONTINENTE } from "../const/const";

const initialState = {
    countries: [],
    filteredCountry: [],
    countrySearch:[],
    detalles:[],
    activities:[]

     
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountry:action.payload
                
            }
        case SEARCH_COUNTRY:
            return{
                
                
                filteredCountry:action.payload
                
            }

            case NAME_COUNTRY:
            return {
                ...state,
                filteredCountry: action.payload
            }

        case POST_ACTIVITIES:
            return {
                ...state
            }

        case GET_DETALLES:
            return {
                ...state,
                detalles: action.payload,
                
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                
            }

            //////////////// ORDEN////////////////
        case ORDEN_NOMBRE:
                let orden = action.payload === ASCENDENTE ? state.filteredCountry.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }) :
                    state.filteredCountry.sort((a, b) => {
                        if (a.name < b.name) {
                            return 1;
                        }
                        if (a.name > b.name) {
                            return -1;
                        }
                        return 0;
                    })
    
                return {
                    ...state,
                    filteredCountry: orden
                }

        case ORDEN_POBLACION:
            // eslint-disable-next-line
            let ordenPoblacion = action.payload === POBLACION_MAYOR ? state.filteredCountry.sort((a, b)=>{
                
                if (a.poblacion < b.poblacion) {
                    return 1;
                }
                if(a.poblacion > b.poblacion) {
                    return -1;
                }

            }) :
                state.filteredCountry.sort((a, b) => {

                    if (a.poblacion < b.poblacion) {
                        return -1;
                    }
                    if (a.poblacion > b.poblacion) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                filteredCountry: ordenPoblacion
            }





        case FILTER_ACTIVITY:
            let selected = action.payload === 'ninguna' ? state.countries :
            state.countries.filter(c => c.activities.map(a => a.nombre).includes(action.payload))
            return{
                ...state,
                filteredCountry: selected
                }






        case FILTER_CONTINENTE:
            return{
                ...state,
                filteredCountry:action.payload === "all"? state.countries: state.countries.filter(r => action.payload === r.continente) 
            }

       

        

                
            
        default:
            return state;
    }
}