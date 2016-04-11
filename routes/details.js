var express = require('express');
var router = express.Router();
var pg = require('pg');

var pgclient = new pg.Client(require('./../config/database.json'));

/*pgclient.connect(function(err, client, done) {
 // Handle connection errors
 if(err) {
 done();
 console.log(err);
 return res.status(500).json({ success: false, data: err});
 }else{
 console.log("I'm alliiiiive!!")
 }
 });*/

router.get('/', function (req, res, next) {

    res.render('details', {
        title: 'About',
        name: 'Josh'
    });
});

router.post('/details', function (req, res) {
    var tag = req.body.firstname;
    //var pgclient = new pg.Client(require('./../config/database.json'));
    console.log("I WISH THIS WERE DONE.");
    var query = pgclient.query("SELECT * FROM movie WHERE lower(movietitle) LIKE lower('%" + tag + "%')", function (err, answer) {
        if (!err) {
            console.log("Let's look at the movies.");
            console.log(answer);
            res.render('results', {title: 'Results', imdb: answer['rows']});//results = answer['rows'];
            //res.json(answer['rows']);
        }
        else {
            console.log(err);
        }
    });
});

module.exports = router;