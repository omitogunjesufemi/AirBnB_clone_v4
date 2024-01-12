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
	} else {
	    $('div#api_status').removeClass('available');
	}
    });
});
