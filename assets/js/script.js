// The Movie Database API Key
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";
// Don't appear to need the API?
var tasteDiveAPI = "367428-bootcamp-HTLV36YO";

var searchTerm="";
var currentBook="";
var lastBook="";

console.log(`
UT Coding Bootcamp Project #1 - Group #5

Developed by:
Andrea Ballew
DeAnna Martinez 
Joseph DeWoody

https://ut-project-1-group-5.github.io/project-1-group-5/

Repository:
https://github.com/UT-Project-1-Group-5/project-1-group-5
`);


// Google Books Search and append to html
var runGBSearch = (event => {
    searchTerm = $("#search-input").val();
    var googleFetch = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;

    fetch(googleFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // for reference - delete console.log when finished
        console.log(response);
        saveBook(response.items[0].volumeInfo.title);
        // populates the html div
        // $('#menu-title').html(response.items[0].volumeInfo.title);
        $('#image').html(`<a href="#"><img src="${response.items[0].volumeInfo.imageLinks.smallThumbnail}"></a>`);
        $('#title').html(response.items[0].volumeInfo.title);
        $('#author').html(response.items[0].volumeInfo.authors[0]);
        let bookRating = response.items[0].volumeInfo.averageRating;
        $('#book-rating').html(`Book Rating: <span id="bRate"> ${bookRating}</span>`);
        if (bookRating>=0 && bookRating<2){
            $('#bRate').attr("class", "round alert label");
        } else if (bookRating>=2 && bookRating<4){
            $('#bRate').attr("class", "round warning label");
        } else if (bookRating>=4){
            $('#bRate').attr("class", "round success label");
        };
        $('#google-preview').html(`  <a href="${response.items[0].volumeInfo.previewLink}"><i class="fas fa-book-reader"></i>     Preview (Google Books)</a>`);
        $('#book-description').html("<h5>Book Description: </h5>" + response.items[0].volumeInfo.description + "<br>");

    });
})

// MOVIE TMDB Search
var runTMDBSearch = (event => {
    searchTerm = $("#search-input").val();
    let tmdbFetch = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPI + "&query=" + searchTerm;

    fetch(tmdbFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // for reference - delete console.log when finished
        console.log(response)
        $('#movie-description').html("<h5>Movie Description: </h5>" + response.results[0].overview);
        let movieRating = response.results[0].vote_average;
        $('#movie-rating').html(`Movie Rating: <span id="mRate"> ${movieRating}</span>`);
        if (movieRating>=0 && movieRating<5){
            $('#mRate').attr("class", "round alert label");
        } else if (movieRating>=5 && movieRating<7){
            $('#mRate').attr("class", "round warning label");
        } else if (movieRating>=7){
            $('#mRate').attr("class", "round success label");
        };
    })
})

// Run Taste Dive API https://tastedive.com/read/api
var runTasteDive = (event => {
    searchTerm = $("#search-input").val();
    let tasteDriveFetch = "https://cors-anywhere.herokuapp.com/" + "https://tastedive.com/api/similar?q=" + searchTerm +"&verbose=1" + "&k=" + tasteDiveAPI;

    fetch(tasteDriveFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // for reference - delete console.log when finished
        console.log(response)
        // This should embed a youTube video of search result, not working due to non-passive event error
    //     $('#youtube').html(`<div class="responsive-embed panorama">
    //     <iframe width="1024" height="315" src="${response.Similar.Info[0].yUrl}" frameborder="0"></iframe>
    //   </div>`); 
        $('#wikipedia').html(`  <a href="${response.Similar.Info[0].wUrl}"><i class="fab fa-wikipedia-w"></i>    Wikipedia</a>`);
        //for loop was not populating - will comeback too
            $('#similar').html(`
            
                <h5>Similar Titles: </h5>

            <div class="grid-x grid-margin-x">
            <div class="cell small-3">
                <div class="card">
                    <div class="card-section">
                        <p><a href="${response.Similar.Results[0].yUrl}">${response.Similar.Results[0].Name}</a></p>
                    </div>
                </div>
            </div>
            <div class="cell small-3">
                <div class="card">
                    <div class="card-section">
                        <p><a href="${response.Similar.Results[1].yUrl}">${response.Similar.Results[1].Name}</a></p>
                    </div>
                </div>
            </div>
            <div class="cell small-3">
            <div class="card">
                <div class="card-section">
                    <p><a href="${response.Similar.Results[2].yUrl}">${response.Similar.Results[2].Name}</a></p>
                </div>
            </div>
        </div>
        <div class="cell small-3">
        <div class="card">
            <div class="card-section">
                <p><a href="${response.Similar.Results[3].yUrl}">${response.Similar.Results[3].Name}</a></p>
            </div>
        </div>
    </div></div>
            `);

    })
})

// save the searches to storage
var saveBook = (newBook) => {
    let bookExists = false;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["books" + i] === newBook) {
        bookExists = true;
        break;
        }
    }
    if (bookExists === false) {
        localStorage.setItem('books' + localStorage.length, newBook);
    };
    renderBook();
}

// render the books to the dropdown menu
var renderBook = () => {
    $('#menu-title').empty();
    let lastBookKey = "books"+(localStorage.length-1);
    lastBook = localStorage.getItem(lastBookKey);
    for (let i = 0; i < localStorage.length; i++) {
        let book = localStorage.getItem("books" + i);
        let bookEl = `<li id="recall-book"><a id="searchedBook">${book}</a></li>`;
        $('#menu-title').prepend(bookEl);
        }
}

renderBook();

// Can now press "ENTER" to execute the click event and run search
$("#search-input").keypress(function(event) { 
    if (event.keyCode === 13) { 
        $(".button").click(); 
    } 
}); 
$(".button").on('click', (event) => {
    // This fix is not working for youTube
    // document.addEventListener('touchstart', {passive: true});
    event.preventDefault();
    runGBSearch();
    runTMDBSearch();
    runTasteDive();
    renderBook();
    $('#search-input').val(function() {
        if (this.value.length == 0) {
          return $(this).attr('placeholder');
        }
      });
});

// to call the saved books in to search
$('#recall-book').on("click", (event) => {
    event.preventDefault();
    $("#search-input").val(event.target.textContent);
    searchTerm= $('#search-input').val();
    $(".button").click();
    $('#search-input').empty(); 
});