$( document ).ready(() => {
    let selectedAmenities = {};
    $('.amenities  input[type="checkbox"]').on('change', function () {
	let amenity = $(this);
	let amenityId = amenity.data('id');
	let amenityName = amenity.data('name');

	if (amenity.prop('checked')) {
	    selectedAmenities[amenityId] = amenityName;
	} else {
	    delete selectedAmenities[amenityId];
	}

	$('.amenities h4').text(Object.values(selectedAmenities).join(', '));
    });

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	if (data.status === 'OK') {
	    $('div#api_status').addClass('available');

	    function OrderListBy(prop) {
		return function (a, b) {
		    if (a[prop] > b[prop]) {
			return 1;
		    }
		    else if (a[prop] < b[prop]) {
			return -1;
		    }
		    return 0;
		}
	    }

	    $.post({
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: function (response) {
		    for (let place of response.sort(OrderListBy('name'))) {
			console.log(place);
			placeHTML = `<article>
	                  <div class="title_box">
	                   <h2>${place.name}</h2>
	                   <div class="price_by_night">$${place.price_by_night}</div>
	                  </div>
                	  <div class="information">
	                   <div class="max_guest">${place.max_guest} Guests</div>
                           <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                           <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                	  </div>
                          <div class="description">
	                    ${place.description}
                          </div>
                	</article>`

			$('section.places').append(placeHTML);
		    }
		},
		error: function (error) {
		    console.log(error);
		}
	    });

	} else {
	    $('div#api_status').removeClass('available');
	}
    });

});
