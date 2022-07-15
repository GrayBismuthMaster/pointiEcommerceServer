const {ApolloServer} = require('apollo-server')
//Requerimos el jwt y el dotenv
const jwt = require('jsonwebtoken')
require('dotenv').config({path:'Variables.env'});
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const conectarDB = require('./config/db')

//Conectar a la base de datos
conectarDB();
//Servidor 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //El context funciona en todos los resolvers
    context: ({req}) =>{
        console.log(req.headers)
        const token = req.headers['authorization'] || '';
        if(token){
            try {
                const usuario = jwt.verify(token.replace('Bearer ',''),process.env.SECRETA)
                //console.log(usuario)
                return {
                    usuario
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})
 
//Arrancar el servidor
//El then har'a un promise
server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})