var xhr = new XMLHttpRequest();
xhr.open('GET', '/videos');
xhr.send(null);

function replaceIFrame(id) {
    var prevIFrame = document.getElementById('video');
    var vidContainer = document.getElementById('vidContainer');
    vidContainer.removeChild(prevIFrame);
    var iframe = document.createElement('iframe');
    iframe.id = 'video';
    iframe.src = 'http://www.youtube.com/embed/' + id + '?autoplay=1';
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
