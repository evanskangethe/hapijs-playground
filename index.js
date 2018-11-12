'use strict';

const hapi = require('hapi')
const log = console.log

//server config
const server = hapi.server({
    host: '127.0.0.1',
    port: 4000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request,h) => {
        return 'Hallo World!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request,h) => {
        request.logger.info('In handler %s',request.path)
        return `Hello ${encodeURIComponent(request.params.name)}`
    }
});

server.route({
    mathod: 'GET',
    path: '/index',
    handler: (request,h) => {
        return h.file('./index.html');
    }
})

const init = async ()=>{

    await server.register(require('inert'));
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response','onPostStart']
        }
    })

    await server.start();
    log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection',(err)=>{
    log(err);
    process.exit(1)
})

init();
