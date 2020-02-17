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
}

$(document).ready(init);
