var express = require('express');
var pg = require('pg');
var router = express.Router();
var http = require('http');
var vd = require('../videodata.json');
//var md = require( '../imdb.json');
var request = require('request');
var url = 'https://yts.ag/api/v2/list_movies.json?genre=horror&page=2';
var pg = require('pg'); //Added by A.P for router.post

var pgclient = new pg.Client(require('./../config/database.json'));


request({
    url: url,
    qs: {data: {movies: [{title_english: 'Killer Workout'}]}},
    method: 'GET'
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        //var banana = body;
        pgclient.connect(function(err, client, done) {
            // Handle connection errors
                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                }else{
                    console.log("I'm alliiiiive!")
                }
        });
        router.get('/', function (req, res) {

            var results = [];
            var nice;
            console.log("RAAAAA");
            //var pgclient = new pg.Client(require('./../config/database.json'));
            var query = pgclient.query("SELECT * FROM movie", function(err, answer){
                    if(!err){
                        res.render('index', {title: 'You Watch Movie Now!', taco: vd, imdb : answer['rows'] });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                });
        });

        router.post('/results',function (req,res) {
            var tag = req.body.firstname;
            //var pgclient = new pg.Client(require('./../config/database.json'));

            var query = pgclient.query("SELECT * FROM movie WHERE lower(movietitle) LIKE lower('%"+tag+"%')", function(err, answer){
            if(!err){
                console.log("Let's look at the movies.");
                console.log(answer);
                res.render('results', {title: 'Results', imdb : answer['rows'], search : tag });//results = answer['rows'];
                //res.json(answer['rows']);
                }
            else{
                console.log(err);
            }
            });
    });
        router.post('/details',function (req,res) {
            var tag = req.body.thisname;
            console.log(tag+"qqqqqqqqqqqqqqqq");
            //var pgclient = new pg.Client(require('./../config/database.json'));

            var query = pgclient.query("SELECT * FROM movie WHERE movietitle='"+tag+"'", function(err, answer){
                console.log("Roger roger");
            if(!err){
                console.log("Let's look at the movie?????.");
                //console.log(answer);
                var query2 = pgclient.query("SELECT actor.actor_name, role_in_movie.rolename FROM actor,movie,role_in_movie WHERE actor.actorid=role_in_movie.actorid AND role_in_movie.movieid=movie.movieid AND movie.movietitle='"+tag+"'",function(err2,ans2){
                    if(!err2){
                    console.log("WHAT ABOUT ACTORS AND ROLES.");
                    console.log(ans2+"waaaaa");
                    res.render('details', {imdb : answer['rows'], roles : ans2['rows']});//results = answer['rows'];
                    }
                    else{
                        console.log("Oops I did it again");
                        console.log(err2);
                    }
                });
                //res.json(answer['rows']);
                }
            else{
                console.log(err);
            }
            });
    });

    }
});

/* GET home page. */

module.exports = router;
