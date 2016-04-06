var fs = require('fs');
var movies = JSON.parse(fs.readFileSync('./imdb.json', 'utf8'));

for(var page in movies.pages){
	for(var movie in movies.pages[page].results)
		fs.appendFile('./person_img_links.txt',movies.pages[page].results[movie].director + "\n" +
										movies.pages[page].results[movie].actor_1 + "\n" + 
										movies.pages[page].results[movie].actor_2 + "\n" + 
										movies.pages[page].results[movie].actor_3 + "\n",
										function(err){
											if(err) {
												return console.log(err);
											}
										});
}