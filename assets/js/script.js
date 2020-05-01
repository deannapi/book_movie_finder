
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";

var searchTerm ="casino";


// Movie Database Search using searchTerm
var tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

$.ajax({
    url: tmdbFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})

// Google GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
var googleFetch = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

$.ajax({
    url: googleFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})

// Google Books Search
var runGBSearch = (event => {
    let searchTerm = $("#search-input").val();
    var googleFetch = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

    fetch(googleFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log("book: " + response.items[0].volumeInfo.title)
        $('#menu-title').html(response.items[0].volumeInfo.title);
        $('#image').html(`<a href="#"><img src="${response.items[0].volumeInfo.imageLinks.smallThumbnail}"></a>`);
        $('#title').html(response.items[0].volumeInfo.title);
        $('#author').html(response.items[0].volumeInfo.authors);
        $('#google-preview').html(`<a href="${response.items[0].volumeInfo.previewLink}">Google Books Preview</a>`);
        $('#book-description').html("<h5>Book Description: </h5>" + response.items[0].volumeInfo.description + "<br>");

    });
})

// MOVIE TMDB Search
var runTMDBSearch = (event => {
    let searchTerm = $("#search-input").val();
    let tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

    fetch(tmdbFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log("movie: " + response.results[0].title)
        $('#movie-description').html("<h5>Movie Description: </h5>" + response.results[0].overview);
    })
})



$(".button").on('click', (event) => {
    event.preventDefault();
    runGBSearch();
    runTMDBSearch();
});