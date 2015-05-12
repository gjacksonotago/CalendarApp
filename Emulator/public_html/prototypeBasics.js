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
    
    /*
     * This uses JQuery to refer to emulatorBasics
     * and allow us to use methods from in there.
     */
    $.get("emulatorBasics.js", function() {
        resetCanvas(oldCanvas);
        var click = printPosition();
        setDate(createTime());
        drawClickRect(10, 10, 125, 125, click);
    });
    
    
}


