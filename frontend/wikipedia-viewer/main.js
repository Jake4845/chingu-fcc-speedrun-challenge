/* JavaScript file for Wikipedia Viewer */

var input;

function results() {
  $("#searchInput").bind('keypress', function(event) {
    if (event.keyCode == 13) {
      input = document.getElementById('searchInput').value
      event.preventDefault();
    };
  });
};


$(document).ready(function() {
  results();
});
