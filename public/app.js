console.log($);

$(() => {
  $('select').formSelect();
  $(".dropdown-trigger").dropdown();
  $('.datepicker').datepicker({
    format: 'mm-dd-yyyy'
  });
})