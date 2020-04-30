var goodReadsAPI = "BQEOrH4cYetnk78yLa8cQA"


var grFetch = "https://www.goodreads.com/search/index.xml?key=" + goodReadsAPI + "&q=Ender%27s+Game";
    grFetch = "https://cors-anywhere.herokuapp.com/" + grFetch;

$.ajax({
    url: grFetch,
    method: "GET"
}).done(response => {
    console.log(response);
})
