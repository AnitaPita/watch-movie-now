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
            var searchtype = req.body.searchtype;
            console.log(searchtype);
            //var pgclient = new pg.Client(require('./../config/database.json'));
            if(searchtype==="Search Actors")
            {
                var query = pgclient.query("SELECT movie.movieid,movie.movietitle,movie.poster_path FROM movie,actor,role_in_movie "
                    + "WHERE movie.movieid=role_in_movie.movieid AND role_in_movie.actorid=actor.actorid AND lower(actor.actor_name) "
                    + "LIKE '%"+tag+"%'", function(err, answer){
                    if(!err){
                        console.log("Let's look at the movies.");
                        //console.log(answer);
                        res.render('results', {title: 'Results', imdb : answer['rows'], search : tag, typesearch : "Actor" });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                    else{
                        console.log(err);
                    }
                });

            }
            else if(searchtype==="Search Genres")
            {
                var query = pgclient.query("SELECT movie.movieid,movie.movietitle,movie.poster_path FROM movie,genres,genre_relation "
                    + "WHERE movie.movieid=genre_relation.movieid AND genre_relation.genreid=genres.genreid AND lower(genres.genre_name) "
                    + "LIKE '%"+tag+"%'", function(err, answer){
                    if(!err){
                        console.log("Let's look at the movies.");
                        //console.log(answer);
                        res.render('results', {title: 'Results', imdb : answer['rows'], search : tag, typesearch : "Genre" });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                    else{
                        console.log(err);
                    }
                });
            }
            else if(searchtype==="Search Directors")
            {
                var query = pgclient.query("SELECT movie.movieid,movie.movietitle,movie.poster_path FROM movie,director,directs "
                    + "WHERE movie.movieid=directs.movieid AND directs.did=director.did AND lower(director.director_name) "
                    + "LIKE '%"+tag+"%'", function(err, answer){
                    if(!err){
                        console.log("Let's look at the movies.");
                        //console.log(answer);
                        res.render('results', {title: 'Results', imdb : answer['rows'], search : tag, typesearch : "Director" });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                    else{
                        console.log(err);
                    }
                });


            }
            else
            {
                var query = pgclient.query("SELECT * FROM movie WHERE lower(movietitle) LIKE lower('%"+tag+"%')", function(err, answer){
                    if(!err){
                        console.log("Let's look at the movies.");
                        //console.log(answer);
                        res.render('results', {title: 'Results', imdb : answer['rows'], search : tag, typesearch : "Movie" });//results = answer['rows'];
                        //res.json(answer['rows']);
                    }
                    else{
                        console.log(err);
                    }
                });
            }

        });
        router.post('/details',function (req,res) {
            var tag = req.body.thisname;
            console.log(tag+"qqqqqqqqqqqqqqqq");
            //var pgclient = new pg.Client(require('./../config/database.json'));

            var query = pgclient.query("SELECT * FROM movie WHERE movietitle='"+tag+"'", function(err, answer){
                console.log("Roger roger");
                if(!err){
                    console.log(answer+"weeeee");
                    //console.log(answer);
                    var query2 = pgclient.query("SELECT actor.actor_name, role_in_movie.rolename FROM actor,movie,role_in_movie WHERE actor.actorid=role_in_movie.actorid AND role_in_movie.movieid=movie.movieid AND movie.movietitle='"+tag+"'",function(err2,ans2){
                        if(!err2){
                            console.log(ans2+"waaaaa");
                            console.log(ans2.rows[0].actor_name+" is bae");
                            res.render('details', {imdb : answer['rows'], roles : ans2['rows'], resp : ""});//results = answer['rows'];
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

        router.post('/edit',function (req,res) {
            var tag = req.body.moviename;
            console.log(tag+"qqqqqqqqqqqqqqqq");
            //var pgclient = new pg.Client(require('./../config/database.json'));

            var query = pgclient.query("SELECT * FROM movie WHERE movietitle='"+tag+"'", function(err, answer){
                console.log("Roger roger");
                if(!err){
                    console.log(answer+"weeeee");
                    res.render('edit_data', {film : answer['rows'], resp : ""});//results = answer['rows'];
                }
                else{
                    console.log(err);
                }
            });
        });

        router.post('/details2',function (req,res) {
            var rate = req.body.rate;
            var moviename = req.body.moviename;
            //var pgclient = new pg.Client(require('./../config/database.json'));
            console.log("I WISH THIS WERE DONE.");
            var query = pgclient.query("SELECT * FROM movie WHERE movietitle='"+moviename+"'", function(err, answer){
                if(!err){
                    console.log("did the rating change?");
                    console.log(answer);
                    var query2 = pgclient.query("SELECT actor.actor_name, role_in_movie.rolename FROM actor,movie,role_in_movie WHERE "
                        + "actor.actorid=role_in_movie.actorid AND role_in_movie.movieid=movie.movieid AND "
                        + "movie.movietitle='"+moviename+"'",function(err2,ans2){
                        if(!err2){
                            console.log(ans2+"waaaaa");
                            console.log(ans2.rows[0].actor_name+" is bae");
                            var query3 = pgclient.query("UPDATE movie SET total_raters=total_raters+1 WHERE "
                                + "movietitle='"+moviename+"'; UPDATE movie  SET community_rating=(community_rating+"+rate+")/2 WHERE  "
                                + "movietitle='"+moviename+"';");
                            res.render('details', {imdb : answer['rows'], roles : ans2['rows'], resp : 'You rated the movie! Your rating is being processed.'});//results = answer['rows'];
                        }
                        else{
                            console.log("Oops I did it again");
                            console.log(err2);
                        }
                    });                //res.json(answer['rows']);
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