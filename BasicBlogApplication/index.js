const express = require('express');
const app = express();
const fs = require('fs')
const http = require('http')
const cors = require('cors');

const mongoose = require('mongoose')
const appConfig = require('./config/config');
mongoose.set('useCreateIndex',true)
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require("./middlewares/routeLogger");

//const cookieParser = require('cookie-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());
app.use(routeLoggerMiddleware.routeLogger);
//const blogRoute = require('./routes/blog');
//app.use('/',blogRoute);

const helmet = require('helmet')
const logger = require('./libs/loggerLib')



//app.use(cookieParser())

app.use(errorHandler.globalErrorHandler)

app.use(helmet())
let routesPath = './routes'

let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) 
    require(modelsPath+'/'+file)
    console.log(modelsPath +'/'+file)
})


fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        console.log(routesPath +'/'+file)
        let route = require(routesPath +'/'+file)
        //app.use('/',route.setRouter);
        route.setRouter(app);
    }
})

app.use(errorHandler.notFoundHandler)



const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})

/*app.listen(appConfig.port,()=>{
    console.log(`Example app listening on port ${appConfig.port}`);

    let db = mongoose.connect(appConfig.db.uri,  { useNewUrlParser: true });
}

);*/

mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err);
})

mongoose.connection.on('open', function(err){
    if(err){
        console.log('database err');
    }
    else{
        console.log('Database connection successfull')
    }
})