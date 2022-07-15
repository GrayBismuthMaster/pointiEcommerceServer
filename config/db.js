const mongoose = require('mongoose')
require('dotenv').config({path: 'Variables.env'});

const conectarDB = async () =>{
    try {
        //Los parametros pasados luego de env son para evitar errores
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });
        console.log("db conectada")
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;