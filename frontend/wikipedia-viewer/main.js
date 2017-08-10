/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = [];

$(document).ready(function() {
  results();
});

function results() {
  // Store input from search bar when button pressed
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

        // Animate positioning
        $("#wikibox").animate({bottom: "15em", top: 0, left: 0, right: 0});
        $(function() {
          $(document).click(function() {
            $("#wikibox").animate({bottom: "3em", top: 0, left: 0, right: 0});
          });
        });
        
      });
    }

    // If nothing is entered, alert user
    else {alert("Please enter something into the search field");}
    return false;
  });

  // Store input from search bar when 'enter' pressed
  $("#searchInput").keypress(function(e) {
    if (e.which == 13) {
      $("#hitSearch").click();
    return false;
    }
  });
};
