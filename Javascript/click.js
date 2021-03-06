var movies=["Batman", "Pulp Fiction", "Fox and the Hound", "The Incredibles"]

function addGifs(){
    var movie =  $(this).attr("data-name");
    var apiKey= "&api_key=BEUXwCbGQD0faRKaNQ0hNFrusC1Pkr9C&limit=10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + apiKey;

  $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
     var results = response.data
    console.log(results)
    for(var i = 0; i < results.length; i++) {
    // I need to still get my object to display in the console.log() Then append the images and rating to the page.
     var gifDiv = $("<div class = 'gif'>");
     var gifRating = results[i].rating;
     var p = $("<p>").text("Rating: " + gifRating);
        gifDiv.append(p);
     var stillGif = results[i].images.fixed_height_still.url;
     var animateGif =results[i].images.fixed_height.url;
     var movieGif = $("<img>").attr("src", stillGif);
         movieGif.attr("data-still", stillGif);
         movieGif.attr("data-animate", animateGif)
         movieGif.addClass("gif");
         movieGif.attr("data-state", "still");
        gifDiv.append(movieGif);
    
     $("#movieGifs").prepend(gifDiv); 
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

$(document.body).on("click", ".gif",function() {
    console.log("gif click")
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



  $(document).on("click", ".movie", addGifs);

  makeButtons();


