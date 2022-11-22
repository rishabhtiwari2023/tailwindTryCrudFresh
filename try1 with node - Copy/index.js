const express = require('express');

var mysql = require('mysql');

var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
// const http=require('http'); 
const app = express();
const PORT = 3000 || process.env.PORT;
const hbs=require("hbs");

//dbms
var connection = mysql.createConnection({
	host     : 'vayofeh.in',
	user     : 'vallf_RISHABH',
	password : 'RishiKi@',
	database : 'valleyof_R '
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//dbms


//template directory and partial directary
const temp=path.join(__dirname, "template/views");
const partials=path.join(__dirname, "template/partials");
app.use(express.static(__dirname + '/image/'));

app.set("view engine","hbs");

app.set("views",temp);
hbs.registerPartials(partials);

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/template/views/index.html");;
// });
app.get("/",(req,res)=>{
    res.render("index");
});




//dbms

app.listen(PORT,()=>{
    console.log(`listening to the ${PORT}`);
});




app.post('/auth', function(request, response) {
    var sno=1;
	var fn = request.body.fn;
	var ln = request.body.ln;
    var midname=request.body.mn;
    var mob=request.body.mob;
    var addr=request.body.addr;
    var email=request.body.email;
    var dob=request.body.dob;
console.log(fn);

    const sql = 'INSERT INTO ENGLISH VALUES ?'
    const values = [[sno,fn,midname,ln,mob,addr,email,dob] ];
    connection.query(sql, [values], (err, results, fields)=>{
        if(err){
            console.log('failed to Reg new student : ', err)
            
            response.sendStatus(500)  
            return 
        }
    console.log('Inserted new Student ', results.insertId)
        res.end();
    })
    response.redirect('/home')
    response.end();
});
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
// npm run rishu
// C:\Users\rishabh tiwari\Desktop\grammer\try1 with node
