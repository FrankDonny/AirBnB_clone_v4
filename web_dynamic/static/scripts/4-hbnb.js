const checkDict = {};
$("document").ready(function (){
  fetch("http://0.0.0.0:5001/api/v1/status/")
  .then(response => {
    if (response.ok){
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  $('input').change(function () {
    if ($(this).is(':checked')) {
      checkDict[($(this).attr('data-id'))] = ($(this).attr('data-name'));
    } else {
      delete checkDict[($(this).attr('data-id'))];
    }
    $('DIV.amenities H4').html(Object.values(checkDict).join(', '));
  });

  $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({}),
      contentType:"application/json; charset=utf-8",
      success: function (response) {
	  for (const place of response) {
	      $('SECTION.places').append(`
					 <article>
					   <div class="title_box">
					     <h2>` + place.name + `</h2>
					   <div class="price_by_night">` + place.price_by_night + `</div>
					   </div>
					   <div class="information">
					     <div class="max_guest">` + place.max_guest + ` Guests </div>
					     <div class="number_rooms">` + place.number_rooms + `</div>
					     <div class="number_bathrooms">` + place.number_bathrooms + `</div>
					   </div>
					   <div class="user">
					     <b>Owner:</b> ` + place.user_id + `
					   </div>
					   <div class="description">` + place.description + `</div>
					 </article>
				`);
        }
      }
  });

  $("button").click(function fn(){
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({amenities: Object.keys(checkDict)}),
      contentType: 'application/json; charset=utf-8',
      success: function (response){
        $('section.places').empty();
        for (const place of response) {
          $('SECTION.places').append(`
             <article>
               <div class="title_box">
                 <h2>` + place.name + `</h2>
               <div class="price_by_night">` + place.price_by_night + `</div>
               </div>
               <div class="information">
                 <div class="max_guest">` + place.max_guest + ` Guests </div>
                 <div class="number_rooms">` + place.number_rooms + `</div>
                 <div class="number_bathrooms">` + place.number_bathrooms + `</div>
               </div>
               <div class="description">` + place.description + `</div>
             </article>
             `);
      }
    }
  });
  });
});