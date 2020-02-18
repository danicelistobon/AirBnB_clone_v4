
const amenitiesSelect = [];
const amenitiesId = [];
const citiesSelect = [];
const citiesId = [];
const statesSelect = [];
const statesId = [];

const url = 'http://192.168.33.100:5001/api/v1/';

function reviewsPlacesRequest (id) {
  return new Promise(function (resolve, reject) {
    const request = {
      url: url + `places/${id}/reviews`
    };

    const r = $.ajax(request);

    r.done(resolve);
  });
}

function amenitiesPlacesRequest (id) {
  return new Promise(function (resolve, reject) {
  // console.log('id' + id);
    const request = {
      url: url + `places/${id}/amenities`
    };

    const r = $.ajax(request);

    r.done(function (data) {
      // console.log(data);
      setTimeout(function () {
        resolve(data);
      }, 1000);
    });
  });
}

function amenitiesHtml (id) {
  return new Promise(function (resolve, reject) {
    amenitiesPlacesRequest(id).then(function (amenities) {
      // console.log(amenities);
      const html = [
        '<div class"amenities">',
        '<h2>Amenities</h2>',
        '<ul>'
      ];
      amenities.forEach((amenity, k) => {
      // console.log(amenity);
        html.push('<li>' + amenity.name + '</li>');
      });
      // console.log(html);
      html.push('</ul>');
      html.push('</div>');
      resolve(html.join(''));
    });
  });
}

function placeHtml (place) {
  // console.log(place.name);
  return new Promise(function (resolve, reject) {
    amenitiesHtml(place.id).then(function (amenities) {
    // console.log(amenities);
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
          '<strong>Owner: ' + users[place.user_id] + '</strong>',
          '</div>',
          '<div class="description">',
        `${place.description}`,
        '</div>',
        amenities,
        '<div class="reviews">',
        '<h2>Reviews</h2>',
        `<SPAN data-id="${place.id}">Show</SPAN>`,
        '</div>',
        '</article>'
      ];

      setTimeout(function () {
        resolve(html.join(''));
      }, 1000);
    });
  });
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

async function renderReviews (id, element) {
  const reviews = await reviewsPlacesRequest(id);
  const html = ['<ul>'];
  console.log(reviews);
  console.log(element);
  reviews.forEach((review) => {
    html.push('<li>');
    html.push('<h3>From ' + users[review.user_id] + ' the ' + review.created_at + '</h3>');
    html.push('<p>' + review.text + '</p>');
    html.push('</li>');
  });

  html.push('</ul>');

  $(element).append(html.join(''));
}

function createPlaces (places) {
  places.forEach(async (place, k) => {
    const html = await placeHtml(place);
    $('SECTION.places').append(html);
  });

  $(document).on('click', '.reviews SPAN', function () {
    const text = $(this).text();
    const id = $(this).data('id');
    if (text === 'Show') {
      $(this).text('Hide');
      renderReviews(id, $(this).parent()[0]);
    } else {
      $(this).text('Show');
      $(this).parent().find('ul').remove();
    }
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
