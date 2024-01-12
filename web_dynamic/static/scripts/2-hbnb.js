$( document ).ready(() => {
    let selectedAmenities = {};
    $('.amenities  input[type="checkbox"]').on('change', function () {
	let amenity = $(this);
	console.log(amenity);
	let amenityId = amenity.data('id');
	console.log(amenityId);
	let amenityName = amenity.data('name');
	console.log(amenityName);
	console.log(amenity.checked);

	if (amenity.prop('checked')) {
	    selectedAmenities[amenityId] = amenityName;
	} else {
	    delete selectedAmenities[amenityId];
	}

	$('.amenities h4').text(Object.values(selectedAmenities).join(', '));
    });
});
