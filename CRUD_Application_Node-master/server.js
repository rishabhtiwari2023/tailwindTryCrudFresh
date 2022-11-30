const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
var mongoose = require("mongoose")
const bodyparser = require("body-parser");
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session')
// require('./passport-setup');


// const cors = require('cors');
const connectDB = require('./server/database/connection');

const app = express();
app.use(express.static(__dirname+'public'))
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080



// google

// app.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
//   }))
//   const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }
// app.use(passport.initialize());
// app.use(passport.session());
// // app.get('/', (req, res) => res.render('pages/index'))
// app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// // In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get('/good', isLoggedIn, (req, res) =>{
//     res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
// })

// // Auth Routes
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/good');
//   }
// );

// app.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })

























// const path = require("path")
const multer = require("multer")

app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://rishabh:tiwari@cluster0.t2qow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// https://ashwanibakshii.blogspot.com/2019/11/upload-and-download-file-in-node_2.html?zx=8f63dd4a5eba17a9
var storage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'./public/uploads')
    },
    filename(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({storage:storage});

//  mongoose.connect('mongodb://localhost:27017/pics',{useNewUrlParser:false})
//  .then(()=>console.log('connect')).catch(err=>console.log(err))

// making the collection(table) schema
// it contain picspath file for saving the file path
var picSchema = new mongoose.Schema({
    picspath:String,
    name:String
})

//collection schema will be save in db by name picsdemo 
// picModel contain the instance of picdemo by which it can manipulate data in it.
 var picModel = mongoose.model('picsdemo',picSchema)


app.set('view engine','ejs');

app.set("views",path.resolve(__dirname,'views'));

var picPath = path.resolve(__dirname,'public');

app.use(express.static(picPath));

app.use(bodyparser.urlencoded({extended:false}))
app.get('/gallery',(req,res)=>{res.render('gallery')});
app.get('/up',(req,res)=>{
    picModel.find((err,data)=>{
             if(err){
                 console.log(err)
             }
            if(data){
                console.log(data)
                res.render('home',{data:data})
            } 
           else{
               res.render('home',{data:{}})
           } 
    })
    
})

app.post('/up',upload.single('pic'),(req,res)=>{
    var x= 'uploads/'+req.file.originalname;
    var picss = new picModel({
        picspath:x,name:req.file.originalname
    })
    picss.save((err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             console.log('data',data)
            res.redirect('/up')
         }
    })
})

app.get('/download/:id',(req,res)=>{
     picModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         } 
         else{
            var path= __dirname+'/public/'+data[0].picspath;
            res.download(path);
         }
     })
})

module.exports = app;




































// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});