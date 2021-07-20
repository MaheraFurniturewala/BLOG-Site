const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new',(req,res)=>{
    //completely blank default article
    res.render('articles/new',{article:new Article()});
});

router.get('/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article == null){
        res.redirect('/');
    }
    res.render('articles/show',{article : article})
});

router.post('/',async (req,res) => {
    
    let article = new Article({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown
    })
    try{
        article = await article.save();
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        //it will take all the information yo addded in the article and shoow all of it again while going back to the same 
        //but this will cause a problem if you are generally go from home page to new article because there you have not passed over the article
        res.render('articles/new',{article: article})
    }
    
})

    
    


module.exports = router;