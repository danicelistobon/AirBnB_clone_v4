
const amenitiesSelect = [];
const amenitiesId = [];
const citiesSelect = [];
const citiesId = [];
const statesSelect = [];
const statesId = [];

const url = 'http://192.168.33.100:5001/api/v1/';

function placeHtml (place) {
  const html = [
    '<article>',
    '<div class="title">',
        `<h2>${place.name}</h2>`,
        '<div class="price_by_night">',
        place.price_by_night,
        '</div>',
        '</div>',
        '<div class="information">',
        '<div class="max_guest">',
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>',
        '<br />',
          `${place.max_guest} Guest`,
          '</div>',
          '<div class="number_rooms">',
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>',
          '<br />',
          `${place.number_rooms} Bedrooms`,
          '</div>',
          '<div class="number_bathrooms">',
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>',
          '<br />',
          `${place.number_bathrooms} Bathroom`,
          '</div>',
          '</div>',
          '<div class="user">',
          '<strong>Owner: </strong>',
          '</div>',
          '<div class="description">',
        `${place.description}`,
        '</div>',
        '</article>'
  ];

  return html.join('');
}

// ---------------------------------------------
function addAmenitiesHtml (array) {
  $('DIV.amenities h4').text(array.join(', '));
}

function addAmenitiesToArray (name, id) {
  amenitiesSelect.push(name);
  amenitiesId.push(id);
}

function deleteAmenitiesToArray (name, id) {
  for (let i = 0; i < amenitiesSelect.length; i++) {
    if (amenitiesSelect[i] === name) {
      amenitiesSelect.splice(i, 1);
    }
    if (amenitiesId[i] === id) {
      amenitiesId.splice(i, 1);
    }
  }
}
// ----------------------------------------------

function addStatesAndCitiesToHtml (states, cities) {
  $('DIV.locations h4').text(states.concat(cities).sort().join(', '));
}

function addStatesToArray (name, id) {
  statesSelect.push(name);
  statesId.push(id);
}

function deleteStatesToArray (name, id) {
  for (let i = 0; i < statesSelect.length; i++) {
    if (statesSelect[i] === name) {
      statesSelect.splice(i, 1);
    }
    if (statesId[i] === id) {
      statesId.splice(i, 1);
    }
  }
}
// ------------------------------------------------

function addCitiesToArray (name, id) {
  citiesSelect.push(name);
  citiesId.push(id);
}

function deleteCitiesToArray (name, id) {
  for (let i = 0; i < citiesSelect.length; i++) {
    if (citiesSelect[i] === name) {
      citiesSelect.splice(i, 1);
    }
    if (citiesId[i] === id) {
      citiesId.splice(i, 1);
    }
  }
}
// ------------------------------------------------

function change () {
  const name = $(this).data('name');
  const id = $(this).data('id');

  if (this.checked) {
    addAmenitiesToArray(name, id);
  } else {
    deleteAmenitiesToArray(name, id);
  }
  addAmenitiesHtml(amenitiesSelect);
}

function changeState () {
  const name = $(this).data('name');
  const id = $(this).data('id');

  if (this.checked) {
    addStatesToArray(name, id);
  } else {
    deleteStatesToArray(name, id);
  }
  addStatesAndCitiesToHtml(statesSelect, citiesSelect);
}

function changeCity () {
  const name = $(this).data('name');
  const id = $(this).data('id');

  if (this.checked) {
    addCitiesToArray(name, id);
  } else {
    deleteCitiesToArray(name, id);
  }
  addStatesAndCitiesToHtml(statesSelect, citiesSelect);
}

// -----------------------------------------------
function requestDone (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  }
}

function handlerError (jqXHR, textStatus, errorThrown) {
  $('#api_status').removeClass('available');
}

function requestStatusApi () {
  const request = {
    url: url + 'status/'
  };

  const r = $.ajax(request);
  r.done(requestDone);
  r.fail(handlerError);
}

function createPlaces (places) {
  places.forEach((place, k) => {
    $('SECTION.places').append(placeHtml(place));
  });
}

function requestPlaces () {
  const request = {
    method: 'POST',
    contentType: 'application/json; charset=UTF-8',
    url: url + 'places_search/',
    data: '{}'
  };

  const r = $.ajax(request);
  r.done(createPlaces);
  r.fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  });
}

function search () {
  const data = {
    amenities: amenitiesId,
    states: statesId,
    cities: citiesId
  };

  const request = {
    method: 'POST',
    contentType: 'application/json; charset=UTF-8',
    url: url + 'places_search/',
    data: JSON.stringify(data)
  };

  const r = $.ajax(request);

  r.done(function (data) {
    $('SECTION.places').html('<h1>Places</h1>');
    createPlaces(data);
  });
}

function init () {
  $('DIV.amenities .popover LI input').on('change', change);
  // states
  $('DIV.locations .popover H2 input').on('change', changeState);
  // cities
  $('DIV.locations .popover LI input').on('change', changeCity);

  $('SECTION.filters BUTTON').click(search);

  requestStatusApi();

  requestPlaces();

  setInterval(function () {
    requestStatusApi();
  }, 5000);
}

$(document).ready(init);
