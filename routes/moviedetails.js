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
        console.log("I'm alliiiiive!")
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
            if(!err){
                console.log("Let's look at the movieafsgds.");
                //console.log(answer);
                res.render('details', {imdb : answer['rows']});//results = answer['rows'];
                //res.json(answer['rows']);
                }
            else{
                console.log(err);
            }
            });
    });

module.exports = router;