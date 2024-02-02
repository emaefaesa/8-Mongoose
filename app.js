let express = require('express')
let mongoose = require('mongoose')
let app = express()
let PORT = process.env.PORT || 3000

let { disco, artista } = require('./schemas')
const e = require('express')


mongoose.connect('mongodb://localhost:27017/tienda_discos')
    .then(console.log('Mongoose conectado!'))
    .catch((e) => console.log('Mongoose NO conectado xiki!: ' + e))

////////////////////////


/* let disco1 = new disco({
    _id: new mongoose.Types.ObjectId(),
    titulo: 'Obsidian',
    artista: 'Naomi Sharon',
    año: 2023,
    genero: 'R&B',
    stock: 300,
    formato: 'digital'
})


let disco2 = new disco({
    _id: new mongoose.Types.ObjectId(),
    titulo: 'DJESSE - Vol.1',
    artista: 'Jacob Collier',
    año: 2018,
    genero: 'Rhythm and blues contemporáneo',
    stock: 0,
    formato: 'digital'
}) */


disco1.save().then(console.log("Disco1 añadido")).catch(e => console.error("No se ha podido añadir a " + e))

disco2.save().then(console.log("Disco2 añadido")).catch(e => console.error("No se ha podido añadir a " + e))

///////Recibir la lista entera de discos en stock////////

app.get('/discos', async (req, res) => {
    try {
        let results = await Disco.find({ stock: { $gt: 0 } });
        results.lenght > 0
            ? res.send({ mensaje: "Aquí tienes!", results })
            : res.send({ mensaje: "No hay stock sabes? Pero todo bien", results });
    } catch (error) {
        res.send({mensaje: "Error xiki!: " + error});
    }
});

///////Recibir un disco en concreto que se pueda buscar por título o id////////

app.get('/discos/:idTitulo', async (req, res) => {
    try {
        let disco = await Disco.find({
            $or: [
                { titulo: req.params.idTitulo },
                { _id: req.params.idTitulo }
            ]
        }).populate('artista');

        results.lenght > 0
            ? res.send({ mensaje: "Aquí tienes!", results })
            : res.send({ mensaje: "No hay stock sabes? Pero todo bien", results });

    } catch (error) {
        res.status(500).json({ message: "Error xiki" });
    }
});

///////Añadir un disco a la base de datos, los campos marcados con asterisco son obligatorios.////////

app.post('/disco', async (req, res) => {
    try {
        const results = await Disco.create(req.body)
        results
            ? res.send({ mensaje: "Aquí tienes!", results })
            : res.send({ mensaje: "No hay stock sabes? Pero todo bien", results })

    } catch (error) {
        res.send({ mensaje: "No se ha podido hacer:" + error })
    }
})

///////Añadir un artista a la base de datos, los campos marcados con asterisco son obligatorios.////////




app.post('/artista', async (req, res) => {
    try {
        let { nombre, genero, fechaDeNacimiento, nacionalidad, nombreArtistico }
        const results = await Disco.create({ nombre, genero, fechaDeNacimiento, nacionalidad, nombreArtistico })
        results
            ? res.send({ mensaje: "Aquí tienes!", results })
            : res.send({ mensaje: "No hay stock sabes? Pero todo bien", results });

    } catch (error) {
        res.send({ mensaje: "No se ha podido hacer:" + error })
    }
})


////////Actualiza la información de un disco o de un artista///////


app.put('/disco/:id', async (req,res)=>{
    try {
        const results = await Disco.findByIdAndUpdate(req.params.id, req.body, {new: true})
        results 
        ? res.send({mensaje: "Disco actualizado", results})
        : res.send({mensaje: "El disco no ha podido encontrarse", results})
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
 }, )


 app.put('/artista/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndUpdate(req.params.id, req.body, { new: true })
        results
            ? res.send({ mensaje: "Artista actualizado", results })
            : res.send({ mensaje: "El artista no ha podido encontrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)

////////Borrar un disco de almacen///////

app.delete('/disco/:id', async (req, res) => {
    try {
        const results = await Disco.findByIdAndDelete(req.params.id)
        results
            ? res.send({ mensaje: "Disco borrado", results })
            : res.send({ mensaje: "El disco no ha podido borrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)


////////Borra un artista de la base de datos///////


app.delete('/artista/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndDelete(req.params.id)
        results
            ? res.send({ mensaje: "Artista eliminau", results })
            : res.send({ mensaje: "El artista no ha podido borrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)


////////

app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error('No hay servidor xiki')
        : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))
})
