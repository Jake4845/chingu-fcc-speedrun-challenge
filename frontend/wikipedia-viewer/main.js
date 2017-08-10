/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = [];

$(document).ready(function() {
  results();
});

// Store input from search bar when 'enter' is pressed
function results() {
  $("#searchInput").keypress(function(e) {
    if (e.which == 13) {

      // Animate positioning
      $("#wikibox").animate({marginTop: "-=10%"});
      $(function() {
        $(document).click(function() {
          $("#wikibox").animate({top: $(window).height()/4});
        });
      });

      // Clear results each time 'enter'
      searchResults = [];
      input = $("#searchInput").val();

      // Get search data based on input
      if (input) {
        $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
          for (var i=0; i<data[1].length; i++){
            searchResults.push(data[1][i]);
          }
        });
      }

      // If nothing is entered, alert user
      else {alert("Please enter something into the search field");}

    return false;
    }
  });
};
