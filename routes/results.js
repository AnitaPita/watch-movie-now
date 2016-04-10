var express = require ('express');
var router = express.Router();
var pg = require('pg');

var pgclient = new pg.Client(require('./../config/database.json'));

pgclient.connect(function(err, client, done) {
    // Handle connection errors
    if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
    }else{
        console.log("I'm alliiiiive!!")
    }
});

router.get('/',function (req,res,next)
{
    res.render('moviedetails', {
        title: 'moviedetails',
        name: 'Hello',
        imdb: [],
        search: "",
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
                    res.render('details', {imdb : answer['rows'], roles : answer2['rows'], resp : ""});//results = answer['rows'];
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

module.exports = router;