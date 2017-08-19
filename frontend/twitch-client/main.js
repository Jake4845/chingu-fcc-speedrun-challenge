/* JS for twitch-client app */

// Store stream names
var api = "https://wind-bow.glitch.me/twitch-api/streams/";
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

$(document).ready(function() {
  // Loop through all streams for data
  streams.map(showStreams).map(streamData);
});


// Get URL for all streams
function showStreams(name) {
  return("" + api + name + "");
};

// Get data for all streams
function streamData(data) {
  $.getJSON("" + data + "", function(data2) {
    console.log(data2);
    if (data2.stream) {
      console.log("online");
      // Create new div for every stream online
      $(".onbox").append("<div class='online'><div class='left'><p class='t-title'>" + data2.stream.channel.display_name + "</p><p class='t-desc'>" + data2.stream.channel.status + "</p></div><div class='right'><span class='statuson'></span></div></div>");
    }
    else {
      console.log("offline");
      // Create new div for every stream offline
      $(".offbox").append("<div class='offline'><div class='left'><p class='t-title'>" + (data2._links.channel).slice(38) + "</p></div><div class='right'><span class='statusoff'></span></div></div>")
    }
  });
};
