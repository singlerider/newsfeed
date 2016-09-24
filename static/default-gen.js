// constants
var SUGGESTED_QUALITY = 'hd720';
var SECONDS_BETWEEN_VIDEOS = 5;
var STATIC_DURATION = 1;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function generateYouTubeLink(id) {
    return 'http://www.youtube.com/embed/' + id;
}

function showStatic() {
    var staticContainer = document.getElementById('static');
    staticContainer.className += ' show-static';
}

function hideStatic() {
    var staticContainer = document.getElementById('static');
    staticContainer.className = 'static-container';
}

function transitionVideo(id) {
    var startSeconds = 0;
    showStatic();
    player.loadVideoByUrl(generateYouTubeLink(id), startSeconds, SUGGESTED_QUALITY);
    player.mute();
    player.playVideo();
    setTimeout(hideStatic, STATIC_DURATION * 1000);
    vidContainer.appendChild(iframe);
}

function setTimer(data) {
    window.setInterval(function() {
        var randomId = data.videos[Math.floor(Math.random() * data.videos.length)]._id;
        transitionVideo(randomId);
    }, SECONDS_BETWEEN_VIDEOS * 1000);
}

function onPlayerReady(event) {
    player.mute();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/videos');
    xhr.send(null);
    xhr.onreadystatechange = function() {
        showStatic();
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            hideStatic();
            if (xhr.status === OK) {
                var response = JSON.parse(xhr.responseText);
                var data = response.videos;
                setTimer(data);
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.UNSTARTED) {
        event.target.playVideo();
    }
}

function stopVideo() {
    player.stopVideo();
}

function onYouTubeIframeAPIReady(data) {
    player = new YT.Player('player', {
        height: '720',
        width: '1280',
        videoId: 'zBS2fBdTsxA',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'iv_load_policy': 3
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
