const mongoose = require('mongoose')
const chalk = require('chalk')
const {URL} = require('./props')
const log = console.log

const connected = chalk.bold.blue
const error = chalk.bold.red
const terminated = chalk.bold.yellow
const disconnected= chalk.bold.cyan

module.exports = function(){
    mongoose.connect(URL,{useNewUrlParser:true,autoIndex:false})
    
    const db = mongoose.connection
    
    db.on('error',(err)=> { log(error(`Mongoose default connection ${err} error`))})
    
    db.on('connected',()=>{ log(connected(`mongoose default connection is open at ${URL}`))})
    
    db.on('disconnected',()=>{ log(disconnected(`mongoose dafault connection is closed at ${URL}`))})
    
    process.on('SIGINT',()=>{
        db.close(()=>{
            log(terminated(`Mongoose default connection terminated by user`))
            process.exit(0)
        })
    })
}
