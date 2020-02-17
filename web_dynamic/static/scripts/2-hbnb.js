const amens = [];

function addAmensHtml (amens) {
  $('DIV.amenities h4').text(amens.join(', '));
}

function addAmens (name) {
  amens.push(name);
}

function deleteAmens (name) {
  for (let i = 0; i < amens.length; i++) {
    if (amens[i] === name) {
      amens.splice(i, 1);
    }
  }
}

function init () {
  $('DIV.amenities .popover LI input').change(function () {
    const name = $(this).data('name');

    if (this.checked) {
      addAmens(name);
    } else {
      deleteAmens(name);
    }

    addAmensHtml(amens);
  });

  const url = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(url, data => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
}

$(document).ready(init);
