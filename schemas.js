let mongoose = require('mongoose')


//ESQUEMA DISCO//
const discoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: {type: String, required: true},
    artista: {type: mongoose.Schema.Types.ObjectId, ref: 'artista' required: [true, 'Artista es un requisito xiki!']},
    año: {type: Number, required: true},
    género: String,
    stock: { type: Number, required: true },
    formato: String,
});

//ESQUEMA ARTISTA//
const artistaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {type: String, required: true },
  género: String,
  fechaNacimiento: Date,
  nacionalidad: { type: String, required: true },
  nombreArtistico: String,
});


///MODELOS//
let Disco = mongoose.model('disco', discoSchema);
let Artista = mongoose.model('artista', artistaSchema);


module.exports = {disco, artista}