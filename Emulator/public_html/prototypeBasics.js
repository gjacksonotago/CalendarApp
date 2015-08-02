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
        'border:1px solid #000000; z-index: 0;">' +
        'Canvas Tag not Supported by your browser version!' +
        '</canvas>';
var cWidth = 320;
var cHeight = 320;
var month = 4;
var stringMonth = "May";
var startDay = 5;
var months = 12;
var year = 2015;

var reminderCoords = {};//I think i love these things.
var dayNo = [];
var reminders = {};//Associative array! e.g reminders['31052015'] = reminder;

//Fake enums for display type settings becuase javascript does not enum properly
var TODAY = 1000;//arbitrary values (can we make these final/immutable somehow?
var WEEK = 1001;
var MONTH = 1002;
var displayType = MONTH;//Determines which display we want for the calendar (month, day, week)
//defaults to TODAY.

var savedMonth = month;
var savedDay = startDay;
var savedYear = year;

var reminderText = "";

//var sizeParam = 1;//probably not going to be used. For changing size of icons relative to canvas size

function getDate() {
    return current;
}

function saveState(month, startday, savetheyear) {
    savedMonth = month;
    savedDay = startday;
    savedYear = savetheyear;
}

function returnToCalendar(month_passed, startday, savetheyear) {
    month = month_passed;
    year = savetheyear;
    changeMonth(month);
    startDay = startday;
    refreshInit(daysInMonth(month), startday);
}

/**
 * A function to get the text from
 * an HTML input tag and save it locally.
 * 
 * It assumes there a) is actually text in the input
 * field, b) is a button or some other event in the HTML
 * to call this method, c) the prototype is loaded in the HTML
 * document so this method may be called and d) that there is 
 * a return button or something of the sort below cHeight-160
 * so that is never cleared - and thus that the text will never
 * be written that far down the canvas without some kind of scroll
 * bar.
 * 
 * Author: George Jackson
 * 
 * @returns {undefined}
 */
function getReminderText() {
    $("emulatorBasics.js", function () {
        reminderText = getFormText();
        console.log("remindertext: " + reminderText);
        //This is assuming that the return button is a set
        // height and in the position from the bottom of the
        // canvas.
        clearThis(15, (cHeight/4)-20, cWidth, cHeight-160);
        writeSomethingColour(reminderText, 25, cHeight / 4, 15, "#000000");
    });
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
    initMonth();
    startDay = setDay();
    refreshInit(daysInMonth(month), startDay);
    //pollTime();
}

/**
 * Creates a new date object to set the date
 * to the first of the month, so that it returns
 * the correct number of the day of the week of
 * the first of the month.
 * 
 * @returns {Number}
 */
function setDay() {
    var newDay = new Date();
    //set to the first of the month, because
    //0 is the last day of the previous month.
    newDay.setDate(1);
    return newDay.getDay();
}

/**
 * Function that sets up the Prototype, starting with
 * a "home" button - but hopefully more will be added.
 * @returns {undefined}
 */
function refreshInit() {
    if (displayType === MONTH) {
        displayMonth(daysInMonth(month), startDay);
    } else if (displayType === TODAY) {
        //call day drawing method
    } else if (displayType === WEEK) {
        //call week method
    }
}

function displayDay() {
    var homeX = 115;
    var homeY = 295;
    //Home Button: Or back button instead? Just something.
    drawClickRect(homeX, homeY, buttonX, 25, returnToEmu, true);
    writeSomething("Home", pixelX, pixelY, 12);
}

/**
 * @param {int} daysformonth
 * @param {int} startDay
 * 
 * @returns {undefined}
 */
function displayMonth(daysformonth, startDay) {
    var homeX = 115;
    var homeY = 295;
    var buttonX = (cWidth / 4);
    var buttonY = 310;
    var pixelX = ((buttonX) + homeX / 2);
    var pixelY = (buttonY);

    $.get("emulatorBasics.js", function () {
        resetCanvas(oldCanvas);
        //Home button
        drawClickRect(homeX, homeY, buttonX, 25, returnToEmu, true);
        writeSomething("Home", pixelX, pixelY, 12);
        //Month display rectangle
        drawRect(20, 10, buttonX + 10, 25, "#FF0000");
        writeSomething(stringMonth + " " + year, 25, 25, 12);
        //Back & forward month buttons
        drawColourRect(25 + (buttonX + 10), 10,
                15, 25, reverseMonth, true, "#FF0000");
        writeSomething("<", 30 + (buttonX + 10), 25, 12);
        drawColourRect(45 + (buttonX + 10), 10,
                15, 25, advanceMonth, true, "#FF0000");
        writeSomething(">", 50 + (buttonX + 10), 25, 12);
        //days of month for month display
        drawCalendar(daysformonth, startDay);

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

    var j, i;
    for (j = 0; j < 7; j += 1) {
        for (i = 0; i < 7; i += 1) {
            if (j === 0) {
                //Smaller squares for the days of the week at the beginning
                drawRect((gapSize * i) + 20, (gapSize * j) + 40, 30, 15, "#000000");

            } else {
                //Larger boxes for the actual days - because otherwise a full month
                //doesn't fit on the "screen"
                drawRect((gapSize * i) + 20, (gapSize * j) + 20, 30, 30, "#FFFFFF");
            }
            //Writes the days of the week text.
            if (j === 0) {
                writeSomething(daysOfWeek[i], (gapSize * i) + 25, (gapSize * j) + 50, 8);
            }
            if (i === startDay && j === 1) {
                beginDays = true;
            }
            if (j > 0 && days < daysInMonth && beginDays) {
                var jcoord = (gapSize * j) + 20;
                var icoord = (gapSize * i) + 20;

                days += 1;
                dayNo[days] = days;
                var key = icoord + "" + jcoord;
                reminderCoords[key] = days;

                //Function wrapped to prevent evaluation on passing as function.
                //Please don't make this a "new function" ever.
                var func = function (x, y) {
                    var r = x + "" + y;
                    addReminder(reminderCoords[r]);
                };
                drawPositionRect(icoord, jcoord, 30, 30, func);
                writeSomething(days, icoord + 5, jcoord + 10, 8);

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
 * @param {integer} day The Day that was clicked on. Used to
 *                      automatically add a reminder to an associative
 *                      array.
 */
function addReminder(day) {

    //ADDING A REMINDER!
    var key = day + (month + 1) + year;
    var reminderDate;
    $.get("reminder.js", function () {
        reminders[key] = new Reminder(day, month + 1, year);
        reminderDate = reminders[key].print();
        console.log(reminders[key].print());
    });
    //REMINDER COMPLETE!
    
    //Saving and restoring canvas context doesn't work
    // as we've not actually drawn anything there. It's 
    // all javascript, so I just reinitialise the prototype
    // instead. We'll need to create a custom script to "store"
    // the current month they were on last to send them back to that.
    var canvasreminder = 'canvas_1';

    $.get("emulatorBasics.js", function () {
        newCanvas(320, 320, canvasreminder);
        saveState(month, startDay, year);
        var returnFunc = function () {
            returnToCalendar(savedMonth, savedDay, savedYear);
        };
        drawColourRect(25, cHeight - 35, 15, 25, returnFunc, true, "#FFFFFF");
        writeSomething("Click to return!", 50, cHeight - 15, 12);

        writeSomethingColour(reminderDate, 50, 40, "12", "black");
    });
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
}

/**
 * Reverses the month by calculating a start day as an offset and populating 
 * the calendar with however many days are in that month.
 * 
 * @returns {undefined}
 */
function reverseMonth() {
    console.log("reversal: " + month + " " + startDay);
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
    startDay = (((tmp % 7) + 7) % 7); //Sneaky negative modulo trick!
    refreshInit(newDays, startDay);
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
        stringMonth = monthToString(currentMonth());
        month = currentMonth();
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
    for (i = 0; i < 12; i += 1) {
        if (stringMonths[i] === monthString) {
            return i;
        }
    }
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
