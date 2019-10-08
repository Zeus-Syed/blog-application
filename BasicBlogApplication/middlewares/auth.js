

const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')

let isAuthenticated = (req, res, next) => {

    if(req.params.authToken || req.query.authToken || req.header('authToken')){

        if(req.params.authToken == "Admin" || req.query.authToken == "Admin" || req.header('authToken') == "Admin"){
    req.user = {fullName:'Admin',userId:'Admin'}
    next();
        }
        else{
            logger.error('Incorect Authentication Information','Authentication Middleware',5)
            let apiResponse = response.generate(true,' Wrong Authentication token',500,null)
            res.send(apiResponse)
        }
    }
    else{
        logger.error('Authenticaton Token Missing','Authentication Middleware',5)
        let apiResponse = response.generate(true,'Authenticatio token is missing',404,null)
        res.send(apiResponse)
    }
}

module.exports = {
    isAuthenticated : isAuthenticated
}