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
            
            //Draws to the canvas - currently a red rectangle and
            // both the current date and time as retrieved by
            // the functions above.
            function drawToCanvas() {
                var stringTime = createTime();
                var stringDate = currentDate();
                
                //Create the Canvas stuff
                var c = document.getElementById("canvas_1");
                var ctx = c.getContext("2d");

                //Changes colour of the Canvas Element
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(0, 0, 500, 500);

                //Writes Time as a String to the Canvas
                ctx.fillStyle = "#000000";
                ctx.font = "48px Sans Serif";
                ctx.fillText(stringTime, 10, 50);
                ctx.fillText(stringDate, 10, 100);
                
                //creates the black rectangle in the middle
                drawClickRect();
            
            }
            
            //Creates a black rectangle on the canvas
            function drawClickRect() {
                var c = document.getElementById("canvas_1");
                var ctx = c.getContext("2d");
                
                ctx.fillStyle = "#000000";
                ctx.fillRect(125, 125, 250, 250);
            }
            