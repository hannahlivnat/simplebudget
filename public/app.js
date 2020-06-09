$(() => {

  //BUDGET DETAILS INDEX ================
  $('.brand-logo').on('click', () => {
    window.location.replace('/budgetdetails');
  })

  $('.sidenav').sidenav();


  //FORMS ===============
  $('select').formSelect();

  // https://github.com/Dogfalo/materialize/issues/1861 <-- fixes bug that causes select to not display require message
  $('select[required]').css({
    display: "inline",
    height: 0,
    padding: 0,
    width: 0
  })

  $(".dropdown-trigger").dropdown();

  //interactive date picker
  //https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/


  const daysinMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const lastDay = daysinMonth(currentMonth, currentYear);

  $(".datepicker").datepicker({
    minDate: new Date(currentYear, currentMonth, 1),
    maxDate: new Date(currentYear, currentMonth, lastDay),
    format: 'mm-dd-yyyy',
    showMonthAfterYear: true
  });

  //BUDGET DETAILS SHOW PAGE  ==========================
  //tabs
  $('ul.tabs').tabs({
    swipeable: true
  });

  //make delete icon into the submit button of delete form: 
  $('.delete-icon').on('click', () => {
    $('#delete-button').trigger('click');
  })


}); //BEYOND THE WALL