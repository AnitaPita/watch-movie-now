var express = require ('express');
var router = express.Router();
var pg = require('pg');
var http = require('http');

//var connectionString = "pg://apope007:LUNCANI1!@web0.site.uottawa.ca:15432/apope007";

router.get('/',function (req,res,next)
{
    res.render('register', {title: 'Register',name: 'You are awesome'});

});


router.post('/',function (req,res,next)
{
	console.log("In Submission POST");

	var usrnme = req.body.username;
	var pw = req.body.pw;
	var email = req.body.email;
	var fname = req.body.fname;
	var lname = req.body.lname;

	console.log(lname);

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
         		var query = client.query("INSERT INTO users (pw,lname,fname,email) VALUES ('"+pw+"','"+lname+"','"+fname+"','"+email+"');");
         			/*, function(err, answer){
         			if(!err){
         				res.render('index', {title: 'not Youssef', taco: vd, imdb : answer['rows'] });//results = answer['rows'];
         				//res.json(answer['rows']);
         			}
         		});*/
    });

})

module.exports = router;