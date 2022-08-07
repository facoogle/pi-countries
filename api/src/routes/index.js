const { Router } = require('express');
const {Country, Activity} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApi } = require('../conexion/conect.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
    const {name} = req.query
    let countriesTotal = await Country.findAll({
        include: Activity
    });
    if (name) {
        let countryName = await countriesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
            res.status(200).send(countryName) :
            res.status(404).send('No esta ese pais');
    } else {
        res.status(200).send(countriesTotal);
    }
})


router.get('/countries/:id', async (req,res,next)=>{
    const {id} = req.params;
    let aux = id.toUpperCase()  //a mayus ya que los id son todos en mayus
    try{
    const countryId = await Country.findByPk(aux, {
        include: Activity
    })

    res.send(countryId)

    }catch(err){
        next(err)
    }
})





router.post('/activities', async (req,res,next)=>{
    const {nombre,dificultad,duracion,temporada,countryId} = req.body
    
    try {

        const CreateActivity = await Activity.create({
            nombre,dificultad,duracion,temporada,countryId
        })
        const countries = await Country.findAll({  // de todos los Country, traeme el que sea ID "ARG" ej
            where:{
                id: countryId
            }
        })
    
        CreateActivity.addCountry(countries) //addCountries = mix add Countries con mayus.. "C"
        
    
        res.status(200).send(CreateActivity)
        
    } catch (err) {
        next(err)
    }
    
})


router.get('/activities', async (req, res, next) => {

    try {
        const activities = await Activity.findAll({
            
            include: Country,
           
            
        })
        if(activities.length){
            res.status(200).send(activities)
        }
        else
    
    res.status(400).send("No hay actividad creada")

    } catch (error) {
        next(error)
    }
})














module.exports = router;
