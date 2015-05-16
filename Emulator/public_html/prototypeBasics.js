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
var startDay = 5;//same question as below
var endDay = 0;//end day for what? the year, the week or the month?
var months = 12;
var year = 2015;

//This'll be used to calculate the offset of the months and such for years
//before and after this year.
var baseYear = 2015;
var baseDay = 5;
var baseMonth = 4;

//var sizeParam = 1;//probably not going to be used. For changing size of icons relative to canvas size

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
    var homeX = 115;
    var homeY = 294;
    var buttonX = (cWidth / 4);
    var buttonY = 310;
    var pixelX = ((buttonX) + homeX / 2);
    var pixelY = (buttonY);

    $.get("emulatorBasics.js", function () {
        resetCanvas(oldCanvas);
        drawClickRect(homeX, homeY, buttonX, 25, returnToEmu);
        writeSomething("Home", pixelX, pixelY, 12);
        drawRect(20, 10, buttonX + 10, 25, "#FF0000");
        drawCalendar(daysformonth, startDay);
        writeSomething(stringMonth + " " + year, 25, 25, 12);
        drawColourRect(25 + (buttonX + 10), 10,
                15, 25, reverseMonth, "#FF0000");
        writeSomething("<", 30 + (buttonX + 10), 25, 12);
        drawColourRect(45 + (buttonX + 10), 10,
                15, 25, advanceMonth, "#FF0000");
        writeSomething(">", 50 + (buttonX + 10), 25, 12);
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
    var gapSize = 40;//distance between individual date squares
    var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for (j = 0; j < 7; j++) {
        for (i = 0; i < 7; i++) {
            if (j === 0) {
                //Smaller squares for the days of the week at the beginning
                drawRect((gapSize * i) + 20, (gapSize * j) + 40, 30, 15, "#000000");
            } else {
                //Larger boxes for the actual days - becuase otherwise a full month
                //doesn't fit on the "screen"
                drawClickRect((gapSize * i) + 20, (gapSize * j) + 20, 30, 30, addReminder);
            }
            //Writes the days of the week text.
            if (j === 0)
                writeSomething(daysOfWeek[i], (gapSize * i) + 25, (gapSize * j) + 50, 8);
            if (i === startDay && j === 1)
                beginDays = true;
            if (j > 0 && days <= daysInMonth && beginDays) {
                writeSomething(days, (gapSize * i) + 25, (gapSize * j) + 30, 8);
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

    //Using the array didn't work, no idea why, but anyway no point in looping through an array for one thing
    //having a long if statement is much more efficient and sensible in this case, now it works
    //var thirty = [3, 5, 8, 10];//...

    if (month === 1 && (year % 4 === 0) && ((year % 100 !== 0) | (year % 400 === 0))) {
        return 29;
    } else if (month === 1) {
        return 28;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        console.log("30 days this month" + month);
        return 30;
    } else {
        console.log("31 days this month" + month);
        return 31;
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
    startDay = (startDay + daysInMonth(month, year)) % 7;
    if (month < 11) {
        month++;
        changeMonth(month);
    } else {
        month = 0;
        changeMonth(month);
        year++;
    }
    var newDays = daysInMonth(month, year);
    refreshInit(newDays, startDay);
    
    //Do we need end day?
    endDay = (((startDay + newDays) - 1) % 7);
    
    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("End Day of " + month + " is " + endDay);
    });
}

function reverseMonth() {
    //var d = new Date();
    //3+31 % 7 = 6; 34-3 % 7 = 31 % 7 = 3
    //? I fail to see the point in end day
    if (startDay > 1) {
        endDay = (startDay - 1);
    } else {
        endDay = 6;
    }

    if (month > 0) {
        //d.setFullYear(year, month - 1);
        month--;
        changeMonth(month);
        //startDay = (startDay - 
    } else {
        //d.setFullYear(year - 1, 11);
        month = 11;
        changeMonth(month);
        year--;
        //startDay = d.getDay();
    }
    refreshInit(daysInMonth(month, year), startDay);

    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("End Day of " + month + " is " + endDay);
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
 * month that the calendar is displaying.
 * 
 * @param {int} month
 * @returns {undefined}
 */
function changeMonth(month) {
    stringMonth = monthToString(month);
}

/** 
 * Changes an integer month value into the name/string version
 * 
 * @param {int} month
 * @returns {String}
 */
function monthToString(month) {
    var stringMonths = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];
    if (month < 12 && month >= 0)
        return stringMonths[month];
// Sometimes, you don't actually need a loop...
//    for (i = 0; i < 12; i++) { 
//        //console.log(stringMonths + " " + month);
//        return stringMonths[month];
//    }
}

/** 
 * Changes string into integer value for any month
 * 
 * @param {String} monthString
 * @returns {Number|i}
 */
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
//THIS METHOD: It makes no sense at all, and does not work, i guess it is old and forgotten?
function calcStartDay(month, year) {
    var d = new Date();
    d.setFullYear(year, month);
    return d.getDay();
}

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
        writeSomethingColour(current.substring(0, 11), cWidth - (cWidth / 4), 25, 12, "#000000");
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
