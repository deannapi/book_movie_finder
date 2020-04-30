var goodReadsAPI = "BQEOrH4cYetnk78yLa8cQA"

//cors-anywhere fixes CORS issue - append fetch after to use
var grFetch = "https://cors-anywhere.herokuapp.com/" + "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=Ender%27s+Game";

$.ajax({
    url: grFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})
