var rectangleButton = document.getElementById("rectangle");
    circleButton = document.getElementById("circle");
    saveButton = document.getElementById("save");
    loadImage = document.getElementById("load-image");
    canvas = document.getElementById("canvas");
    clearAndLoadCheckBox = document.getElementById("clear-and-load-check-box");
    ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Random Range
function randomRange(from, to) {
  if (from < 1 || to < 1) {
    return false;
  }

  if (from > to) {
    swap = to;
    to = from;
    from = swap;
  }

  randomDiff = to - from;
  randomBase = Math.random();

  random = from + Math.floor(randomBase * randomDiff);
  return random;
}///////////////////////////////////////////// \Random Range


// Random Color
function randomColor() {
  var color = [];
  for (var i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return 'rgb(' + color.join(',') + ')';
}/////////////////////////////////////////// \Random Color


// Draw Rectangle
function drawRectangle(posX, posY, width, height) {
  var grd = ctx.createRadialGradient(posX, posY, width, height, 60, 100);
      grd.addColorStop(0, randomColor());
      grd.addColorStop(0.5, '#fff');
      grd.addColorStop(1, randomColor());

      ctx.fillStyle = grd;
      ctx.fillRect(posX, posY, width, height);
      ctx.strokeRect(posX, posY, width, height);
}///////////////////////////////////////////////// \Draw Rectangle


// Draw Random Rectangle
function drawRandomRectangle() {
  drawRectangle(
    randomRange(5, 495),
    randomRange(5, 325),
    randomRange(70, 300),
    randomRange(10, 70)
  );
}/////////////////////////////// \Draw Random Rectangle


// Draw Circle
function drawCircle(posX, posY, posR) {
  ctx.beginPath();
  ctx.arc(posX, posY, posR, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = randomColor();
  ctx.fill();
}//////////////////////////////// \Draw Circle


// Draw Random Circle
function drawRandomCircle() {
  drawCircle(
    randomRange(105, 695),
    randomRange(105, 295),
    randomRange(10, 100)
  );
}///////////////////////// \Draw Random Circle


// SAVE
function saveImage() {
  var image = canvas.toDataURL("image/png");
      imageName = prompt("Save as :");

  if (imageName == null) {
    return false;
  }
  if (imageName.length < 1) {
    imageName = 'MyImage';
  }
  saveButton.href = image;
  saveButton.download = imageName + '.png';
}///////////////////////////////////// \SAVE


// Read Image
function readImage(input) {
    var reader = new FileReader();
    reader.onload = function() {
    // dataURL = event.target.result
    dataURL = event.srcElement.result;
    img = new Image();

    img.onload = function() {
      ctx.drawImage(
        img,
        randomRange(5, 495),
        randomRange(5, 195),
        300,
        200);
    };

    img.src = dataURL;
    loadImage.value = '';
  };
  reader.readAsDataURL(input.files[0]);
} /////////////////////////////////////////////// \Read File


// Show And Hide 'Clear &' Span
function showHideSpan() {
  var clearSpan = document.getElementById("clear-span");
  if (clearAndLoadCheckBox.checked == true){
    clearSpan.style.display = "inline";
  } else {
     clearSpan.style.display = "none";
  }
}//////////////////////////////////// \Show And Hide


// Clear And Load
function clearAndLoad() {
  if (clearAndLoadCheckBox.checked == true){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    readImage(loadImage);
  } else {
     readImage(loadImage);
  }
}//////////////////////////////////// \Clear And Load


// Click Handlers
rectangleButton.addEventListener("click", function() {
  drawRandomRectangle();
});

circleButton.addEventListener("click", function() {
  drawRandomCircle();
});

saveButton.addEventListener("click", function() {
  saveImage();
});

loadImage.addEventListener("change", function() {
  clearAndLoad();
});

clearAndLoadCheckBox.addEventListener("click", function() {
  showHideSpan();
});
///////////////////////// \Click Handlers


// Copyright
var currentYear = new Date().getFullYear();
document.getElementById("footer").innerHTML = '&copy; Copyright ' + currentYear + ' - SharifKhlief';
