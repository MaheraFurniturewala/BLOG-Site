const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
app.set('view engine', 'ejs');
app.set('views','./views');

app.use('/articles',articleRouter);

app.get('/',(req,res)=>{
    //array of objects
    const articles = [{
        title : 'Test Articles',
        createdAt : new Date(),
        description  :'Test description'
    }]
    res.render('articles/index',{ 
        articles : articles
    });
});

app.listen(8000);