const express = require('express')
const mongoose = require('mongoose')
require('./../models/Blog')
const blogModel = mongoose.model('Blog')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

let createBlog = (req, res) =>{
   // var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new blogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
         author: req.body.fullName,
         created: time.convertToLocalTime(),
         lastModified: time.convertToLocalTime()
})
 let tags = (req.body.tags!= undefined && req.body.tags!= null && req.body.tags != '')? req.body.tags.split('.') : []
 newBlog.tags = tags;

 newBlog.save((err, result) => {
     if (err) {
        logger.error(err.message, 'blogController-->createBlog',4)
       let apiResponse = response.generate(true,"Failed to create blog details",500,null);  
         res.send(apiResponse)
     }
     else {
        logger.info('BLOG CREATED!!','BlogCONTROLLER: createBLOG',5);
         let apiResponse = response.generate(false,"Blog CReated Successfully",200,result)
         res.send(apiResponse)
     }
 })

}


let getAllBlog = (req, res) => {
    blogModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err){
            //console.log(err);
            logger.error(err.message, 'blogController-->getAllBlog',6)
            let apiResponse = response.generate(true,"Failed to find blog details",500,null);
            res.send(apiResponse);
        }
        else if (check.isEmpty(result)){
           // console.log('NO BLOG FOUND');
           logger.info('NO BLOGS FOUND','BlogCONTROLLER: getAllBlogs',5);
            let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
            res.send(apiResponse)
        }
        else{
            logger.info('BLOG FOUND!!','BlogCONTROLLER: getAllBlogs',5);
            let apiResponse = response.generate(false,"All Blogs detalis shown ",200,result);
            res.send(apiResponse)
        }
    })
}



let viewByBlogId = (req, res) => {
    console.log(req.user)
    blogModel.findOne({ 'blogId': req.params.blogId}, (err, result) => {
              if(err){
                logger.error(err.message, 'blogController-->getAllBlog',7)
                  let apiResponse = response.generate(true,"Failed to find blog details",500,null);
                  res.send(apiResponse)
              }    
              else if(check.isEmpty(result)){
                  //console.log('again errr occred');
                  logger.info('NO BLOG FOUND','BlogCONTROLLER: viewBlogById',5);
                  let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
                  res.send(apiResponse);
              }
              else{
                logger.info('BLOG FOUND!!','BlogCONTROLLER: viewBlogById',5);
                let apiResponse = response.generate(false,"BLOG FOUND",200,result);
                  res.send(apiResponse);
              }
    })
}



let viewByCategory = (req, res) => {
    blogModel.findOne({ 'category': req.params.category}, (err, result) => {
              if(err){
                  //console.log("some err");
                  logger.error(err.message, 'blogController-->viewByCategory',7)
                  let apiResponse = response.generate(true,"Failed to find blog details",500,null);
                  res.send(apiResponse)
              }    
              else if(check.isEmpty(result)){
                logger.info('NO BLOG FOUND','BlogCONTROLLER: viewByCategory',5);
                  let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
                  res.send(apiResponse);
              }
              else{
                logger.info('BLOG FOUND!!','BlogCONTROLLER: viewByCategory',5);
                let apiResponse = response.generate(false,"BLOG FOUND",200,result);
                  res.send(apiResponse);
              }
    })
}



let viewByAuthor = (req, res) => {
    blogModel.findOne({ 'author': req.params.author}, (err, result) => {
              if(err){
                  //console.log("some err");
                  logger.error(err.message, 'blogController-->viewByAuthor',7)
                  let apiResponse = response.generate(true,"Failed to find blog details",500,null);
                  res.send(apiResponse)
              }    
              else if(check.isEmpty(result)){
                  //console.log('again errr occred');
                  logger.info('NO BLOG FOUND','BlogCONTROLLER: viewByAuthor',5);
                  let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
                  res.send(apiResponse);
              }
              else{
                logger.info('BLOG FOUND!!','BlogCONTROLLER: viewByAuthor',5);
                let apiResponse = response.generate(false,"BLOG FOUND",200,result);
                  res.send(apiResponse);
              }
    })
}



let editBlog = (req, res) => {
     let options = req.body;
console.log(options);
blogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err, result) => {
     if(err){
         //console.log(err);
         logger.error(err.message, 'blogController-->editBlog',7)
         let apiResponse = response.generate(true,"Failed to find blog details",500,null);
         res.send(apiResponse)
     }
     else if(check.isEmpty(result)){
            //console.log("NO BLOG FOUND")
            logger.info('NO BLOG FOUND','BlogCONTROLLER: editBlog',5);
            let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
            res.send(apiResponse)
     }
     else {
         //console.log(result); 
         logger.info('BLOG EDITED SUCCESSSFULY!!','BlogCONTROLLER: editBlog',5);
         let apiResponse = response.generate(false,"BLOG FOUND",200,result);
         res.send(apiResponse)
        }
})

}



let increaseBlogCount = (req, res) => {
    // let options = req.body;
    //console.log(options);
    blogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        console.log(result);
        if (err) {
           // console.log(err); 
           logger.error(err.message, 'blogController-->increaseBlogCount',7)
            let apiResponse = response.generate(true,"Failed to find blog details",500,null);
            res.send(apiResponse)
        }
        else if (check.isEmpty(result)) {
            //console.log("NO BLOG FOUND")
            logger.info('NO BLOG FOUND!!','BlogCONTROLLER: increaseBlogCount',5);
            let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
            res.send(apiResponse)
        }
        else {
            result.views += 1;
            result.save(function (err, result) {
                if (err) { console.log(err); res.send(err) }
                else {
                    //console.log('Blog updated successfully');
                    logger.info('BLOG updated Successfully!!','BlogCONTROLLER: increaseBlogCount',5);
                    let apiResponse = response.generate(false,"BLOG updated successfully",200,result);
                    res.send(apiResponse);
                }
            })
        }
    })
}


let deleteBlog = (req, res) => {
    blogModel.remove({ 'blogId': req.params.blogId}, (err, result) => {
              if(err){
                 // console.log(err);
                 logger.error(err.message, 'blogController-->deleteBlog',7)
                  let apiResponse = response.generate(true,"Failed to find blog details",500,null);
                  res.send(apiResponse)
              }    
              else if(check.isEmpty(result)){
                  //console.log(' errr occred');
                  logger.info('NO BLOG FOUND!!','BlogCONTROLLER: deleteBlog',5);
                  let apiResponse = response.generate(true,"NO BLOG FOUND",404,null);
                  res.send(apiResponse);
              }
              else{
                logger.info('BLOG deleted Successfully!!','BlogCONTROLLER: deleteBlog',5);
                let apiResponse = response.generate(false,"BLOG deleted successfully",200,result);
                  res.send(apiResponse);
              }
    })
}

//let helloWorld = (req, res) =>{ res.send('hello')}
//let example = (req, res) =>{ res.send('example')}

/*let testRoute = (req, res) =>{
    console.log(req.params);
    res.send(req.params)
}

let testQuery = (req, res) =>{
    console.log(req.query);
    res.send(req.query);
}

let testBody = (req, res) => {
    console.log(req.body);
    res.send(req.body);
}*/

module.exports = {
    //helloW : helloWorld,
    //examp: example
    //testBody: testBody,
   // testQuery:testQuery,
    //testRoute: testRoute
   createBlog: createBlog,
   getAllBlog: getAllBlog,
   viewByBlogId: viewByBlogId,
   viewByAuthor: viewByAuthor,
   viewByCategory: viewByCategory,
   editBlog: editBlog,
   increaseBlogCount: increaseBlogCount,
   deleteBlog: deleteBlog
}