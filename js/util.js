var miliSeconds = 0, seconds = 0, minutes = 0, hours = 0, t;
var houresMsg = "";
var minutesMsg = "";
var secondsMsg = "";
var miliSecondsMsg = "";
var timeMsg = "";

function stopWatch() {
    miliSeconds++;
    if (miliSeconds > 9) {
        miliSeconds = 0;
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            if (minutes > 59) {
                minutes = 0;
                hours++;
            }
        }
    }
    WriteTime();
    timer();
}
function timer() {
    t = setTimeout(stopWatch, 100);
}
function Stop() {
    clearTimeout(t);
}
function clearWatch() {
    document.getElementById("h2").innerHTML = ''
    seconds = 0; minutes = 0; hours = 0, miliSeconds = 0;
    return;
   
}
function WriteTime() {
    if (hours === 0) {
        houresMsg = "00";
    }
    else {
        if (hours < 10) {
            houresMsg = "0" + hours;
        }
        else {
            houresMsg = hours;
        }
    }

    if (minutes === 0) {
        minutesMsg = "00";
    }
    else {
        if (minutes < 10) {
            minutesMsg = "0" + minutes;
        }
        else {
            minutesMsg = minutes;
        }
    }

    if (seconds === 0) {
        secondsMsg = "00";
    }
    else {
        if (seconds < 10) {
            secondsMsg = "0" + seconds;
        }
        else {
            secondsMsg = seconds;
        }
    }
    miliSecondsMsg = miliSeconds;
    timeMsg = houresMsg + ":" + minutesMsg + ":" + secondsMsg + ":" + miliSecondsMsg;
    document.getElementById("h2").innerText = timeMsg;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }




