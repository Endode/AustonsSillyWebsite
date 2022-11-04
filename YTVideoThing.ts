function runWhenDoneLoading() {
  //var endodeID = "UCErq0Ms_zWefj4MQVuNuXCA";

  var iframes = document.getElementsByClassName('latestVideoEmbed');

  videoID = "AjWfY7SnMBI";

  for (var i = 0, len = iframes.length; i < len; i++) {
    //loadVideo(iframes[i]);
    convertToLink(iframes[i]);
  }
}

var videoID;

document.addEventListener('DOMContentLoaded', runWhenDoneLoading);

var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");
function loadVideo(iframe) {
  $.getJSON(reqURL + iframe.getAttribute('cid'),
    function(data) {
      var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
      console.log("videoNumber: " + videoNumber);
      var link = data.items[videoNumber].link;
      id = link.substr(link.indexOf("=") + 1);
      iframe.setAttribute("src", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1");
    }
  );
}

function setVideoID(iframe) {
  $.getJSON(reqURL + iframe.getAttribute('cid'),
    function(data) {
      var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
      console.log("videoNumber: " + videoNumber);
      var link = data.items[videoNumber].link;
      console.log("Before: " + videoID);
      videoID = link.substr(link.indexOf("=") + 1);
      console.log("After: " + videoID);
      setiframe(iframe, videoID);
    }
  );
}

function setiframe(iframe, vidID){
  var thumbnailReqURL = "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg";
  iframe.setAttribute("src", thumbnailReqURL);
  iframe.setAttribute("href", "https://www.youtube.com/watch?v=" + videoID);
}

function convertToLink(iframe) {
  setVideoID(iframe);
  var thumbnailReqURL = "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg";
  console.log(thumbnailReqURL);
}
