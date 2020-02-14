
const amenitiesSelect = [];

function addAmenitiesHtml (array) {
  $('DIV.amenities h4').text(array.join(', '));
}

function addAmenitiesToArray (name) {
  amenitiesSelect.push(name);
}

function deleteAmenitiesToArray (name) {
  for (let i = 0; i < amenitiesSelect.length; i++) {
    if (amenitiesSelect[i] === name) {
      amenitiesSelect.splice(i, 1);
    }
  }
}

function init () {
  $('DIV.amenities .popover LI input').on('change', function () {
    const name = $(this).data('name');

    if (this.checked) {
      addAmenitiesToArray(name);
    } else {
      deleteAmenitiesToArray(name);
    }

    addAmenitiesHtml(amenitiesSelect);
  });
}

$(document).ready(init);
