// The Movie Database API Key
var tmdbAPI = "24015e7692b811d33d1c989cbd42b043";

// Taste Dive API Key
var tasteDiveAPI = "367428-bootcamp-HTLV36YO";

// Define Global Variables
var newbook;
var searchTerm="";
var lastBook="";

// Get street cred for our work!
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
    // fetch API
    fetch(googleFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // for reference - delete console.log when finished
        saveBook(response.items[0].volumeInfo.title);
        // populates the html div
        // Book Cover
        $('#image').html(`<a href="#"><img src="${response.items[0].volumeInfo.imageLinks.smallThumbnail}"></a>`);
        // Book Title
        $('#title').html(response.items[0].volumeInfo.title);
        // Book Author
        $('#author').html(response.items[0].volumeInfo.authors[0]);
        // Book Rating
        let bookRating = response.items[0].volumeInfo.averageRating;
        $('#book-rating').html(`Book Rating: <span id="bRate"> ${bookRating}</span>`);
        // Color Rating based on score
        if (bookRating>=0 && bookRating<2){
            $('#bRate').attr("class", "round alert label");
        } else if (bookRating>=2 && bookRating<4){
            $('#bRate').attr("class", "round warning label");
        } else if (bookRating>=4){
            $('#bRate').attr("class", "round success label");
        };
        // Preview in Google Books
        $('#google-preview').html(`  <a href="${response.items[0].volumeInfo.previewLink}"><i class="fas fa-book-reader"></i>     Preview (Google Books)</a>`);
        // Book description
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
        // Movie description
        $('#movie-description').html("<h5>Movie Description: </h5>" + response.results[0].overview);
        // Movie rating
        let movieRating = response.results[0].vote_average;
        $('#movie-rating').html(`Movie Rating: <span id="mRate"> ${movieRating}</span>`);
        // Color rating based on scale 
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
        // Wikipedia link
        $('#wikipedia').html(`  <a href="${response.Similar.Info[0].wUrl}"><i class="fab fa-wikipedia-w"></i>    Wikipedia</a>`);
        // Populate suggested titles
            $('#similar').html(`
            
                <h5>Similar Titles: </h5>

            <div class="grid-x grid-margin-x">
            <div class="cell small-3">
                <div class="card">
                    <div class="card-section">
                        <p>${response.Similar.Results[0].Name}</p>
                    </div>
                </div>
            </div>
            <div class="cell small-3">
                <div class="card">
                    <div class="card-section">
                        <p>${response.Similar.Results[1].Name}</p>
                    </div>
                </div>
            </div>
            <div class="cell small-3">
            <div class="card">
                <div class="card-section">
                    <p>${response.Similar.Results[2].Name}</p>
                </div>
            </div>
        </div>
        <div class="cell small-3">
        <div class="card">
            <div class="card-section">
                <p>${response.Similar.Results[3].Name}</p>
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
    // Render to update in "real-time"
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

// run main application
var runApp = (event => {
    runGBSearch();
    runTMDBSearch();
    runTasteDive();
    renderBook();
    $('#search-input').val(()=> {
        if (this.value.length == 0) {
          return $(this).attr('placeholder');
        }
      });
});

renderBook();

// to call the saved books in to search
$('#menu-title').on("click", (event) => {
    event.preventDefault();
    $("#search-input").val(event.target.textContent);
    runApp();
    $('#search-input').empty(); 
});

// to call from suggestions at bottom into new search
$('#similar').on("click", (event) => {
    event.preventDefault();
    $("#search-input").val(event.target.textContent);
    runApp();
    $('#search-input').empty();
    // resets window to the top on new search
    $(document).ready(function(){
        $(window).scrollTop(0);
    });
});

// Can now press "ENTER" to execute the click event and run search
$("#search-input").keypress((event) => { 
    if (event.keyCode === 13) { 
        $(".button").click(); 
    } 
}); 
$(".button").on('click', (event) => {
    runApp();
});

