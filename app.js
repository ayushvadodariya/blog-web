require('dotenv').config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');

const userRoute = require('./routes/user');
const blogRoute =  require('./routes/blog'); require('./routes/blog');

const { checkForAuthenticationCookie } = require("./middlewears/authentication");

const app = express();
const PORT = process.env.PORT || 8000;


mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log('Mongodb Connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded( { extended: false })); // we using form data 
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async(req, res)=>{
  const allBlogs = await  Blog.find({});
  return res.render('home',{
    user: req.user,
    blogs: allBlogs
  });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.post("/test",(req, res)=>{
  res.send('hello this is test post');
  res.redirect('/');
});



app.listen(PORT, ()=> console.log(`listing on ${PORT}`));
