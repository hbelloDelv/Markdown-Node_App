const express = require("express");
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require("method-override")
const app = express();

//How to connect to mongodb database 
//1. require mongoose module
//2. call mongoose.connect() and supply the string



mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res)=>{
const articles =  await Article.find().sort({createdAt: 'desc'})
res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)
app.listen(5000);