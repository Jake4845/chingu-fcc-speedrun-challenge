/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = []; var searchInfo = []; var searchLinks = [];
var contentclone = $(".content").clone();

$(document).ready(function() {
  results();
});

function results(callback) {
  $(".content").hide();
  $("#hitSearch").click(function() {
    // Clear results each time search is made
    searchResults = []; searchInfo = []; searchLinks = [];
    $(".contentinfo").remove();
    input = $("#searchInput").val();
    // Get search data based on input
    if (input) {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
        for (var i=0; i<data[1].length; i++){
          searchResults.push(data[1][i]);
          searchInfo.push(data[2][i]);
          searchLinks.push(data[3][i]);
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
    $(".content").append("<div class='contentinfo'><h1 class='highlight'>Title Here</h1><p>Info Here</p><a class='highlight'>Link Here<a/></div>");
    $(".content").fadeOut(1).fadeIn(1500);
    console.log(input, searchResults, searchInfo, searchLinks);
  }
  else {
    // Suggest alternative search options
    $(".content").append("<div class='contentinfo'><p>Sorry, there were no results matching your search.</p><p>The page <span class='highlight'><b>\"" + $("#searchInput").val() + "\"</b></span> does not exist.</p><ul><li>Check that all keywords are spelled correctly</li><li>Try using more general keywords</li><li>Try entering a shorter search if it is too long</li></ul></div>");
    $(".content").fadeOut(1).fadeIn(1500);
  }
};

function animations() {
  // Animate positioning
  $("#wikibox").animate({bottom: "21em", top: 0, left: 0, right: 0}, 750);
  // Allow user to reset search
  $("#refresh").click(function() {
    $("#wikibox").animate({bottom: "3em", top: 0, left: 0, right: 0}, 750);
    input = undefined; searchResults = []; searchInfo = []; searchLinks = [];
    $(".contentinfo").remove();
    $("#form")[0].reset();
    });
}
