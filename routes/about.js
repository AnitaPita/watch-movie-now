var express = require ('express');
var router = express.Router();
var pg = require('pg');

router.get('/',function (req,res,next)
{
    res.render('about', {
        title: 'About',
        name: 'Josh'
    });
});

module.exports = router;