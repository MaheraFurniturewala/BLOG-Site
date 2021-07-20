const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
//deprecation warnings
mongoose.connect('mongodb://localhost/blog_site',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true});
const Article  = require('./models/article')


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
//whenever we set the parameter as '_method' in any type of forms this is going to override the method
app.use(methodOverride('_method'));

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