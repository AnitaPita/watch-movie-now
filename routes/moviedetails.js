var express = require ('express');
var router = express.Router();
var pg = require('pg');

router.get('/',function (req,res,next)
{
    res.render('moviedetails', {
        title: 'moviedetails',
        name: 'Hello',
        imdb: [],
        search: "",
    });
});

module.exports = router;