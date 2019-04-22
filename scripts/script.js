"use strict";

// the url for the save.php script => save the image in aa folder .. 
const GLOBALE_URL = "http://localhost/app/php/save.php" ;

// canvas dom object .. 
let canvas = document.getElementById('myCan');

// put the context of the canvas => 2D ..
let context = canvas.getContext('2d');

// canvas size value .. 
let canvasSize =  { width : canvas.width , height : canvas.height } ;

// mouse coordinates .. 
let mouse = { x: 0,  y: 0 };

let last_mouse = { x: 0, y: 0 };

// init default value .. 
let drawup = false;
let drawColor = 'black';
let drawWidth = document.getElementById('pen-width').value;

// listen to the change value of the pen color .. 
document.getElementById('pen-color').addEventListener('change', function () {
          drawColor = document.getElementById('pen-color').value;
});

// listen to the change value of the pen size .. 
document.getElementById('pen-width').addEventListener('change', function () {
          drawWidth = document.getElementById('pen-width').value;
});

// clear your canvas .. 
document.getElementById('clear').addEventListener("click", function () {
    swal({
        title: "Are you sure?",
        text: "you want to clear this canvas ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          // init the canvas ( return to the beginning value ) ..       
            context.clearRect(0, 0, canvasSize.width, canvasSize.height);
          // hide the image if he is in the show mode .. 
            document.getElementById('canvas-result').style.display = 'none';
        } 
      });
});

// save the picture is drawn .. 
document.getElementById('save').addEventListener("click", function () {
    let dataURL = canvas.toDataURL(); // default is 'image/png' ..
    document.getElementById('canvas-result').src = dataURL;
    document.getElementById('canvas-result').style.display = 'inline';
    
    //AJAX to Server base64 data to the server
    $.ajax({
       type:"POST",
        url: GLOBALE_URL,
        dataType: "text",
        data: { basedata : dataURL   },
        success: function (result){
            console.log(result);
            
        }
    });
    
});


// mouse movement in the canvas  .. 
canvas.addEventListener('mousemove', function (event) {
    // make listen the current mouse coordinates ( history in last mouse coordinates ) ..  
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    // get the current mouse coordinates compared to the offset .. 
    mouse.x = event.pageX - this.offsetLeft;
    mouse.y = event.pageY - this.offsetTop;
    // draw .. 
    draw('move');
}, false);

// when the mouse move down in the canvas => draw down .. 
canvas.addEventListener('mousedown', function (event) { draw('down'); }, false);

// when the mouse move up in the canvas => draw up .. 
canvas.addEventListener('mouseup', function (event) { draw('up'); }, false);

 /*
  * for limit the pen in the canvas size :
  *       canvas.addEventListener('mouseout', function (event) { draw('up'); }, false);
  * 
  */


// draw function ( real time hhh :p ) .. 
function draw (movment_action) {
    // condition for drawing in the right state .. 
    if (movment_action == 'down') {
        drawup = true;
    }
    if (movment_action == 'up') {
        drawup = false;
    }
    // if the state is right .. 
    if (drawup) {
       
        context.beginPath();
        // the line start .. 
        context.moveTo(last_mouse.x, last_mouse.y);
        // the line end .. 
        context.lineTo(mouse.x, mouse.y);

        // some style for each point of the line .. 
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        context.stroke();

        context.closePath();

    }
}








