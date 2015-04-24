/* 
 * These functions grab the current Time and convert it to a string
 * and from there, colour a canvas, and write the Time as a Text element
 * to the Canvas.
 * 
 * Authors: George Jackson, Ben Ryan
 * Date Created: 24/04/2015
 */

            function createTime() {
                //Grab the Time and make it a String
                var currentTime = new Date();
                var stringTime = currentTime.toLocaleTimeString();
                return stringTime;
            }
            
            function displayTime(canvasName) {
                var stringTime = createTime();
                //Create the Canvas stuff
                var c = document.getElementById(canvasName);
                var ctx = c.getContext("2d");

                //Changes colour of the Canvas Element
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(0, 0, 500, 500);

                //Writes Time as a String to the Canvas
                ctx.fillStyle = "#000000";
                ctx.font = "48px Sans Serif";
                ctx.fillText(stringTime, 10, 50);
            }
