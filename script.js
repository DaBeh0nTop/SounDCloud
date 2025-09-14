let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: '',
    playerVars: {
      autoplay: 0,
      controls: 0
    }
  });
}

function playMusic() {
  let url = document.getElementById("youtubeLink").value;
  let videoId = extractVideoID(url);

  if (videoId) {
    // Load the video
    player.loadVideoById(videoId);

    // Show the thumbnail as cover
    let coverDiv = document.getElementById("cover");
    coverDiv.innerHTML = `<img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="cover">`;
  } else {
    alert("Invalid YouTube link!");
  }
}

function extractVideoID(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9_-]{11})/;
  let match = url.match(regex);
  return match ? match[1] : null;
}
