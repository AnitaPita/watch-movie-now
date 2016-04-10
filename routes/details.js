var express = require ('express');
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

router.get('/',function (req,res,next)
{

    res.render('details', {
        title: 'About',
        name: 'Josh'
    });
});

module.exports = router;