const {Country, Activity} = require('../db')
const axios = require('axios');





async function getApi(){
    const CountriesAll = await Country.findAll()
    if(!CountriesAll.length){
    const apiAll = await axios.get('https://restcountries.com/v3/all') //apiAll.data <= .data .data
    const apiInfo = await apiAll.data.map((el)=>{
        return {
            id: el.cca3,
            name: el.name.common,
            img: el.flags[0],
            continente: el.continents[0],
            capital: el.capital? el.capital[0] : "No hay capital",  // hay 5 paises sin capital
            subregion: el.subregion,
            area: el.area,
            poblacion: el.population,

        }
        
    })

    await Country.bulkCreate(apiInfo);     
} 

  
}

module.exports = { getApi };