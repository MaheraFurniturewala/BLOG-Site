// const express = require('express');
// const Article = require('./../models/article');
// const router = express.Router();

// router.get('/new',(req,res)=>{
//     //completely blank default article
    
//     res.render('articles/new',{article:new Article()});
// });

// router.get('/edit/:id',async (req,res)=>{
//     const article = await Article.findById(req.params.id);
//     res.render('articles/edit',{article : article});
// });

// router.get('/:slug', async (req,res)=>{
//     //now we find by slug
//     //just writing .find will return an array
//     const article = await Article.findOne({slug : req.params.slug});
//     if(article == null){
//         res.redirect('/');
//     }
//     res.render('articles/show',{article : article})
// });

// router.post('/',async (req,res) => {
    
//     let article = new Article({
//     title:req.body.title,
//     description:req.body.description,
//     markdown:req.body.markdown
//     })
//     try{
//         article = await article.save();
//         res.redirect(`/articles/${article.slug}`)
//     }catch(e){
//         //it will take all the information yo addded in the article and shoow all of it again while going back to the same 
//         //but this will cause a problem if you are generally go from home page to new article because there you have not passed over the article
//         res.render('articles/new',{article: article})
//     }
    
// });

// //but it is difficult to create a  button for the delete method since the form only allows methods of GET/POST, so we use a library called method override
// //using this we can override the method that the form passes
// router.delete('/:id', async (req,res) => {
//     await Article.findByIdAndDelete(req.params.id);
//     res.redirect('/');
// });

// router.put('/:id', (req,res) => {

// });

// function saveArticleAndRedirect(path) {
//     return (req,res) => {
//         let article = new Article({
//             title:req.body.title,
//             description:req.body.description,
//             markdown:req.body.markdown
//             })
//             try{
//                 article = await article.save();
//                 res.redirect(`/articles/${article.slug}`)
//             }catch(e){
//                 //it will take all the information yo addded in the article and shoow all of it again while going back to the same 
//                 //but this will cause a problem if you are generally go from home page to new article because there you have not passed over the article
//                 res.render(`articles/${path}`,{article: article})
//             }
//     }
// }

 
// module.exports = router;
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router