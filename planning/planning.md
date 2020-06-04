# PROJECT PLAN
__Project Start Date:__ June 3

__Project Due Date:__ June 10

### To Achieve MVP:

* Have a database for expenses and income
* Have 7 RESTful routes 
* index page: 
  * All home information is displayed
  * There is a link leading to show page
* show page: 
  * All details about income and expenses displayed
  * link to create new expense or income
  * link to delete an expense or income
  * Total Income and Total Spent Displayed at top of page
  * Total Flex and Firm are displayed on show page
* new page: 
  * form asks users to enter information in expense/income database: data, amount, category, description
  * submit button will trigger successful post route
* edit page: 
  * form prefills and lets user edit information in expense/income database
  * pressing submit will trigger successful put route
* delete button: 
  * pressing the delete button deletes the data from ui and from database.
* Be able to use database to update budget variables

### Moving Past MVP:
* authentication: 
  * create users and sessions
* Have third database: budget goals. Create new and edit routes for budget goals
* about page: 
  * linked to in index page
  * will describe app and its purpose
* CSS - get all CSS/Sass done
* relate the user data to the financial data so the financial data is unique to the user
* Use CSS framework - materialize
* Another category - debts: 
  * create a third database and other accompying files for tracking debt and debt payments
* Make a month feature so that budget changes/refreshes each month and you're able to go back to previous months to view your past budget outcomes.
* Add local storage (or does the data just save now? )


## Project Benchmarks

__By Wednesday end of day:__
* Have data structure figured out - relationship between user and financial data, how it's stored. Complete the data schemas and test.

__By Thursday end of day:__
* Have RESTful routes complete and views completed for both users, sessions, and budget data. Start debugging any remaining errors

__By Friday end of day:__ 
* Have third database and routes complete for budget goals
* If the databases are not related already, figure out how to relate them.

__By Saturday End of Day:__
* Create About Page 
* Style the pages - materialize and Sass

__By Monday End of Day:__
* Figure out how to add debt and debt payment
* Keep working on styling

__By Tuesday End of Day:__
* Project is complete
* Try to figure out monthly feature
* Put in local storage if needed / have time
