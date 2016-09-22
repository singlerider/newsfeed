var xhr = new XMLHttpRequest();
xhr.open('GET', '/videos');
xhr.send(null);

function showStatic() {
    var staticContainer = document.getElementById('static');
    staticContainer.className += ' show-static';
}

function hideStatic() {
    var staticContainer = document.getElementById('static');
    staticContainer.className = 'static-container';
}

function replaceIFrame(id) {
    var prevIFrame = document.getElementById('video');
    var vidContainer = document.getElementById('vid-container');
    vidContainer.removeChild(prevIFrame);
    var iframe = document.createElement('iframe');
    showStatic();
    setTimeout(hideStatic, 1000);
    iframe.id = 'video';
    iframe.src = 'http://www.youtube.com/embed/' + id + '?autoplay=1&controls=0';
    iframe.className = 'video';
    iframe.volume=0;
    vidContainer.appendChild(iframe);
}

function setTimer(data) {
    window.setInterval(function() {
        var randomId = data.videos[Math.floor(Math.random() * data.videos.length)]._id;
        replaceIFrame(randomId);
    }, 5 * 1000);
}

xhr.onreadystatechange = function() {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
            var response = JSON.parse(xhr.responseText);
            var data = response.videos;
            setTimer(data);
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
    }
};
