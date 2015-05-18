/* 
 * emulatorBasics.js:
 * 
 * These functions grab the current Time and convert it to a string
 * and from there, colour a canvas, and write the Time as a Text element
 * to the Canvas.
 * They also now provide some basic smart watch like functions such as a basic swipe
 * function and starting the calendar app.
 * 
 * Authors: George Jackson, Ben Ryan
 * Date Created: 24/04/2015
 */

//Global variables
var canvasHeight, canvasHeight;
//The String Messages currently written for testing
var message, sqMes;
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

//Write a message to the canvas. --->An outdate method now, I think. (Ben)
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 100);
}
/*
 * This function is used for the mouse cordinates
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//============================================================//

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

//Returns just the month in three letters i.e May, Jun etc. from the internet, may not be needed.
function currentMonth() {
    var month = new Date();
    return month.getMonth();
}

//Returns the current year, from the internet, may not be needed.
function currentYear() {
    var year = new Date();
    var yearString = year.toDateString().subString(10, 15);
    return yearString;
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
    canvasWidth = c.width;
    canvasHeight = c.height;
    var offset = 60;

    //updateTime();//Will use this method instead of below once we get it working
    var minutes = createTime().substring(0, 5);
    var ampm = createTime().substring(9, 11);
    writeSomethingColour(minutes + ampm, 80, 240, 48, '#FFFFFF');
    
    //Emulator full screen event listener(s)
    swipe(false, false, false, false);//this does not actually do anything yet except print the direction to the console

    //Populates the 'screen' with clickable 'app' icons --->Now only prints the one we need.
    for (j = 0; j < 5; j++) {
        for (i = 0; i < 5; i++) {
            if (i === 2 && j === 0) {
                createPrototype(10 + (i * offset), 10 + (j * offset),
                        50, 50);
            } //else {
            //  drawClickRect(10 + (i * offset), 10 + (j * offset),
            //          50, 50, printPosition, true);
            //}
        }
    }
}

//Keeps the clock ticking, not the way to go, but a start. Goes back to home screen from calendar
//Will find a way to not do that, until then, nevermind.
function updateTime() {
    //clearThis(50, 240, 320, 50);
    var minutes = createTime().substring(0, 5);
    var ampm = createTime().substring(9, 11);
    writeSomethingColour(createTime(), 80, 240, 48, '#FFFFFF');
    setTimeout("emulatorInitialise()", 30000);//every 30 seconds
    //setTimeout("updateTime()", 1000);
}

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
    drawClickRect(xPos, yPos, xSize, ySize, protoClick, true);
    //Write the app "name" to the icon.
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "12px Sans Serif";
    ctx.fillText("Calendar", xPos + 5, (yPos + 15));
    ctx.fillText("App", (xSize / 3) + xPos, (ySize / 3) + (yPos + 15));
}

/**
 * Wraps a JQuery Call to the Prototype Initialistion
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

//Write text at specified location with chosen fontsize the the canvas
function writeSomething(message, x, y, fontSize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.font = fontSize + "px Sans Serif";
    ctx.fillText(message, x, y);
}

//same as above but with the colour option. --->probably only need this one? (Ben)
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

function returnCanvas() {
    var canvas = document.getElementById('canvas_1');
    return canvas;
}

/*
 * Adds a MouseClick event listener across the given
 * co-ordinates - which it works out like the fillRectangle 
 * method does, from a given (x, y) origin point and the size
 * of the area to make interactive.
 * 
 * Utilises the canvas size properties to work the area out.
 * 
 * The event listener executes the function 'actionTaken'
 * upon a mouseclick.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @param {function} actionTaken
 * @returns {undefined}
 */
function singleMouseClick(xPosition, yPosition, xSize, ySize, actionTaken) {
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

/*
 * Adds a MouseClick event listener across the given
 * co-ordinates - which it works out like the fillRectangle 
 * method does, from a given (x, y) origin point and the size
 * of the area to make interactive.
 * 
 * Utilises the canvas size properties to work the area out.
 * 
 * The event listener executes the function 'actionTaken'
 * upon a double mouseclick.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @param {function} actionTaken
 * @returns {undefined}
 */
function doubleMouseClick(xPosition, yPosition, xSize, ySize, actionTaken) {
    var canvas = document.getElementById('canvas_1');

    //The mouseclick event listener.
    canvas.addEventListener('dblclick', function (evt) {

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

//Suppposed to detect a swipe with mouse held down, then released
function swipe(actionLeft, actionRight, actionUp, actionDown) {
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
        var dir = swipeDirection(x1, y1, x2, y2);
        if(actionLeft !== false && dir === "left") {
            actionLeft();
        }
        if (actionRight !== false && dir === "right") {
            actionRight();
        } 
        if(actionUp !== false && dir === "up") {
            actionUp();
        }
        if (actionDown !== false && dir === "down") {
            actionDown();
        }
        return dir;
    });
}

//Finds the direction of a swipe based on two coordinates
//returns string  up/down left/right     
function swipeDirection(x1, y1, x2, y2) {
    var dir = "Swipe Direction: Too diagonal, must be fairly straight in one direction";
    var error = 50;//how far the mouse can sway in the other axis to main direction
    if (x1 < x2 && Math.abs(y2 - y1) < error)
        dir = "right";
    else if (x1 > x2 && Math.abs(y2 - y1) < error)
        dir = "left";
    else if (y1 < y2 && Math.abs(x2 - x1) < error)
        dir = "down";
    else if (y1 > y2 && Math.abs(x2 - x1) < error)
        dir = "up";
    console.log(dir);
    return dir;
}

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

//Creates a black rectangle on the canvas with a singleMouseClick listener
// which listens for 'actionToTake'
function drawClickRect(xPos, yPos, xSize, ySize, actionToTake, sglclick) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    if (sglclick) {
        singleMouseClick(xPos, yPos, xSize, ySize, actionToTake);
    } else {
        doubleMouseClick(xPos, yPos, xSize, ySize, actionToTake);
    }
}

function drawColourRect(xPos, yPos, xSize, ySize, actionToTake, sglclick, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    if (sglclick) {
        singleMouseClick(xPos, yPos, xSize, ySize, actionToTake);
    } else {
        doubleMouseClick(xPos, yPos, xSize, ySize, actionToTake);
    }
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
 * Old functions: Some may still be useful in the future, e.g vibrate
 */


//Draws to the canvas - currently a red rectangle and
// both the current date and time as retrieved by
// the functions above.
//function drawToCanvas() {
//    var stringTime = createTime();
//    var stringDate = currentDate();
//
//    //Create the Canvas stuff
//    var c = document.getElementById("canvas_1");
//    var ctx = c.getContext("2d");
//    canvasWidth = c.width;
//    canvasHeight = c.height;
//
//    //Changes colour of the Canvas Element
//    ctx.fillStyle = "#FF0000";
//    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
//
//    //Writes Time as a String to the Canvas
//    ctx.fillStyle = "#000000";
//    ctx.font = "48px Sans Serif";
//    ctx.fillText(stringTime, 10, (canvasHeight / 10) + 20);
//    ctx.fillText(stringDate, 10, (canvasHeight - 20));
//
//    //creates the black rectangle in the middle
//    drawClickRect();
//}
//
///*
// * This function enlarges the current canvas and 
// * then shrinks it after a preset interval.
// * 
// * This emulates a "vibration" function.
// */
//function emulateVibrate() {
//    document.getElementById("canvasDiv").innerHTML = canvasString;
//    drawToCanvas();
//    //set a short time interval
//    setTimeout("reDrawOriginal()", 60);
//
//}
//
///*
// * Redraws the canvas at it's original size.
// */
//function reDrawOriginal() {
//    document.getElementById("canvasDiv").innerHTML = oldCanvas;
//    drawToCanvas();
//    //listeners();
//}
