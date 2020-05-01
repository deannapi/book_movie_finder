var goodReadsAPI = "BQEOrH4cYetnk78yLa8cQA";
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";
var googleAPI = "AIzaSyCmTcR9EOLfB69f9zSsiXl19npDTHnIEG8";

var searchTerm ="casino";

// GoodReads API Search using searchTerm
//cors-anywhere fixes CORS issue - append fetch after to use
// var grFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=" + searchTerm;

// $.ajax({
//     url: grFetch,
//     method: "GET"
// }).done(response => {
//     console.log(response);
// });

// Movie Database Search using searchTerm
var tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

$.ajax({
    url: tmdbFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})

// Google GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
var googleFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.googleapis.com/auth/books" + "?q=" +  searchTerm + "&key" + googleAPI ;

$.ajax({
    url: googleFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})

// var runGoodSearch = (event => {
//     let searchTerm = $("#search-input").val();
//     let grFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=" + searchTerm;
//     $.ajax({
//         url: grFetch,
//         method: 'get',
//     }).done(response => {
//         console.log(response.books[index]['book'][0]['title'][0]);
//     });
// })


// $(".button").on('click', (event) => {
//     event.preventDefault();
//     runGoodSearch();
// });

// var runGoodSearch = (event => {
//     let searchTerm = $("#search-input").val();
//     let grFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=" + searchTerm;

//     fetch(grFetch)

//     .then((response) => {
//         console.log(response)
//     })
// })


// $(".button").on('click', (event) => {
//     event.preventDefault();
//     runGoodSearch();
// });


// This Works!
// var runTMDBSearch = (event => {
//     let searchTerm = $("#search-input").val();
//     let tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

//     fetch(tmdbFetch)
//     .then((response) => {
//         return response.json();
//     })
//     .then((response) => {
//         console.log(response.results[0].title)
//     })
// })


// $(".button").on('click', (event) => {
//     event.preventDefault();
//     runTMDBSearch();
// });