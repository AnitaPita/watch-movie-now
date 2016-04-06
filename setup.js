var fs = require('fs');

var movies = JSON.parse(fs.readFileSync('./imdb.json', 'utf8'));
var title = JSON.parse(fs.readFileSync('./imdb_title.json', 'utf8'));
var people = JSON.parse(fs.readFileSync('./imdb_people.json', 'utf8'));

var movies = [];
var Genres = [ 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];

var counter = 0;

for(var page in movies.pages){
	for(var movie in movies.pages[page].results){
		insertMovie(counter, 
					movies.pages[page].results[movie].title/_text, 
					movies.pages[page].results[movie].year.slice(1, 5),
					);
		counter++;
	}
}


function insertMovie(MOVIEID, MOVIETITLE, DATE_RELEASED, RUNTIME, SUMMARY, MPA_RATING, USER_RATING){
	
}

function insertDirector(){}
function insertActor(){}

fs.appendFile('./setup.sql',movies.pages[page].results[movie].director + "\n" +
										movies.pages[page].results[movie].actor_1 + "\n" + 
										movies.pages[page].results[movie].actor_2 + "\n" + 
										movies.pages[page].results[movie].actor_3 + "\n",
										function(err){
											if(err) {
												return console.log(err);
											}
										});