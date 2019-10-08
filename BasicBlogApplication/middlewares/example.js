let exampleMiddleware = (req, res, next) => {
    req.user = { 'firstName':'Syed','HINt':'MASSSSS'}
    next();
}

module.exports = {
    exampleMiddleware: exampleMiddleware
}