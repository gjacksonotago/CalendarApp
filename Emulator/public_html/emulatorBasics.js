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
var canvasWidth, canvasHeight;
var oldCanvas = '<canvas width="' + 320 + '" height="' + 320 
           + '" id="' + 'canvas_1"' + 'style="' + 
           'border:1px solid #000000;">' +
            'Canvas Tag not Supported by your browser version!' +
            '</canvas>';
var canvasString = 
            '<canvas width="' + 340 + '" height="' + 340 + 
            '" id="' + 'canvas_1"' +
            'style="' + 'border:1px solid #000000;"' + '>' +
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

/* Function called to 'begin' the emulator:
 * Simulates an OS starting up by showing the apps lined
 * up to click.
 * @returns Nothing is Returned.
 */
function emulatorIntialise() {
    //Create the Canvas stuff
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    canvasWidth = c.width;
    canvasHeight = c.height;

    //creates the "app" icon in the top left corner:
    ctx.fillStyle = "#000000";
    ctx.fillRect(10, 10, 50, 50);
    mouseDownCoords(10, 10, 50, 50);
}

//Creates some data to emulate the watch!
//Need more functions maybe?

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
    ctx.fillText(stringTime, 10, (canvasHeight/10)+20);
    ctx.fillText(stringDate, 10, (canvasHeight-20));

    //creates the black rectangle in the middle
    drawClickRect();
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

    canvas.addEventListener('mouseover', function() {

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
 * Adds a mouseover listener to the specified area using
 * the canvas and passed (x, y) and size variables to create
 * the area.
 * 
 * This listener specifically only does writing co-ordinates 
 * to the HTML.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @returns {undefined}
 */
function mouseOverCoords(xPosition, yPosition, xSize, ySize) {
    var canvas = document.getElementById('canvas_1');

    //Mouseover event for updating the time on the
    //canvas element!
    canvas.addEventListener('mouseover', function(evt) {
        /*
         * Grabs mouse position co-ords and creates a 
         * string out of them to use later.
         */
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        var sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        
        var xCalc = (canvasWidth + xSize + xPosition) - canvasWidth;
        var yCalc = (canvasHeight + ySize + yPosition) - canvasHeight;

        //If Mouse Clicked on Square, new message!
        if (mousePos.x <= xCalc && mousePos.y <= yCalc
                && mousePos.x >= (xPosition) && mousePos.y >= (yPosition)) {
                document.getElementById("divShow").innerHTML = sqMes;

        } else { 
            //writeMessage(canvas, message);
            //Print the Mouse Co-ords to divShow.
            document.getElementById("divShow").innerHTML = message;
        }
    }, false);
}

/*
 * Adds a mousedown event listener that specifically deals with
 * mouse co-ordinates on the canvas.
 * 
 * @param {int} xPosition
 * @param {int} yPosition
 * @param {int} xSize
 * @param {int} ySize
 * @returns {undefined}
 */
function mouseDownCoords(xPosition, yPosition, xSize, ySize) {
    var canvas = document.getElementById('canvas_1');
    
    //The mouseclick event listener.
    canvas.addEventListener('mousedown', function(evt) {
        //drawToCanvas(); //refreshes the date/time display

        /*
         * Grabs mouse position co-ords and creates a 
         * string out of them to use later.
         */
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        var sqMes = 'SQUARE CLICKED: ' + mousePos.x + ', ' + 
                Math.round(mousePos.y);
        
        var xCalc = (canvasWidth + xSize + xPosition) - canvasWidth;
        var yCalc = (canvasHeight + ySize + yPosition) - canvasHeight;

        //If Mouse Clicked on the Black Square, new message!
        if (mousePos.x <= xCalc && mousePos.y <= yCalc
                && mousePos.x >= (xPosition) && mousePos.y >= (yPosition)) {
                document.getElementById("divShow").innerHTML = sqMes;
                //emulateVibrate();

        } else { 
            //writeMessage(canvas, message);
            //Print the Mouse Co-ords to divShow.
            document.getElementById("divShow").innerHTML = message;
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
function mouseDown(xPosition, yPosition, xSize, ySize, actionTaken) {
    var canvas = document.getElementById('canvas_1');
    
    //The mouseclick event listener.
    canvas.addEventListener('mousedown', function(evt) {
        
        var xCalc = (canvasWidth + xSize + xPosition) - canvasWidth;
        var yCalc = (canvasHeight + ySize + yPosition) - canvasHeight;

        //If Mouse Clicked on the Black Square, new message!
        if (mousePos.x <= xCalc && mousePos.y <= yCalc
                && mousePos.x >= (xPosition) && mousePos.y >= (yPosition)) {
                actionTaken();
        } 
    }, false);
}

//Calls any functions that initialise event listeners
function listeners(xPos, yPos, xSize, ySize, actionToTake) {
    mouseOver(xPos, yPos, xSize, ySize, actionToTake);
    mouseDown(xPos, yPos, xSize, ySize, actionToTake);
}

//Creates a black rectangle on the canvas with a mouseDown listener
// which listens for 'actionToTake'
function drawClickRect(xPos, yPos, xSize, ySize, actionToTake) {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    //Create the rectangle
    ctx.fillRect(xPos, yPos, xSize, ySize);
    //Add the clickable listener
    mouseDown(xPos, yPos, xSize, ySize, actionToTake);
}

//Will soon (HOPEFULLY) convert a date/time to a string
// in JSON to be able to send to a prototype, because
// JSON doesn't support native date format.
function dateStringForJSON(toConvert) {
    //At the moment, nothing needs to be converted
    //but later things might.
    return toConvert;
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
