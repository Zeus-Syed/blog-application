const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib')
let errorHandler = (err, req, res, next) => {
    //console.log("application error handler called")
   // console.log(err)
    logger.error(err.message, 'appErrorHandler-->notFoundHandler',7)
    let apiResponse = response.generate(true,"application error handler called",500,null);
            res.send(apiResponse);
}
let notFoundHandler = (req, res, next) => {
    //console.log("Application route not found")
    logger.info('Application route not found','appErrorHandler-->notFoundHandler',5);
    let apiResponse = response.generate(true,"Application route not found",404,null);
            res.send(apiResponse)
}

module.exports= {
    globalErrorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}