var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('./imdb.json', 'utf8'));

for(var page in movies.pages){
	for(var movie in movies.pages[page].results)
		fs.appendFile('./movie_img_links.txt',movies.pages[page].results[movie].title + "\n",
										function(err){
											if(err) {
												return console.log(err);
											}
										})};