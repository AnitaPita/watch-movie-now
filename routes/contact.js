var express = require ('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req,res,next)
{
    res.render('contact',
        {
           print1:  function()
           {
               for(var i = 0; i<5;i++)
               {
                   console.log(i);
               }
           },
            name: 'RIP'
        });
});
module.exports = router;