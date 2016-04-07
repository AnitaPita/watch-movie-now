var express = require ('express');
var router = express.Router();
var pg = require('pg');
var connectionString = "pg://apope007:LUNCANI1!@web0.site.uottawa.ca:15432/apope007";

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