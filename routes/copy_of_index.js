var express = require('express');
var pg = require('pg');
var router = express.Router();
var http = require('http');
var vd = require('../videodata.json');
//var md = require( '../imdb.json');
var request = require('request');
var url = 'https://yts.ag/api/v2/list_movies.json?genre=horror&page=2';
var pg = require('pg'); //Added by A.P for router.post
//var connectionString = "pg://apope007:LUNCANI1!@web0.site.uottawa.ca:15432/apope007"; //Added by A.P for router.post

//var pgclient = new pg.Client(require('./../config/database.json'));


router.post('/moviedetails',function (req,res) {
            var tag = req.body.firstname;
            var pgclient = new pg.Client(require('./../config/database.json'));

            pgclient.connect(function(err, client, done) {
            // Handle connection errors
                if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err});
                }else{
                    console.log("I'm alliiiiive22222")
                }
                var query = client.query("SELECT * FROM movie WHERE lower(movietitle) LIKE lower('%"+tag+"%')", function(err, answer){
                    if(!err){
                        console.log("Let's look at the movies.");
                        console.log(answer);
                        res.render('moviedetails', {title: 'details', imdb : answer['rows'], search : tag });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                    else{
                        console.log(err);
                    }
                });
            });
        });


request({
    url: url,
    qs: {data: {movies: [{title_english: 'Killer Workout'}]}},
    method: 'GET'
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        //var banana = body;

        router.get('/', function (req, res) {

            var results = [];
            var nice;
            console.log("RAAAAA");
            var results = [];
            var nice;
            var pgclient = new pg.Client(require('./../config/database.json'));
            pgclient.connect(function(err, client, done) {
         	// Handle connection errors
                if(err) {
           	        done();
           	        console.log(err);
           	        return res.status(500).json({ success: false, data: err});
                }else{
         	        console.log("I'm alliiiiive")
         		}
         		var query = client.query("SELECT * FROM movie", function(err, answer){
         			if(!err){
         				res.render('index', {title: 'not Youssef', taco: vd, imdb : answer['rows'] });//results = answer['rows'];
         				//res.json(answer['rows']);
         			}
         		});
         	});
        });

    }
});

/* GET home page. */

module.exports = router;
