$( document ).ready(() => {
    let selectedAmenities = {};

    $('.amenities input[type="checkbox"]').on('change', function () {
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

    let selectedStates = {};

    $('.locations h2 input[type="checkbox"]').on('change', function () {
	let state = $(this);
	let stateId = state.data('id');
	let stateName = state.data('name');

	if (state.prop('checked')) {
	    selectedStates[stateId] = stateName;
	} else {
	    delete selectedStates[stateId];
	}

	$('.locations h4').text(Object.values(selectedStates).join(', '));
    });

    console.log(selectedStates);

    let selectedCities = {};

    $('.locations li input[type="checkbox"]').on('change', function () {
	let city = $(this);
	let cityId = city.data('id');
	let cityName = city.data('name');

	if (city.prop('checked')) {
	    selectedCities[cityId] = cityName;
	} else {
	    delete selectedCities[cityId];
	}

	$('.locations h4').text(Object.values(selectedCities).join(', '));
    });

    console.log(selectedCities);

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	if (data.status === 'OK') {
	    $('div#api_status').addClass('available');
	} else {
	    $('div#api_status').removeClass('available');
	}
    });


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

    $('.filters button').on('click', function () {
	let amenitiesIds = Object.keys(selectedAmenities);
	let statesIds = Object.keys(selectedStates);
	let citiesIds = Object.keys(selectedCities);
	console.log(amenitiesIds);
	$.post({
	    url: 'http://0.0.0.0:5001/api/v1/places_search',
	    contentType: 'application/json',
	    data: JSON.stringify({
		'amenities': amenitiesIds,
		'states': statesIds,
		'cities': citiesIds
	    }),
	    success: function (response) {
		$('section.places').empty();
		for (let place of response.sort(OrderListBy('name'))) {
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
    });
});
