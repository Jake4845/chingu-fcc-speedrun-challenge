/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = [];

$(document).ready(function() {
  results();
});

function results(callback) {
  $("#fail").hide();
  //$(".content").hide();
  $("#hitSearch").click(function() {
    // Clear results each time 'enter'
    searchResults = [];
    input = $("#searchInput").val();
    // Get search data based on input
    if (input) {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
        for (var i=0; i<data[1].length; i++){
          searchResults.push(data[1][i]);
        }
        showResults();
      });
    }
    // If nothing is entered, alert user
    else {
      alert("Please enter something into the search field");
      return false;
    }
  });
  // Store input from search bar when 'enter' pressed
  $("#searchInput").keypress(function(e) {
    if (e.which == 13) {
      $("#hitSearch").click();
      return false;
    }
  });
};

function showResults() {
  animations();
  if (searchResults.length > 0) {
    $(".content").append("<div class='contentinfo'><h1 class='highlight'>Title Here</h1><p>Info Here</p><a class='highlight'>Link Here<a/></div>")
    console.log(input);
    console.log(searchResults);
    //$("t_hold").html();
  }
  else {
    // Suggest alternative search options
    $("#fail").append("<div class='contentinfo'><p>Sorry, there were no results matching your search.</p><p>The page <span class='highlight'><b>\"" + $("#searchInput").val() + "\"</b></span> does not exist.</p><ul><li>Check that all keywords are spelled correctly</li><li>Try using more general keywords</li><li>Try entering a shorter search if it is too long</li></ul></div>");
    $("#fail").fadeIn(1500);
    console.log(input);
    console.log(searchResults);
  }
};

function animations() {
  // Animate positioning
  $("#wikibox").animate({bottom: "21em", top: 0, left: 0, right: 0});
  // Allow user to reset search
  $("#refresh").click(function() {
    $("#wikibox").animate({bottom: "3em", top: 0, left: 0, right: 0});
    input = undefined; searchResults = [];
    $(".nothing").detach();
    $("#form")[0].reset();
    });
  // Clear the div for 'no results'
  $(".nothing").detach()
}
