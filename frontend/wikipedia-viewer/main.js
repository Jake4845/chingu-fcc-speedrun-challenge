/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = [];

$(document).ready(function() {
  results();
});

// Store input from search bar when 'enter' is pressed
function results() {
  $('#searchInput').keypress(function(e) {
    if (e.which == 13) {
      input = $("#searchInput").val();

      // Get search data based on input
      $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data) {
        for (var i=0; i<data[1].length; i++){
          searchResults.push(data[1][i]);
        };
      });
      return false;
    };
  })
};
