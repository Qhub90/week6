var movies=["Batman", "Pulp Fiction", "Fox and the Hound", "The Incredibles"]

function addGifs(){
    var movie =  $(this).attr("data-value");
    var apiKey= "&api_key=BEUXwCbGQD0faRKaNQ0hNFrusC1Pkr9C&limit=10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + apiKey;

  $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    
    for(var i = 0; i < response.data.length; i++){
    // I need to still get my object to display in the console.log() Then append the images and rating to the page.
     var gifDiv = $("<div class = 'gif'>");
     var gifRating = response.data[i].rating;
     var p = $("<p>").text("Rating: " + gifRating);
        gifDiv.append(p);
     var gifURL = response.data[i].url
     var movieGif =$("<img>").attr("src", gifURL + ".gif");
       gifDiv.append(movieGif);
    
     $("#movieGifs").prepend(gifDiv); 
     console.log(response.data[i].rating)
    };   

    
});
};

function makeButtons(){
  $("#movieBtn").empty()

  for( var i = 0; i < movies.length; i++ ) {
     
    var a = $("<button>");
    a.addClass("movie");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);

    $("#movieBtn").append(a);

  }
}


$("#addMovie").on("click", function(event){

  event.preventDefault();


  var movie = $("#movieInput").val().trim();
    
   movies.push(movie);

   makeButtons();

});

  $(document).on("click", ".movie", addGifs);

  makeButtons();


