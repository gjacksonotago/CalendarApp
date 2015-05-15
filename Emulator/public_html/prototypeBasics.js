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
var month = 4;
var stringMonth = "May";
var startDay = 5;
var endDay = 0;
var months = 12;
var year = 2015;

//This'll be used to calculate the offset of the months and such for years
//before and after this year.
var baseYear = 2015;
var baseDay = 5;
var baseMonth = 4;

var sizeParam = 1;//keeps everything relative when size of canvas changes....I think, perhaps not necessary

function getDate() {
    return current;
}

/**
 * Initialises the Prototype
 * by calling the refresh method to reset and
 * repaint to the canvas, and then by pulling 
 * and writing the current time to the canvas in
 * the corner.
 * 
 * @returns {undefined}
 */
function protoInitialise() {
    refreshInit(daysInMonth(month), startDay);
    //pollTime();
}

/**
 * Function that sets up the Prototype, starting with
 * a "home" button - but hopefully more will be added.
 * 
 * @returns {undefined}
 */
function refreshInit(daysformonth, startDay) {
    var homeX = 115 * sizeParam;
    var homeY = 294 * sizeParam;
    var buttonX = (cWidth / 4) * sizeParam;
    var buttonY = 310 * sizeParam;
    var pixelX = ((buttonX) + homeX / 2) * sizeParam;
    var pixelY = (buttonY) * sizeParam;

    $.get("emulatorBasics.js", function () {
        resetCanvas(oldCanvas);
        drawClickRect(homeX, homeY, buttonX, 25 * sizeParam, returnToEmu);
        writeSomething("Home", pixelX, pixelY, 12 * sizeParam);
        drawRect(20 * sizeParam, 10 * sizeParam, buttonX, 25 * sizeParam, "#FF0000");
        drawCalendar(daysformonth, startDay);
        writeSomething(stringMonth, 25 * sizeParam, 25 * sizeParam, 12);
        drawColourRect(25 + buttonX * sizeParam, 10 * sizeParam,
                15, 25 * sizeParam, reverseMonth, "#FF0000");
        writeSomething("<", 30 + buttonX, 25, 12);
        drawColourRect(45 + buttonX * sizeParam, 10 * sizeParam,
                15, 25 * sizeParam, advanceMonth, "#FF0000");
        writeSomething(">", 50 + buttonX, 25, 12);
    });
    requestTime();
    writeTime();
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
    for (j = 0; j < 7; j++) {
        for (i = 0; i < 7; i++) {
            if (j === 0) {
                //Smaller squares for the days of the week at the beginning
                drawClickRect((magic * i) + 20, (magic * j) + 40, 30, 15, addReminder);
            } else {
                //Larger boxes for the actual days - becuase otherwise a full month
                //doesn't fit on the "screen"
                drawClickRect((magic * i) + 20, (magic * j) + 20, 30, 30, addReminder);
            }
            //Writes the days of the week text.
            if (j === 0)
                writeSomething(daysOfWeek[i], (magic * i) + 25, (magic * j) + 50, 8);
            if (i === startDay && j === 1)
                beginDays = true;
            if (j > 0 && days <= daysInMonth && beginDays) {
                writeSomething(days, (magic * i) + 25, (magic * j) + 30, 8);
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
function daysInMonth(month, year) {
    //http://www.timeanddate.com/date/leapyear.html
    //I'll use this to calc Febs days
    var thirtyOne = [0, 2, 4, 6, 7, 9, 11];//maybe not the best way...
    var thirty = [3, 5, 8, 10];//...

    if (month === 1 && (year % 4 === 0) && ((year % 100 !== 0) | (year % 400 === 0))) {
        return 29;
    } else if (month === 1) {
        return 28;
    } else {
        for (i = 0; i < 4; i++) {
            if (thirty[i] === month) {
                return 30;
            }
        }
        for (i = 0; i < 7; i++) {
            if (thirtyOne[i] === month) {
                return 31;
            }
        }
    }
}

/**
 * This is the function used by clicking the
 * Next Month button to advance the Calendar by
 * a Month.
 * 
 * @returns {undefined}
 */
function advanceMonth() {
    var d = new Date();
    if (month < 11) {
        month++;
        changeMonth(month);
        d.setFullYear(year, month);
        startDay = d.getDay();
    } else {
        month = 0;
        changeMonth(month);
        year++;
        d.setFullYear(year, month);
        startDay = d.getDay();
    }
    var newDays = daysInMonth(month, year);
    refreshInit(newDays, startDay);
    endDay = (((startDay + newDays) - 1) % 7);

    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("End Day of " + month + " is " + endDay);
    });
}

function reverseMonth() {
    var d = new Date();
    
    if(startDay > 1) {
        endDay = (startDay - 1);
    } else {
        endDay = 6;
    }
    
    if (month > 0) {
        d.setFullYear(year, month-1);
        month--;
        changeMonth(month);
        startDay = d.getDay();
    } else {
        d.setFullYear(year-1, 11);
        month = 11;
        changeMonth(month);
        year--;
        startDay = d.getDay();
    }
    var newDays = daysInMonth(month, year);
    refreshInit(newDays, startDay);

    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("Start Day of " + month + " is " + startDay);
    });
}

/**
 * Sets up all the Month related variables,
 * but may not be needed.
 * 
 * @returns {undefined}
 */
function initMonth() {
    $.get("emulatorBasics.js", function () {
        stringMonth = currentMonth();
        month = monthToInt(currentMonth);
    });
    endDay = startDay + daysInMonth(month, year);
}

/**
 * Just a small function to change the
 * string held representation of the 
 * month that the calendar is displaying.
 * 
 * @param {type} month
 * @returns {undefined}
 */
function changeMonth(month) {
    stringMonth = monthToString(month);
}

function monthToString(month) {
    var stringMonths = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];

    for (i = 0; i < 12; i++) {
        //console.log(stringMonths + " " + month);
        return stringMonths[month];
    }
}

function monthToInt(monthString) {
    var stringMonths = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];

    for (i = 0; i < 12; i++) {
        if (stringMonths[i] === monthString) {
            return i;
        }
    }
}

//Find out when the month starts
function calcStartDay(month, year) {
    d.setFullYear(year, month);
    return d.getDay();
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
 * Makes use of the Canvas clearRect method called
 * through JQuery from the emulator script.
 * 
 * @returns {undefined}
 */

function writeTime() {
    $.get("emulatorBasics.js", function () {
        clearThis(cWidth - (cWidth / 4), 15, 125, 15);
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
    setInterval(requestTime, 960);
    setInterval(writeTime, 1000);
}

/**
 * Function Wrapped JQuery call to 
 * reset the canvas using the emulator
 * method.
 * 
 * @returns {undefined}
 */
function resetWrap() {
    $.get("emulatorBasics.js", function () {
        resetCanvas(oldCanvas);
    });
}
