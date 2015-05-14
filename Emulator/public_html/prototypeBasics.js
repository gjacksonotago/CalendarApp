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
var cX = 320;
var cY = 320;

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
    refreshInit();
    requestTime();
    writeTime();
    pollTime();
}

/**
 * Function that sets up the Prototype, starting with
 * a "home" button - but hopefully more will be added.
 * 
 * @returns {undefined}
 */
function refreshInit() {
    var homeX = 10;
    var homeY = 10;
    var buttonX = cX/4;
    var buttonY = 25; 
    var pixelX = ((buttonX) + homeX)/3;
    var pixelY = ((buttonY));
    
    resetWrap();
    $.get("emulatorBasics.js", function() {
        drawClickRect(homeX, homeY, buttonX, 25, returnToEmu);
        writeSomething("Home", pixelX, pixelY, 12);
    }); 
}

/**
 * Function Wrapped-JQuery Call to the emulator
 * Initialise Function - basically to be used like
 * an "exit" or "back" button out of the app.
 * 
 * @returns {undefined}
 */
function returnToEmu() {
    $.get("emulatorBasics.js", function() {
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
    $.get("emulatorBasics.js", function() {
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
    clearWrapped((320-(cX/4))-5, 15, 125, 15);
    $.get("emulatorBasics.js", function() {
       writeSomethingColour(current, 320-(cX/4), 25, 12, "#000000"); 
    });
}

function clearWrapped(xPos, yPos, xSize, ySize) {
    $.get("emulatorBasics.js", function() {
       clearThis(xPos, yPos, xSize, ySize); 
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
    $.get("emulatorBasics.js", function() {
       resetCanvas(oldCanvas); 
    });
}
