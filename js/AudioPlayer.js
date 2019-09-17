/* Eric Gurevich
 * Audio Player Widget
 * Instructions:
 * 
 * call function load
 * 
 * load(audio file source url, album art image url, artist name, track name, div where
 * you want your audio player to load)
 * 
 * use playerStyle.css to customize your player appearance
 */

var myaudio;
var playhead;
var duration;

//load html, source, details
function load(source, art, artist, track, content) {
    loadHTML(content);

    myaudio = document.getElementById("myaudio");
    playhead = document.getElementById("playhead");


    myaudio.src = source;

    document.getElementById("currenttime").innerHTML = '00:00:00';

    document.getElementById("albumart").src = art;
    document.getElementById("artist").innerHTML = artist;
    document.getElementById("track").innerHTML = track;

    var button = document.getElementById("playpausebutton");

    button.innerHTML = "Play ▶";

    onLoaded();
}

//load inner html in "content" div
function loadHTML(content) {
    var htmlcontent = "<div id=\"player\">\r\n              \r\n\r\n <div id = \"title\" >Eric's C00L Audio Player</div>                      \r\n            <div id=\"timeindicator\">\r\n                <div id =\"totaltime\" class=\"time\"><\/div>\r\n                <div class=\"time\">\/<\/div>\r\n                <div id =\"currenttime\" class=\"time\"><\/div>  \r\n            <\/div>\r\n            \r\n            \r\n            <img id=\"albumart\">\r\n            \r\n            <div id=\"controls\">\r\n                \r\n                <div id=\"scrubber\">\r\n                    <div id =\"timeline\" onclick=\"seekTime(event)\"><\/div>\r\n                    <div id =\"playhead\" draggable=\"true\"><\/div>\r\n                <\/div>\r\n         \r\n                \r\n                <button id=\"playpausebutton\" class=\"playerbutton\" \r\n                    onclick=\"playPause()\">Play \u25B6<\/button>\r\n                \r\n                <div id=\"artisttrack\">\r\n                    <div id=\"artist\"><\/div>\r\n                    <div id=\"track\"><\/div>\r\n                <\/div>\r\n                \r\n\r\n                <audio id=\"myaudio\"><\/audio>\r\n            <\/div>\r\n            \r\n        <\/div>";
    document.getElementById(content).innerHTML = htmlcontent;
}

//listeners and functions for after inner html loads
function onLoaded() {
    //displays duration of song when song loads
    myaudio.addEventListener("durationchange", function () {
        document.getElementById("totaltime").innerHTML = convertTime(myaudio.duration);
    });

//gets duration of song
    myaudio.addEventListener("canplaythrough", function () {
        duration = myaudio.duration;
    });

//adds listener for change in current time
    myaudio.addEventListener("timeupdate", timeUpdate, false);

//move playhead as current time changes, change current time as time changes
    function timeUpdate() {
        playhead.style.marginLeft = 270 * (myaudio.currentTime / duration) + "px";
        document.getElementById("currenttime").innerHTML = convertTime(myaudio.currentTime);

    }

//lets you drag playhead to seek time
    playhead.addEventListener("dragend", function (event) {
        seekTime(event);
    }, false);



//when song ends, reset playpause button to play
    myaudio.addEventListener("ended", function () {
        var button = document.getElementById("playpausebutton");

        button.innerHTML = "Play ▶";
    });
}

//onClick for playpause button
function playPause() {

    var button = document.getElementById("playpausebutton");

    if (myaudio.paused) {
        myaudio.play();
        button.innerHTML = "Pause ⏸";
    } else {
        myaudio.pause();
        button.innerHTML = "Play ▶";
    }
}

//converts from float secs to time string
function convertTime(secs) {
    var date = new Date(null);
    date.setSeconds(secs); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
}

//gets x offset of playhead
function offset(el) {
    var rect = el.getBoundingClientRect();
    return rect.left + window.scrollX;
}

//onClick called by timeline
function seekTime(event) {
    var xoffset = event.pageX - offset(document.getElementById('timeline'));
    var time = xoffset / 270 * myaudio.duration;
    myaudio.currentTime = time;
}