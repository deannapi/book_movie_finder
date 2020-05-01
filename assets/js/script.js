var goodReadsAPI = "BQEOrH4cYetnk78yLa8cQA";
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";

var searchTerm ="casino";


// Movie Database Search using searchTerm
// var tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

// $.ajax({
//     url: tmdbFetch,
//     method: "GET"
// }).done(response => {
//     console.log(response);
// })

// Google GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
var googleFetch = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

$.ajax({
    url: googleFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})

// TMDB Search
var runTMDBSearch = (event => {
    let searchTerm = $("#search-input").val();
    let tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

    fetch(tmdbFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response.results[0].title)
        let renderHTML = `
        <div id="movies"></div>`
    
        renderHTML += `
        <ul >
            <li>${response.results[0].title}</li>

                        </ul>`;
        $('#movies').html(renderHTML);
    })
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
        console.log(response.items[0].volumeInfo.title)
        let renderHTML = `
        <div id="books"></div>`
    
        renderHTML += `
        <a href="#"><img src= "${response.items[0].volumeInfo.imageLinks.smallThumbnail}"></a>
        <ul >
            <li>${response.items[0].volumeInfo.title}</li>
            <li>${response.items[0].volumeInfo.authors}</li>
            <li>${response.items[0].volumeInfo.description}</li>
            <li><a href="${response.items[0].volumeInfo.previewLink}">Google Books Preview</a></li>
                        </ul>`;
        $('#books').html(renderHTML);
    });


})



$(".button").on('click', (event) => {
    event.preventDefault();
    runGBSearch();
    runTMDBSearch();
});