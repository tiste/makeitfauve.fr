var canvasBg, canvasLogo, ctxBg, ctxLogo, mask;

$(document).ready(function () {
  canvasBg    = document.getElementById('m-background');
  canvasLogo  = document.getElementById('m-logo--background');
  ctxBg       = canvasBg.getContext('2d');
  ctxLogo     = canvasLogo.getContext('2d');
  mask        = new Image();
  mask.src    = ['images/frame0.png', 'images/frame1.png'].sort(function() {return 0.5 - Math.random()})[1];
});

$(function () {
	$('input[type=file]').bootstrapFileInput();

  if (!$.cookie('tips')) {
    $('.tips').fadeIn().delay(25000).fadeOut();
    $.cookie('tips', '1', { expires: 1, path: '/' });
  }
  $('.tips').on('click', function () {
    $('.tips').stop().fadeOut();
  });

  canvasBg.setAttribute('width', $(window).width());
  canvasBg.setAttribute('height', $(window).height());

  var rand  = Math.floor((Math.random() * 5));
  var imageLogo = new Image();
  imageLogo.src = 'images/fauve' + rand + '.jpg';

  imageLogo.onload = function () {
    canvasLogo.width = canvasLogo.width;
    ctxLogo.drawImage(mask, 0, 0);
    ctxLogo.globalCompositeOperation = 'source-in';

    if (imageLogo.height > imageLogo.width) {
      ctxLogo.drawImage(imageLogo, 0, 0, canvasLogo.width, imageLogo.height * (canvasLogo.width/imageLogo.width));
    } else {
      ctxLogo.drawImage(imageLogo, 0, 0, imageLogo.width * (canvasLogo.width/imageLogo.height), canvasLogo.width);
    }
  }

  var imageBg = new Image();
  imageBg.src = 'images/fauve' + ((rand % 4) + 1) + '.jpg';

  imageBg.onload = function () {
    canvasBg.width = canvasBg.width;

    if (imageBg.height > imageBg.width) {
      ctxBg.drawImage(imageBg, 0, 0, canvasBg.width, imageBg.height * (canvasBg.width/imageBg.width));
    } else {
      ctxBg.drawImage(imageBg, 0, 0, imageBg.width * (canvasBg.width/imageBg.height), canvasBg.width);
    }
  }
});

function updateBackground(id, input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        canvasBg.width = canvasBg.width;

        if (image.height > image.width) {
          ctxBg.drawImage(image, 0, 0, canvasBg.width, image.height * (canvasBg.width/image.width));
        } else {
          ctxBg.drawImage(image, 0, 0, image.width * (canvasBg.width/image.height), canvasBg.width);
        }
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateColor(id, input) {
  if (input.value !== undefined) {
    ctxBg.beginPath();
    ctxBg.rect(0, 0, canvasBg.width, canvasBg.width);
    ctxBg.fillStyle = input.value;
    ctxBg.fill();

    var image = new Image();
    image.src = canvasBg.toDataURL('image/png');

    image.onload = function () {
      canvasBg.width = canvasBg.width;
      ctxBg.drawImage(image, 0, 0);
    }
  }
}

function updateLogoBackground(id, input) {
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
          ctxLogo.drawImage(image, 0, 0, canvasLogo.width, image.height * (canvasLogo.width/image.width));
        } else {
          ctxLogo.drawImage(image, 0, 0, image.width * (canvasLogo.width/image.height), canvasLogo.width);
        }
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateLogoColor(id, input) {
  if (input.value !== undefined) {
    ctxLogo.beginPath();
    ctxLogo.rect(0, 0, canvasLogo.width, canvasLogo.width);
    ctxLogo.fillStyle = input.value;
    ctxLogo.fill();

    var image = new Image();
    image.src = canvasLogo.toDataURL('image/png');

    image.onload = function () {
      canvasLogo.width = canvasLogo.width;
      ctxLogo.drawImage(mask, 0, 0);
      ctxLogo.globalCompositeOperation = 'source-in';
      ctxLogo.drawImage(image, 0, 0);
    }
  }
}

function updateLogoOpacity(id, input) {
  document.getElementById(id).style.opacity = input.value / 100;
}

function toImage() {
  var inputs = $('.hide-to-upload');
  inputs.hide();

  html2canvas(document.body, {
    onrendered: function(rendered) {
      rendered.toBlob(function (blob) {
        saveAs(blob, 'fauve_bg.png');
      });
      inputs.show();
    }
  });
}

function toggleEdit() {
  $('.m-edit').slideToggle();
}
