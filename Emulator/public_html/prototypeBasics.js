/* 
 * PrototypeBasics.js:
 * 
 * This file will contain the basics of the Prototype
 * Smartwatch Application we're developing.
 * 
 * Authors: George Jackson, Ben Ryan
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
var months = 12;
var year = 2015;

var jcoords = [];
var icoords = [];
var dayNo = [];

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
        drawClickRect(homeX, homeY, buttonX, 25, returnToEmu, true);
        writeSomething("Home", pixelX, pixelY, 12);
        drawRect(20, 10, buttonX + 10, 25, "#FF0000");
        drawCalendar(daysformonth, startDay);
        writeSomething(stringMonth + " " + year, 25, 25, 12);
        drawColourRect(25 + (buttonX + 10), 10,
                15, 25, reverseMonth, true, "#FF0000");
        writeSomething("<", 30 + (buttonX + 10), 25, 12);
        drawColourRect(45 + (buttonX + 10), 10,
                15, 25, advanceMonth, true, "#FF0000");
        writeSomething(">", 50 + (buttonX + 10), 25, 12);
    });
    requestTime();
    writeTime();
    //Allow swipes to change month
    swipeMonth();
}

/*
 * Draws the calendar dates to the canvas from inside the calendar app
 * Takes number of days in the month and the day to start on
 */
function drawCalendar(daysInMonth, startDay) {
    //Populates the 'screen' with clickable calendar date icons
    var days = 0;
    var beginDays = false;
    var gapSize = 40;//distance between individual date squares
    var daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    dayNo[0] = 0;

    for (j = 0; j < 7; j++) {
        for (i = 0; i < 7; i++) {
            if (j === 0) {
                //Smaller squares for the days of the week at the beginning
                drawRect((gapSize * i) + 20, (gapSize * j) + 40, 30, 15, "#000000");
                jcoords[j] = 0;
                icoords[i] = 0;
            } else {
                //Larger boxes for the actual days - because otherwise a full month
                //doesn't fit on the "screen"
                drawRect((gapSize * i) + 20, (gapSize * j) + 20, 30, 30, "#FFFFFF");
            }
            //Writes the days of the week text.
            if (j === 0)
                writeSomething(daysOfWeek[i], (gapSize * i) + 25, (gapSize * j) + 50, 8);
            if (i === startDay && j === 1)
                beginDays = true;
            if (j > 0 && days < daysInMonth && beginDays) {
                var jcoord = (gapSize * j) + 20;
                var icoord = (gapSize * i) + 20;
                jcoords[j] = jcoord;
                icoords[i] = icoord;
                days++;
                dayNo[days] = days;
                var func = function() {
                    addReminder(jcoord, icoord, days);
                };
                drawClickRect((gapSize * i) + 20, (gapSize * j) + 20, 30, 30, func, false);
                writeSomething(days, (gapSize * i) + 25, (gapSize * j) + 30, 8);
                
            }
        }
    }
}

/**
 * Creates a reminder when a calendar day is double-clicked on.
 * Currently working on being able to have user entered text and
 * date/times.
 * 
 * Alerts to be done later, along with recurring events.
 * 
 * @param {integer} x the x co-ordinate of the box that was clicked.
 * @param {integer} y the y co-ordinate of the box that was clicked.
 * @param {integer} day the day number (as an int) to hold on to.
 * @returns {undefined}
 */
function addReminder(x, y, day) {
    var offset = 15;
    var init = function () { refreshInit(daysInMonth(month), startDay); };

    for (j = 0; j < 7; j++) {
        for (i = 0; i < 7; i++) {
            console.log("Listing saved coords j: " + j + " " + jcoords[j] 
                    + " i: " + i + " " + icoords[i]);
            if ((icoords[i] === x) && (jcoords[j] === y)) {
                printMessage("Y is " + i + " and X is " + j);
            }
        }
    }
    
    var c = returnCanvas();
    var input;
    var str = dayNo[day];
    var i = day;
    //debugging code (obviously)
    console.log(dayNo);
    
    /** 
     * This library was downloaded from 
     * http://goldfirestudios.com/blog/108/CanvasInput-HTML5-Canvas-Text-Input
     * on 18th May 2015. (The lib was on github, link to their
     * github is on that site.
     * 
     * MAYBE I WANT TO DO THIS INSTEAD:
     * http://jsfiddle.net/fmnBa/
     * 
     * It's HTML text input with an HTML button, so I'm not sure it'll
     * be able to go 'over' the canvas, but I'm sure as hell gonna try.
     */
    $.get("CanvasInput-master/CanvasInput.js", function() {
        input = new CanvasInput({
            canvas: c,
            x: (320/3) + 15,
            y: 50,
            onsubmit: function() {
                str = input.selectText();
                writeSomethingColour(str, offset + 10, offset + 25, 20, "#000000");
            },
            placeHolder: "Name your Reminder."
        });
    });
    
    //function wrapped so that I can pass arguments without immediate eval.
    var init = function () {
        refreshInit(daysInMonth(month), startDay);
    };
    //These create the great white square and the boundaries to get rid of it.
    drawRect(offset, offset, cWidth - (offset * 2), cHeight - (offset * 2), "#FFFFFF");
    singleMouseClick(0, 0, offset, cHeight, init);
    singleMouseClick(0, 0, cWidth, 15, init);
    singleMouseClick(cWidth - (offset), 0, offset, cHeight, init);
    singleMouseClick(0, cHeight - (offset), cWidth, offset, init);

}

//Find how many days in the month, given month and year.
function daysInMonth(month, year) {
    if (month === 1 && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) {
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

    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("Start Day of " + month + " is " + startDay);
    });
}

/**
 * Reverses the month by calculating a start day as an offset and populating 
 * the calendar with however many days are in that month.
 * 
 * @returns {undefined}
 */
function reverseMonth() {
    if (month > 0) {
        month--;
        changeMonth(month);
    } else {
        month = 11;
        changeMonth(month);
        year--;
    }
    newDays = daysInMonth(month, year);
    tmp = startDay - newDays;
    startDay = ((tmp % 7) + 7) % 7; //Sneaky negative modulo trick!
    refreshInit(newDays, startDay);

    //Bug checking coooode!
    $.get("emulatorBasics.js", function () {
        printMessage("Start Day of " + month + " is " + startDay);
    });
}

//Enables swiping screen to change the month back and forth.
function swipeMonth() {
    $.get("emulatorBasics.js", function () {
        //Returns undefined because there's no swipe on initialisation.
        swipe(reverseMonth, advanceMonth, false, false);
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
    if (month < 12 && month >= 0) {
        return stringMonths[month];
    } else {
        console.log("Error: Month number out of range (0-11)");
    }
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
