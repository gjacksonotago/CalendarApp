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
     * and allow us to use methods in there.
     */
    $.get("emulatorBasics.js", function() {
        
    });
    
    
}


