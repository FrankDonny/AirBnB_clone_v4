const checkDict = {};
$("document").ready(function (){
  fetch("http://0.0.0.0:5001/api/v1/status/")
  .then(response => {
    if (response.status === 200){
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
})