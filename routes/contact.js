var express = require ('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req,res,next)
{
    res.render('contact',
        {
            name: 'RIP',title: "contact"
        });
});
module.exports = router;