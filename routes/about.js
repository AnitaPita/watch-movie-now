var express = require ('express');
var router = express.Router();
var pg = require('pg');
var connectionString = "pg://apope007:LUNCANI1!@web0.site.uottawa.ca:15432/apope007";

router.get('/',function (req,res,next)
{
    res.render('about', {
        title: 'About',
        name: 'Josh'
    });
});

module.exports = router;