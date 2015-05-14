/* 
 * PrototypeBasics.js:
 * 
 * This file will contain the basics of the Prototype
 * Smartwatch Application we're developing.
 * 
 * Author: George Jackson
 * Date Created: 24/04/2015
 */

var current = "";
var oldCanvas = '<canvas width="' + 320 + '" height="' + 320
        + '" id="' + 'canvas_1"' + 'style="' +
        'border:1px solid #000000;">' +
        'Canvas Tag not Supported by your browser version!' +
        '</canvas>';

var cWidth = 320;
var cHeight = 320;
var sizeParam = 1;//keeps everything relative when size of canvas changes....I think, perhaps not necessary

function getDate() {
    return current;
}

function protoInitialise() {
    refreshInit();

    requestTime();
    writeTime();
    //pollTime();
}

function refreshInit() {
    var homeX = 115 * sizeParam;
    var homeY = 280 * sizeParam;
    var buttonX = (cWidth / 4) * sizeParam;
    var buttonY = 295 * sizeParam;
    var pixelX = ((buttonX) + homeX / 2) * sizeParam;
    var pixelY = (buttonY) * sizeParam;

    $.get("emulatorBasics.js", function () {
        resetCanvas(oldCanvas);
        drawClickRect(homeX, homeY, buttonX, 25 * sizeParam, returnToEmu);
        writeSomething("Home", pixelX, pixelY, 12 * sizeParam);
        drawRect(20 * sizeParam, 10 * sizeParam, buttonX, 25 * sizeParam, "#FF0000");        
        drawCalendar(31, 2);
        writeSomething(currentMonth(), 25 * sizeParam, 25 * sizeParam, 12);
    });
}

/*
 * Intended to draw the calendar dates to the canvas from inside the calendar app
 * Takes number of days in the month and the day to start on
 */
function drawCalendar(daysInMonth, startDay) {
    //Populates the 'screen' with clickable calendar date icons
    var days = 1;
    var beginDays = false;
    var magic = 40;//40 is magic
    var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for (j = 0; j < 6; j++) {
        for (i = 0; i < 7; i++) {
            drawClickRect((magic * i) + 20, (magic * j) + 40, 30, 30, addReminder);
            if(j === 0) writeSomething(daysOfWeek[i], (magic * i) + 25, (magic * j) + 50, 8);
            if(i === startDay && j === 1) beginDays = true;
            if (j > 0 && days <= daysInMonth && beginDays) {
                writeSomething(days, (magic * i) + 25, (magic * j) + 50, 8);
                days++;
            }
        }
    }
}

//Functions for to do when each day is clicked
function addReminder() {
    //add code to actually set dates and stuff, later
}

//Find how many days in the month, possibly need another function for Feb
function daysInMonth(month) {
    var thirtyOne = [0, 2, 4, 6, 7, 9, 11];//maybe not the best way...
    var thirty = [3, 5, 8, 10];//...
}

//http://safalra.com/web-design/javascript/calendar/

/**
 * Function Wrapped-JQuery Call to the emulator
 * Initialise Function - basically to be used like
 * an "exit" or "back" button out of the app.
 * 
 * @returns {undefined}
 */
function returnToEmu() {
    $.get("emulatorBasics.js", function () {
        emulatorInitialise();
    });
}

/**
 * Function Wrapped JQuery Call to the Emulator
 * to grab the time - and set the prototype variable
 * string to hold the current time. 
 * 
 * @returns {undefined}
 */
function requestTime() {
    $.get("emulatorBasics.js", function () {
        current = createTime();
    });
}

/**
 * Function wrapped JQuery call to the Emulator
 * to write the time (coloured black) to the canvas.
 * 
 * @returns {undefined}
 */
function writeTime() {
    $.get("emulatorBasics.js", function () {
        writeSomethingColour(current, cWidth - (cWidth / 4), 25, 12, "#000000");
    });
}

/**
 * Double call to first fetch the current
 * time and then write that time to the canvas
 * on a 1 second interval. (Hence the name
 * "Polling")
 * 
 * @returns {undefined}
 */
function pollTime() {
    setInterval(requestTime, 1000);
    setInterval(writeTime, 1000);
}



