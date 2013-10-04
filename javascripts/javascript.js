$(function () {
	$('input[type=file]').bootstrapFileInput();
});

function updateImage(id, input) {
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

function toImage() {
  var inputs = $('.hide-to-upload');
  inputs.hide();
}
