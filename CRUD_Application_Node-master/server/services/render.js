const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}
exports.a = (req, res) => {
    
            res.render('a');
     

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}
exports.about = (req, res) =>{
    res.render('about');
}
exports.video = (req, res) =>{
    res.render('video');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}