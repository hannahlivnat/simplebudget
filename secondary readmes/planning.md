# PROJECT PLAN
__Project Start Date:__ June 3

__Project Due Date:__ June 10

### To Achieve MVP:

* Have a database for budget details x
* Have 7 RESTful routes x
* index page: 
  * Total Income and Total Spent Displayed at top of page x
  * Total Flex and Firm are displayed x
  * Categorization of entered data displayed x
  * There is a link leading to show page x
* show page: x
  * details about income and expenses displayed x
  * link to create new expense or income x
  * link to delete an expense or income x
* new page: x
  * form asks users to enter information in expense/income database: data, amount, category, description x
  * submit button will trigger successful post route x
* edit page: x
  * form prefills and lets user edit information in expense/income database x
  * pressing submit will trigger successful put route x
* delete button: x
  * pressing the delete button deletes the data from ui and from database. x
* Be able to use database to update budget variables x

### Moving Past MVP:
* authentication: x
  * create users and sessions x
* Have third database: budget goals. Create new and edit routes for budget goals
* about page: x
  * will describe app and its purpose x
* Figure out how to use passport and express-flash for signing in and persistent log in sessions
* CSS - get all CSS/Sass done
* relate the user data to the financial data so the financial data is unique to the user
* Use CSS framework - materialize x
* Another category - debts: 
  * create a third database and other accompying files for tracking debt and debt payments
* Make a month feature so that budget changes/refreshes each month and you're able to go back to previous months to view your past budget outcomes.
* Add local storage (or does the data just save now? )


## Project Benchmarks

__By Wednesday end of day:__
* Have data structure figured out - relationship between user and financial data, how it's stored. Complete the data schemas and test. x

__By Thursday end of day:__
* Have RESTful routes complete and views completed for both users, sessions, and budget data. Start debugging any remaining errors x

__By Friday end of day:__ 
* Have third database and routes complete for budget goals 


__By Saturday End of Day:__
* Create About Page x
* Style the pages - materialize and Sass
* If the databases are not related already, figure out how to relate them.

__By Monday End of Day:__
* Style Everything
* Go through all routes and complete testing for at least two different users and with newly created user
* Fix remaining bugs, make sure function is good before getting nit-picky with styling

__By Tuesday End of Day:__
* Project is complete
* Try to figure out monthly feature
* Put in local storage if needed / have time
