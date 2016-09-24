var canvas = null;
var context = null;
var time = 0;
var intervalId = 0;

var makeNoise = function() {
    var imgd = context.createImageData(canvas.width, canvas.height);
    var pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
        var c = 7 + Math.sin(i / 50000 + time / 7); // A sine wave of the form sin(ax + bt)
        pix[i] = pix[i + 1] = pix[i + 2] = 40 * Math.random() * c; // Set a random gray
        pix[i + 3] = 255; // 100% opaque
    }

    context.putImageData(imgd, 0, 0);
    time = (time + 1) % canvas.height;
};

var setup = function() {
    canvas = document.getElementById("static");
    context = canvas.getContext("2d");
};

document.addEventListener("DOMContentLoaded", function() {
    setup();
    intervalId = setInterval(makeNoise, 50);
});
