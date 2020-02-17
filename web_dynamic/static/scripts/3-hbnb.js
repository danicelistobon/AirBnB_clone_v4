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

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        console.log(place);
        $('.places').append(`<article>

        <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        ${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

        ${place.max_guest} Guests

          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_bathrooms} Bathroom

          </div>
        </div>

        <!-- **********************
         USER
         **********************  -->

        <div class="user">


        </div>
        <div class="description">

          ${place.description}

        </div>

      </article>`);
      }
    }
  });
}

$(document).ready(init);
