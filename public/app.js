$(() => {
  $('select').formSelect();
  $(".dropdown-trigger").dropdown();
  $('.datepicker').datepicker({
    format: 'mm-dd-yyyy'
  });

  //tabs
  $('ul.tabs').tabs({
    swipeable: true
  });


}); //BEYOND THE WALL