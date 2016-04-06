var express = require('express');
var router = express.Router();
var http = require('http');
var vd = require('../videodata.json');
var request = require('request');
var url = 'https://yts.ag/api/v2/list_movies.json?genre=horror&page=2';

request({
    url: url,
    qs: {data: {movies: [{title_english: 'Killer Workout'}]}},
    method: 'GET'
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        //var banana = body;

        console.log(body);
        console.log(body);
        var body = body

        router.get('/', function (req, res, next) {
            res.render('index', {title: 'Yousseef', taco: vd, jsonz : body});

        });

    }
});

/* GET home page. */

module.exports = router;
