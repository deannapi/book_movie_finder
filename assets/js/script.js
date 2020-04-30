var goodReadsAPI = "BQEOrH4cYetnk78yLa8cQA";
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";

var searchTerm ="casino";

//cors-anywhere fixes CORS issue - append fetch after to use
var grFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=" + searchTerm;

$.ajax({
    url: grFetch,
    method: "GET"
}).done(response => {
    console.log(response);
});

var tmdbFetch = "https://api.themoviedb.org/3/movie/550?api_key=" + tmdbAPI + "&q=" + searchTerm;

$.ajax({
    url: tmdbFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})