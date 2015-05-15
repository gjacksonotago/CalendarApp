/* 
 * emulatorBasics.js:
 * 
 * These functions grab the current Time and convert it to a string
 * and from there, colour a canvas, and write the Time as a Text element
 * to the Canvas.
 * 
 * Authors: George Jackson, Ben Ryan
 * Date Created: 24/04/2015
 */



//Global variables
var canvasHeight, canvasHeight;
//The String Messages currently written for testing
var message, sqMes, swipeDir;
//These string are used for rewriting the canvas to a larger size
var oldCanvas = '<canvas width="' + 320 + '" height="' + 320
        + '" id="' + 'canvas_1"' + 'style="' +
        'border:5px solid #000000;">' +
        'Canvas Tag not Supported by your browser version!' +
        '</canvas>';
var canvasString =
        '<canvas width="' + (canvasHeight + 20) + '" height="' + (canvasHeight + 20) +
        '" id="' + 'canvas_1"' +
        'style="' + 'border:5px solid #000000;"' + '>' +
        '</canvas>';

/*
 * These functions are used for the mouse cordinates
 */
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 100);

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//============================================================//


/*
 * These functions are used for writing the time to the canvas
 */

//Gets and returns the Current Time as a String
function createTime() {
    //Grab the Time and make it a String
    var currentTime = new Date();
    var stringTime = currentTime.toLocaleTimeString();
    return stringTime;
}

//Gets and Returns the Current Date as a String
function currentDate() {
    var currentDate = new Date();
    var stringDate = currentDate.toLocaleDateString();
    return stringDate;
}
//Returns just the month in words i.e May, June etc. IS A LITTLE OBSOLETE NOW
//function currentMonth() {   
//    var month = new Date();
//    var monthString = month.getMonth();
//    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//    for (i < 0; i < months.length; i++) {
//        if (i === Number(monthString)) return months[i] + "THIS SHOULD WORK!";
//    }
//    return monthString;//curently just returning the number because i cannot get it to WORK!
//}


//Returns just the month in words i.e May, June etc.
function currentMonth() {
    var month = new Date();
    var monthString = month.toDateString().toString().substring(4, 7);
    return monthString;
}

/* Function called to 'begin' the emulator:
 * Simulates an OS starting up by showing the apps lined
 * up to click.
 * 
 * @returns Nothing is Returned.
 */
function emulatorInitialise() {
    //Create the Canvas stuff
    resetCanvas(oldCanvas);
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    //ctx.clear();
    canvasWidth = c.width;
    canvasHeight = c.height;
    var offset = 60;
    //Emulator screen event listener
    swipe();

    //Populates the 'screen' with clickable 'app' icons
    for (j = 0; j < 5; j++) {
        for (i = 0; i < 5; i++) {
            if (i === 2 && j === 2) {
                createPrototype(10 + (i * offset), 10 + (j * offset),
                        50, 50);
            } //else {
            //  drawClickRect(10 + (i * offset), 10 + (j * offset),
            //          50, 50, printPosition);
            //}
        }
    }
}

//Creates some data to emulate the watch!
//Need more functions maybe?


function clearThis(xPos, yPos, xSize, ySize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.clearRect(xPos, yPos, xSize, ySize);
}

/*
 * Creates an instance of the Prototype application
 * when called, at position (xPos, yPos) on the canvas
 * and of size xSize * ySize, with the name written in
 * "Calendar App".
 * 
 * @param {type} xPos
 * @param {type} yPos
 * @param {type} xSize
 * @param {type} ySize
 * @param {type} actionTaken
 * @returns {undefined}
 */
function createPrototype(xPos, yPos, xSize, ySize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    //Create the app "icon".
    drawClickRect(xPos, yPos, xSize, ySize, protoClick);
    //Write the app "name" to the icon.
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Sans Serif";
    ctx.fillText("Calendar", xPos + 5, (yPos + 15));
    ctx.fillText("App", (xSize / 3) + xPos, (ySize / 3) + (yPos + 15));
}

/**
 * Wraps a JQuetry Call to the Prototype Initialistion
 * so that it can be passed as an argument (without immediate 
 * evaluation) into the MouseDown function to add it as a listener.
 * 
 * @returns {undefined}
 */
function protoClick() {
    var init = $.get("prototypeBasics.js", function () {
        protoInitialise();
    });
    init;
}

function writeSomething(message, x, y, fontSize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.font = fontSize + "px Sans Serif";
    ctx.fillText(message, x, y);
}

function writeSomethingColour(message, x, y, fontSize, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    ctx.font = fontSize + "px Sans Serif";
    ctx.fillText(message, x, y);
}

/*
 * Creates a mouseover listener at the specified location
 * (worked out using an (x, y) origin point and the width/height
 * passed as variables) to execute 'actionTaken' on mouseover.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @param {function} actionTaken
 * @returns {undefined}
 */
function mouseOver(xPosition, yPosition, xSize, ySize, actionTaken) {
    var canvas = document.getElementById('canvas_1');

    canvas.addEventListener('mouseover', function (evt) {

        var mousePos = getMousePos(canvas, evt);
        message = 'Mouse position: ' + mousePos.x + ', ' +
                Math.round(mousePos.y);
        sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' +
                Math.round(mousePos.y);

        var xCalc = (canvasWidth + xSize + xPosition) - canvasWidth;
        var yCalc = (canvasHeight + ySize + yPosition) - canvasHeight;

        //If Mouse Clicked on the Black Square, new message!
        if (mousePos.x <= xCalc && mousePos.y <= yCalc
                && mousePos.x >= (xPosition) && mousePos.y >= (yPosition)) {
            actionTaken();
        }
    }, false);
}

/*
 * Adds a Mousedown event listener across the given
 * co-ordinates - which it works out like the fillRectangle 
 * method does, from a given (x, y) origin point and the size
 * of the area to make interactive.
 * 
 * Utilises the canvas size properties to work the area out.
 * 
 * The event listener executes the function 'actionTaken'
 * upon mousedown.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @param {function} actionTaken
 * @returns {undefined}
 */
function mouseClick(xPosition, yPosition, xSize, ySize, actionTaken) {
    var canvas = document.getElementById('canvas_1');

    //The mouseclick event listener.
    canvas.addEventListener('click', function (evt) {

        var mousePos = getMousePos(canvas, evt);
        message = 'Mouse position: ' + mousePos.x + ', ' +
                Math.round(mousePos.y);
        sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' +
                Math.round(mousePos.y);

        var xCalc = (canvasWidth + xSize + xPosition) - canvasWidth;
        var yCalc = (canvasHeight + ySize + yPosition) - canvasHeight;

        //If Mouse Clicked on the Black Square, new message!
        if (mousePos.x <= xCalc && mousePos.y <= yCalc
                && mousePos.x >= (xPosition) && mousePos.y >= (yPosition)) {
            actionTaken();
        }
    }, false);
}
//Suppposed to detect a swipe with mouse
function swipe() {
    var x1, x2, y1, y2;
    var canvas = document.getElementById('canvas_1');
    //The mousedown event listener.
    canvas.addEventListener('mousedown', function (evt) {
        var mousePos1 = getMousePos(canvas, evt);
        x1 = mousePos1.x;
        y1 = mousePos1.y;
    });
    //The mouseup event listener.
    canvas.addEventListener('mouseup', function (evt) {
        var mousePos2 = getMousePos(canvas, evt);
        x2 = mousePos2.x;
        y2 = mousePos2.y;
    });
   //work out direction of drag based on where it went down and came up.
}

//NOT NEEDED, I THINK - BEN
////Calls any functions that initialise event listeners
//function listeners(xPos, yPos, xSize, ySize, actionToTake) {
//    mouseOver(xPos, yPos, xSize, ySize, actionToTake);
//    mouseClick(xPos, yPos, xSize, ySize, actionToTake);
//}

function printPosition() {
    document.getElementById("divShow").innerHTML = sqMes;
}

function printMessage(message) {
    document.getElementById("divShow").innerHTML = message;
}

/**
 * Pass a String that creates a blank canvas element
 * here, from the prototype, to clear the canvas.
 * 
 * @param {type} string
 * @returns {undefined}
 */
function resetCanvas(string) {
    document.getElementById("canvasDiv").innerHTML = string;
}

//Draws non clickable rectangle, because they don't all need clicking
//And can take a colour, should be passed in quotes
function drawRect(xPos, yPos, xSize, ySize, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
}

//Creates a black rectangle on the canvas with a mouseClick listener
// which listens for 'actionToTake'
function drawClickRect(xPos, yPos, xSize, ySize, actionToTake) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    mouseClick(xPos, yPos, xSize, ySize, actionToTake);
}

function drawColourRect(xPos, yPos, xSize, ySize, actionToTake, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    mouseClick(xPos, yPos, xSize, ySize, actionToTake);
}

//Will soon (HOPEFULLY) convert a date/time to a string
// in JSON to be able to send to a prototype, because
// JSON doesn't support native date format.
function dateStringForJSON(toConvert) {
    //At the moment, nothing needs to be converted
    //but later things might.
    return toConvert;
}

//===============================================================/
/*
 * 
 * Old functions:
 */


//Draws to the canvas - currently a red rectangle and
// both the current date and time as retrieved by
// the functions above.
function drawToCanvas() {
    var stringTime = createTime();
    var stringDate = currentDate();

    //Create the Canvas stuff
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    canvasWidth = c.width;
    canvasHeight = c.height;

    //Changes colour of the Canvas Element
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //Writes Time as a String to the Canvas
    ctx.fillStyle = "#000000";
    ctx.font = "48px Sans Serif";
    ctx.fillText(stringTime, 10, (canvasHeight / 10) + 20);
    ctx.fillText(stringDate, 10, (canvasHeight - 20));

    //creates the black rectangle in the middle
    drawClickRect();
}

/*
 * This function enlarges the current canvas and 
 * then shrinks it after a preset interval.
 * 
 * This emulates a "vibration" function.
 */
function emulateVibrate() {
    document.getElementById("canvasDiv").innerHTML = canvasString;
    drawToCanvas();
    //set a short time interval
    setTimeout("reDrawOriginal()", 60);

}

/*
 * Redraws the canvas at it's original size.
 */
function reDrawOriginal() {
    document.getElementById("canvasDiv").innerHTML = oldCanvas;
    drawToCanvas();
    listeners();
}
