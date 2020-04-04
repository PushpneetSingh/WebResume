var image = document.querySelector('img') ;
var image1= document.querySelector('.class');
var imageCanvas = document.createElement('canvas');
var imageCanvasContext = imageCanvas.getContext('2d');
var lineCanvas = document.createElement('canvas');
var lineCanvasContext = lineCanvas.getContext('2d');
var pointLifetime = 1200;
var points = [];

if (image.complete || image1.complete) {
  start();
} else {
  image.onload = start();
}

/**
 * Attaches event listeners and starts the effect.
 */
function start() {
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', resizeCanvases);
  document.body.appendChild(imageCanvas);
  resizeCanvases();
  tick();
}

/**
 * Records the user's cursor position.
 *
 * @param {!MouseEvent} event
 */
function onMouseMove(event) {
  points.push({
    time: Date.now(),
    x: event.clientX,
    y: event.clientY
  });
}

/**
 * Resizes both canvases to fill the window.
 */
function resizeCanvases() {
	
  imageCanvas.width = lineCanvas.width = window.innerWidth;
  imageCanvas.height = lineCanvas.height = window.innerHeight;
}

/**
 * The main loop, called at ~60hz.
 */

function tick() {
  // Remove old points
  points = points.filter(function(point) {
    var age = Date.now() - point.time;
    return age < pointLifetime;
  });

  drawLineCanvas();
  drawImageCanvas();
  requestAnimationFrame(tick);
}

/**
 * Draws a line using the recorded cursor positions.
 *
 * This line is used to mask the original image.
 */
function drawLineCanvas() {
  var minimumLineWidth = 100;
  var maximumLineWidth = 100;
  var lineWidthRange = maximumLineWidth - minimumLineWidth;
  var maximumSpeed = 100;

  lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
  lineCanvasContext.lineCap = 'round';
  lineCanvasContext.shadowBlur = 70;
  lineCanvasContext.shadowColor = '#000';
  
  for (var i = 1; i < points.length; i++) {
    var point = points[i];
    var previousPoint = points[i - 1];

    // Change line width based on speed
    var distance = getDistanceBetween(point, previousPoint);
    var speed = Math.max(0, Math.min(maximumSpeed, distance));
    var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
    lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

    // Fade points as they age
    var age = Date.now() - point.time;
    var opacity = (pointLifetime - age) / pointLifetime;
    lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
    
    lineCanvasContext.beginPath();
    lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
    lineCanvasContext.lineTo(point.x, point.y);
    lineCanvasContext.stroke();
  }
}

/**
 * @param {{x: number, y: number}} a
 * @param {{x: number, y: number}} b
 * @return {number} The distance between points a and b
 */
function getDistanceBetween(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * Draws the original image, masked by the line drawn in drawLineToCanvas.
 */
function drawImageCanvas() {
  // Emulate background-size: cover
  var width = imageCanvas.width;
  var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;
  
  if (height < imageCanvas.height) {
    width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
    height = imageCanvas.height;
  }

  imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  imageCanvasContext.globalCompositeOperation = 'source-over';
  imageCanvasContext.drawImage(image, 0, 0, width, height);
  imageCanvasContext.globalCompositeOperation = 'destination-in';
  imageCanvasContext.drawImage(lineCanvas, 0, 0);
}
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = this.txt;

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
   
    };