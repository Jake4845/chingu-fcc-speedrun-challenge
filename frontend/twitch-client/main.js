/* JS for twitch-client app */

// Store stream names
var api = "https://wind-bow.glitch.me/twitch-api/streams/";
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
var fullStream = []; var sData;

$(document).ready(function() {
  fullStream = streams.map(showStreams);
  sData = fullStream.map(streamData);
});


// Get URL for all streams
function showStreams(name) {
  return("" + api + name + "");
};

// Get data for all streams
function streamData(data) {
  $.getJSON("" + data + "", function(data2) {
    console.log(data2);
    console.log(data);
  });
};
