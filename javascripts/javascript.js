var canvasLogo, ctxLogo, mask;

$(document).ready(function () {
  canvasLogo  = document.getElementById('m-logo--background');
  ctxLogo     = canvasLogo.getContext('2d');
  mask        = new Image();
  mask.src    = 'images/frame.png';
});

$(function () {
	$('input[type=file]').bootstrapFileInput();

  var image = new Image();
  image.src = 'images/fauve.jpg';

  image.onload = function () {
    canvasLogo.width = canvasLogo.width;
    ctxLogo.drawImage(mask, 0, 0);
    ctxLogo.globalCompositeOperation = 'source-in';
    ctxLogo.drawImage(image, 0, 0, image.width * (500/image.height), 500);
  }
});

function updateBackground(id, input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById(id).style.background = 'url(' + e.target.result + ')';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateColor(id, input) {
  if (input.value !== undefined) {
    document.getElementById(id).style.background = input.value;
  }
}

function updateCanvasBackground(id, input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        canvasLogo.width = canvasLogo.width;
        ctxLogo.drawImage(mask, 0, 0);
        ctxLogo.globalCompositeOperation = 'source-in';

        if (image.height > image.width) {
          ctxLogo.drawImage(image, 0, 0, 500, image.height * (500/image.width));
        } else {
          ctxLogo.drawImage(image, 0, 0, image.width * (500/image.height), 500);
        }
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateCanvasColor(id, input) {
  if (input.value !== undefined) {
    ctxLogo.beginPath();
    ctxLogo.rect(0, 0, 500, 500);
    ctxLogo.fillStyle = input.value;
    ctxLogo.fill();

    var image = new Image();
    image.src = canvasLogo.toDataURL('image/jpeg');

    image.onload = function () {
      canvasLogo.width = canvasLogo.width;
      ctxLogo.drawImage(mask, 0, 0);
      ctxLogo.globalCompositeOperation = 'source-in';
      ctxLogo.drawImage(image, 0, 0);
    }
  }
}

function toImage() {
  var inputs = $('.hide-to-upload');
  inputs.hide();
}
