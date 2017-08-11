/* JavaScript file for Wikipedia Viewer */

var input; var searchResults = [];

$(document).ready(function() {
  results();
  if (searchResults.length > 0) {
    showResults();
  };
});

function results(callback) {
  $("#fail").hide()
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
        $("#wikibox").animate({bottom: "21em", top: 0, left: 0, right: 0});
        $(function() {
          $(document).click(function() {
            $("#wikibox").animate({bottom: "3em", top: 0, left: 0, right: 0});
            $(".nothing").detach()
          });
        });
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
  if (searchResults.length > 0) {
    alert("results!");
    console.log(input);
    console.log(searchResults);
    //$("t_hold").html();
  }
  else {
    alert("No results, please try again.");
    $("#fail").append("<div class='nothing'><p>Sorry, there were no results matching your search.</p><p>The page <span id='failquery'><b>\"" + $("#searchInput").val() + "\"</b></span> does not exist.</p><ul><li>Check that all keywords are spelled correctly</li><li>Try using more general keywords</li><li>Try entering a shorter search if it is too long</li></ul></div>");
    $("#fail").fadeIn(1500);
    console.log(input);
    console.log(searchResults);
  }
};


/*
<p>Sorry, there were no results matching your search.</p>
<p>The page </p>
<ul>
  <li>Check that all keywords are spelled correctly</li>
  <li>Try using more general keywords</li>
  <li>Try entering a shorter search if it is too long</li>
</ul>
*/
