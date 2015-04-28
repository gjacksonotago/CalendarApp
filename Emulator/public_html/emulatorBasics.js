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
    mouseDown(10, 10, 50, 50);
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
function mouseOver() {
    var canvas = document.getElementById('canvas_1');

    //Mouseover event for updating the time on the
    //canvas element!
    canvas.addEventListener('mouseover', function() {
        drawToCanvas();     
    }, false);
}

//Adds a mouseDown function at the given position
function mouseDown(xPosition, yPosition, xSize, ySize) {
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
//Calls any functions that initialise event listeners
function listeners() {
    mouseOver();
    mouseDown();
}

//Creates a black rectangle on the canvas
function drawClickRect() {
    var c = document.getElementById("canvas_1");
    var ctx = c.getContext("2d");
    var width = c.width;
    var height = c.height;

    ctx.fillStyle = "#000000";
    ctx.fillRect(width/4, height/4, width/2, height/2);
}

//Will soon (HOPEFULLY) convert a date/time to a string
// in JSON to be able to send to a prototype, because
// JSON doesn't support native date format.
function dateStringForJSON(toConvert) {
    //At the moment, nothing needs to be converted
    //but later things might.
    return toConvert;
}

//Should Replace the Content of CanvasDiv with a larger
// Canvas object.
function emulateVibrate() {
    var canvasString = 
            '<canvas width="' + 340 + '" height="' + 340 + 
            '" id="' + 'canvas_1"' +
            'style="' + 'border:1px solid #000000;"' + '>' +
            '</canvas>';

    document.getElementById("canvasDiv").innerHTML = canvasString;
    drawToCanvas();

    //set a short time interval
    setTimeout("reDrawOriginal()", 60);

}

//Redraw's what we had to begin with!
function reDrawOriginal() {

   var oldCanvas = '<canvas width="' + 320 + '" height="' + 320 
           + '" id="' + 'canvas_1"' + 'style="' + 
           'border:1px solid #000000;">' +
            'Canvas Tag not Supported by your browser version!' +
            '</canvas>';

    document.getElementById("canvasDiv").innerHTML = oldCanvas;
    drawToCanvas();
    listeners();
}
