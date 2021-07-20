const express = require('express');

const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/blog_site',{ useNewUrlParser: true, useUnifiedTopology: true });
const Article  = require('./models/article')


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));



app.get('/', async (req,res)=>{
    //array of objects
    const articles = await Article.find().sort({
        createdAt:'desc'
    });
    res.render('articles/index',{ 
        articles : articles
    });
});
app.use('/articles',articleRouter);


app.listen(8000);