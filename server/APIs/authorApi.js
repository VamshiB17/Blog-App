const exp=require('express')
const authorApp=exp.Router();
const expressAsyncHandler=require("express-async-handler");
const createUserOrAuthor = require('./createUserOrAuthor');
const Article=require("../models/articleModel")
const {requireAuth,clerkMiddleware}=require('@clerk/express')
require('dotenv').config()


//API

//create new author
authorApp.post("/author",expressAsyncHandler(createUserOrAuthor))

//create new article
authorApp.post("/article",expressAsyncHandler(async(req,res)=>{

    //get new article obj from req
    const newArticleObj=req.body;
    const newArticle=new Article(newArticleObj);
    const artilceObj=await newArticle.save();
    res.status(201).send({message:"article published",payload:artilceObj})
}))



//read all articles
authorApp.get('/articles',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
    //read all the articles from the db
    const listOfArticles=await Article.find({isArticleActive:true});
    res.status(200).send({message:"articles",payload:listOfArticles})
}))

authorApp.get('/unauthorized',(req,res)=>{
    res.send({message:"Unauthorized request"})

})

//modify an article by article id
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{

    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,
        {...modifiedArticle},
        {returnOriginal:false})
    //send res
    res.status(200).send({message:"article modified",payload:dbRes})
}))

//delete(soft delete) an article by article id
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{

    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,
        {...modifiedArticle},
        {returnOriginal:false})
    //send res
    res.status(200).send({message:"article modified",payload:dbRes})
}))

module.exports=authorApp;