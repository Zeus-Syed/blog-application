const express = require('express')

let setRouter = (app) =>{
let helo = (req, res) => res.send("heloo world");
let exap = (req,res) => res.send("exampleeeee ths is");

    app.get('/helo',helo)
    app.get('/example',exap)
}

module.exports = {
setRouter: setRouter
}