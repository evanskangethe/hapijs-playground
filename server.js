'use strict';

//require
const hapi = require('hapi')
const db = require('./config/db')
const routes = require('./mvc/routes')
const {PORT}= require('./config/props')

const server = hapi.server({
    host: '127.0.0.1',
    port: PORT
});

routes(server);
db()

const init = async () => {
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents:['onPostStart','response']
        }
    })
    server.start();
    console.log(`server running at ${server.info.uri}`)
    
}

process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
})

init();
