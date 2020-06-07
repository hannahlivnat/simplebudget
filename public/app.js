$(() => {
  //get dates for the datepicker input




  $('select').formSelect();

  $(".dropdown-trigger").dropdown();

  //interactive date picker
  //https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/


  const daysinMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const lastDay = daysinMonth(currentMonth, currentYear);
  console.log(lastDay);


  $(".datepicker").datepicker({
    minDate: new Date(currentYear, currentMonth, 1),
    maxDate: new Date(currentYear, currentMonth, lastDay),
    format: 'mm-dd-yyyy',
    showMonthAfterYear: true
  });

  //tabs
  $('ul.tabs').tabs({
    swipeable: true
  });


}); //BEYOND THE WALL