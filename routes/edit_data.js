var express = require ('express');
var router = express.Router();
var pg = require('pg');

router.get('/',function (req,res,next)
{
    res.render('edit_data', {
        title: 'Edit Movie Data',
        name: 'Josh'
    });
});

module.exports = router;