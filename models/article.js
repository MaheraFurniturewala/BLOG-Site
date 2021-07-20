const mongoose = require('mongoose');
//converts markdown to html
const marked = require('marked');
const slugify = require('slugify');
//this returns to us a function
const createDomPurifier = require('dompurify');
//we only want the JSDOM portion of what this module returns(destructuring)
const { JSDOM } = require('jsdom');
//allows our dompurifier to create html and purify it by using this JSDOM window object
const dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    markdown: {
        type:String,
        required:true
    },
    createdAt:{
        type : Date,
        default:new Date()
    },
    slug: {
        type: String,
        required : true,
        //to make sure that we cant have more than one of the same slug since we are using it in our url
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required:true
    }
});
//we will precalculate the slug ans save in db
//we are going to run whatever function we pass to this pre, and this function will run right before we do validation every single time we save, update, create, delete, any of those things this function  will run before//and we will create our slug  from our title
articleSchema.pre('validate',function(next){
    // console.log(this);
    //this is basically the article object that is being created, saved, updated.....
    if(this.title){
        this.slug = slugify(this.title,{
            //to get the slug in lower case
            lower:true,
            //force slugify to get rid of any characters that do not fit in a url
            strict: true
        });
    }
if(this.markdown){
    //will convert markdown to html and then will purify it and get rid of any malicious code or any html characters
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
}

    next();
});

module.exports = mongoose.model('Article',articleSchema);