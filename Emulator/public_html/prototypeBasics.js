/* 
 * PrototypeBasics.js:
 * 
 * This file will contain the basics of the Prototype
 * Smartwatch Application we're developing.
 * 
 * Author: George Jackson
 * Date Created: 24/04/2015
 */

var currentDate;
var oldCanvas = '<canvas width="' + 320 + '" height="' + 320 
           + '" id="' + 'canvas_1"' + 'style="' + 
           'border:1px solid #000000;">' +
            'Canvas Tag not Supported by your browser version!' +
            '</canvas>';
    
var cX = 320;
var cY = 320;

//timed grab function
function runPrototype() {
    setTimeout("getDate", 100);
}

//Takes a date string to set
// as a value?
function setDate(dateValue) {
    currentDate = dateValue;
}

function protoInitialise() {
    var homeX = 10;
    var homeY = 10;
    var buttonX = cX/4;
    var buttonY = 25;
    
    var pixelX = ((buttonX) + homeX)/3;
    var pixelY = ((buttonY));
    /*
     * This uses JQuery to refer to emulatorBasics
     * and allow us to use methods from in there.
     * 
     * This creates a "Home" button - may encapuslate the
     * call and wrap it and generalise it so I can
     * create more clickable surfaces.
     */
    $.get("emulatorBasics.js", function() {
        resetCanvas(oldCanvas);
        setDate(createTime());
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


