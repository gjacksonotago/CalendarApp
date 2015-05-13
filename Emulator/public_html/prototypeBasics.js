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

function protoInitialise() {
    refreshInit();
    
    requestTime();
    writeTime();
    //pollTime();
}

function refreshInit() {
    var homeX = 10;
    var homeY = 10;
    var buttonX = cX/4;
    var buttonY = 25; 
    var pixelX = ((buttonX) + homeX)/3;
    var pixelY = ((buttonY));

    $.get("emulatorBasics.js", function() {
        resetCanvas(oldCanvas);  
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
    $.get("emulatorBasics.js", function() {
       writeSomethingColour(current, 320-(cX/4), 25, 12, "#000000"); 
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

