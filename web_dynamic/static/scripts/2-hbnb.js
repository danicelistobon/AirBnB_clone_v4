
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

function change () {
  const name = $(this).data('name');

  if (this.checked) {
    addAmenitiesToArray(name);
  } else {
      deleteAmenitiesToArray(name);
  }
  addAmenitiesHtml(amenitiesSelect);
}

function requestDone (data) {
  if (data.status == 'OK') {
    $('#api_status').addClass('available');
  }
}

function handlerError (jqXHR, textStatus, errorThrown) {
  $('#api_status').removeClass('available');
}

function requestStatusApi () {
  let request = {
    url : 'http://192.168.33.100:5001/api/v1/status/'
  }
  
  let r = $.ajax(request);
  r.done(requestDone);
  r.fail(handlerError);
} 

function init () {
  $('DIV.amenities .popover LI input').on('change', change);
  
  requestStatusApi();

  setInterval(function(){ 
    requestStatusApi(); 
  }, 5000);
}

$(document).ready(init);
