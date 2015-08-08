/* 
 * emulatorBasics.js:
 * 
 * These functions grab the current Time and convert it to a string
 * and from there, colour a canvas, and write the Time as a Text element
 * to the Canvas.
 * They also now provide some basic smart watch like functions such as a basic swipe
 * function and starting the calendar app.
 * 
 * Authors: George Jackson, Ben Ryan, Mohammed Tarabishi
 * Date Created: 24/04/2015
 */

/** 
 * I am not sure about it!
 * Global variables 
 * canvasHeight define the height of the canvas
 * message and sqMes string messages for debugging
 * oldCanvas and canvasString variables used to the canvas to a larger size
 */
var canvasHeight, canvasHeight;
var message, sqMes;
var oldCanvas = '<canvas width="' + 320 + '" height="' + 320
        + '" id="' + 'canvas_1">' +
        'Canvas Tag not Supported by your browser version!' +
        '</canvas>';
var canvasString =
        '<canvas width="' + (canvasHeight + 20) + '" height="' + (canvasHeight + 20) +
        '" id="' + 'canvas_1">' +
        'Canvas Tag not Supported by your browser version!' +
        '</canvas>';

var clock;

/**
 * Function return the text value in the tag by id "words"
 * @return {string} 
 */ 
function getFormText() {
    var text = document.getElementById("words").value;
    console.log(text);
    return text;
}

/**
 * Function writing a message to canvas
 * @param {Element} canvas 
 * @param {String} message 
 */ 
function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 100);
}

 /**
 * Function get the mouse poisition
 * @param {Element} canvas 
 * @param {event} evt 
 * @return {object} object with x and y data fields 
 */ 
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/**
 * Function return the current time as a string
 * @return {String} 
 */ 
function createTime() {
    var currentTime = new Date();
    var stringTime = currentTime.toLocaleTimeString();
    return stringTime;
}

/**
 * Function return the current date of the system as a string
 * @return {String}
 */ 
function currentDate() {
    var currentDate = new Date();
    var stringDate = currentDate.toLocaleDateString();
    return stringDate;
}

/**
 * Function return the current month as an integer
 * @return {int}
 */ 
function currentMonth() {
    var month = new Date();
    return month.getMonth();
}

/**
 * Function return the current year from internet
 * @return {String}
 */ 
function currentYear() {
    var year = new Date();
    var yearString = year.toDateString().subString(10, 15);
    return yearString;
}

/** 
 * Function called to 'begin' the emulator:
 * Simulates an OS starting up by showing the apps lined
 * up to click.
 */
function emulatorInitialise() {
    //Create the Canvas stuff
    resetCanvas(oldCanvas);
    var c = document.getElementById("canvas_1");
    canvasWidth = c.width;
    canvasHeight = c.height;
    var offset = 60;

    clock = setInterval(updateTime, 1000);

    //Emulator full screen event listener(s)
    swipe(false, false, false, false);

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


/**
 * Function updating the time keeping the clock ticking.
 */ 
function updateTime() {
    clearThis(40, 180, 280, 100);
    //var minutes = createTime().substring(0, 4);
    //var ampm = createTime().substring(8, 10);
    writeSomethingColour(createTime(), 40, 250, 44, '#FFFFFF');
}

/**
 * Function clearing the rectangle specified by x and y location and with and height.
 * @param  {int} xPos top left corner x
 * @param  {int} yPos top left corner y
 * @param  {int} xSize width
 * @param  {int} ySize height
 */ 
function clearThis(xPos, yPos, xSize, ySize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.clearRect(xPos, yPos, xSize, ySize);
}

/**
 * Creates an instance of the Prototype application
 * when called, at position (xPos, yPos) on the canvas
 * and of size xSize * ySize, with the name written in
 * "Calendar App".
 * 
 * @param {int} xPos
 * @param {int} yPos
 * @param {int} xSize
 * @param {int} ySize
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
 */
function protoClick() {
    var init = $.get("prototypeBasics.js", function () {
        protoInitialise();
    });
    clearInterval(clock);
    init;
}

/**
 * Function writes a specified text at specified location (x,y) with specified fontsize
 * 
 * @param {String} message  
 * @param {int} x 
 * @param {int} y 
 * @param {int} fontSize
 */
function writeSomething(message, x, y, fontSize) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.font = fontSize + "px Sans Serif";
    ctx.fillText(message, x, y);
}


/**
 * Function writes a specified text at specified location (x,y) with specified fontsize and specified colour
 * 
 * @param {String} message  
 * @param {int} x 
 * @param {int} y 
 * @param {int} fontSize
 * @param {String} colour
 */
function writeSomethingColour(message, x, y, fontSize, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    ctx.font = fontSize + "px Sans Serif";
    ctx.fillText(message, x, y);
}

/** 
 * Creates a mouseover listener at the specified location
 * (worked out using an (x, y) origin point and the width/height
 * passed as variables) to execute 'actionTaken' on mouseover.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @param {function} actionTaken
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

/** Return the canvas the the id specified as input
 * 
 * @param {String} canvasID
 * @returns {Element} 
 */
function returnCanvas(canvasID) {
    var canvas = document.getElementById(canvasID);
    return canvas;
}

/**
 * Assuming you pass an HTML canvas context object, this
 * will restore any saved state from the draw stack.
 * 
 * @param {Element} ctx
 */
function restoreCtx(ctx) {
    //console.log("cliiiicked!");
    ctx.restore();
}

/**
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


/**
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

/**
 * Adds a PositionClick event listener across the given
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
 */
function positionClick(xPosition, yPosition, xSize, ySize, actionTaken) {
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
            actionTaken(xPosition, yPosition);
        }
    }, false);
}

/**
 * Adds a swipe and call the function related to the event
 * the swipe is define as a click on mouse held down then released at different position
 * it could be left right up or down
 * could be diagonal ?
 * 
 * @param {boolean} actionLeft
 * @param {boolean} actionRight
 * @param {boolean} actionUp
 * @param {boolean} actionDown
 * @returns {String}
 */
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
        if (actionLeft !== false && dir === "left") {
            actionLeft();
        }
        if (actionRight !== false && dir === "right") {
            actionRight();
        }
        if (actionUp !== false && dir === "up") {
            actionUp();
        }
        if (actionDown !== false && dir === "down") {
            actionDown();
        }
        return dir;
    });
}

//Assumes a swipe is a click, mouse held down, then released

/**
 * Function returns the direction of swiping in the swiping area of the mouse
 * 
 * @param {boolean} actionLeft
 * @param {boolean} actionRight
 * @param {boolean} actionUp
 * @param {boolean} actionDown
 * @param {int} areaX
 * @param {int} areaY
 * @param {int} lenX
 * @param {int} lenY 
 * @returns {String}
 */
function swipeArea(actionLeft, actionRight, actionUp, actionDown, areaX,
        areaY, lenX, lenY) {
    var x1, x2, y1, y2;
    var canvas = document.getElementById('canvas_1');
    //The mousedown event listener.

    canvas.addEventListener('mousedown', function (evt) {
        var mousePos1 = getMousePos(canvas, evt);
        x1 = mousePos1.x;
        y1 = mousePos1.y;
    });
    if (x1 > areaX && x1 < areaX + lenX, y1 > areaY &&
            y1 < areaY + lenY) {
        //The mouseup event listener.
        canvas.addEventListener('mouseup', function (evt) {
            var mousePos2 = getMousePos(canvas, evt);
            x2 = mousePos2.x;
            y2 = mousePos2.y;

            var dir = swipeDirection(x1, y1, x2, y2);
            if (actionLeft !== false && dir === "left") {
                actionLeft();
            }
            if (actionRight !== false && dir === "right") {
                actionRight();
            }
            if (actionUp !== false && dir === "up") {
                actionUp();
            }
            if (actionDown !== false && dir === "down") {
                actionDown();
            }
            return dir;
        });
    }
}

/*
 * define the swipe direction could be 4 outputs only ( left right
 * up and down ) no diagonal. the direction is defined between two 2D points  
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @returns {String}
 */     
function swipeDirection(x1, y1, x2, y2) {
    var dir = "Invalid swipe";
    var error = 50;//how far the mouse can sway in the other axis to main direction
    if (x1 < x2 && Math.abs(y2 - y1) < error)
        dir = "right";
    else if (x2 < x1 && Math.abs(y2 - y1) < error)
        dir = "left";
    else if (y1 < y2 && Math.abs(x2 - x1) < error)
        dir = "down";
    else if (y2 < y1 && Math.abs(x2 - x1) < error)
        dir = "up";
    //console.log(dir); //Screw this, we know it basically works. Except that invalid swipes happen A LOT.
    return dir;
}

/**
 * Print the position at the 'divshow' tag
 */
function printPosition() {
    document.getElementById("divShow").innerHTML = sqMes;
}


/**
 * Print the message passed as input at the 'divshow' tag
 * @param {String} message
 */
function printMessage(message) {
    document.getElementById("divShow").innerHTML = message;
}

/**
 * Pass a String that creates a blank canvas element
 * here, from the prototype, to clear the canvas.
 * 
 * @param {String} string
 */
function resetCanvas(string) {
    document.getElementById("canvasDiv").innerHTML = string;
}

/**
 * Creates a new Canvas to be used.
 * 
 * Ideally this is to be used to help create reminders, and
 * maybe needs to save the previous context....
 * 
 * @param {int} width
 * @param {int} height
 * @param {int} idNo
 */
function newCanvas(width, height, idNo, button) {
    if (button) {
        var newCanvasString = '<canvas width="' + width + '" height="' + height
                + '" id="' + idNo + '">' +
                'Canvas Tag not Supported by your browser version!' +
                '</canvas>' + '<div style="position: relative;"><input id=' +
                '"words" type="text;">' +
                '<button id="reminder" onclick="myfunc()">Enter</button></div>';
        document.getElementById("canvasDiv").innerHTML = newCanvasString;
    } else {
        var newCanvasString = '<canvas width="' + width + '" height="' + height
                + '" id="' + idNo + '">' +
                'Canvas Tag not Supported by your browser version!' +
                '</canvas>' + '<div style="position: relative;"><input hidden id=' +
                '"words" type="text;">' +
                '<button hidden id="reminder" onclick="myfunc()">Enter</button></div>';
        document.getElementById("canvasDiv").innerHTML = newCanvasString;
    }
}

/**
 * Fill rectangle defined by x y location and width and height with a specified colour
 * @param {int} xPos 
 * @param {int} yPos  
 * @param {int} xSize 
 * @param {int} ySise 
 * @param {String} colour  
 */
function drawRect(xPos, yPos, xSize, ySize, colour) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = colour;
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
}

/**
 *  Creates a black rectangle on the canvas with a singleMouseClick listener
 *  which listens for 'actionToTake'
 * @param {int} xPos 
 * @param {int} yPos 
 * @param {int} xSize
 * @param {int} ySise 
 * @param {function} actionToTake
 * @param {boolean} sglclick 
 */
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

/**
 * Fill rectangle clickable defined by x y location and width and height  with an 'actiontotake'
 * @param {int} xPos 
 * @param {int} yPos  
 * @param {int} xSize 
 * @param {int} ySise 
 * @param {function} actionToTake  
 */
function drawPositionRect(xPos, yPos, xSize, ySize, actionToTake) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    positionClick(xPos, yPos, xSize, ySize, actionToTake);
}


/**
 *  Fill rectangle clickable either single click or double click defined by x y location and width and height
 *   with an action to take with a specified colour
 * @param {int} xPos 
 * @param {int} yPos  
 * @param {int} xSize 
 * @param {int} ySise 
 * @param {function} actionToTake  
 * @param {boolean} sglclick
 * @param {String} colour
 */
 
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
