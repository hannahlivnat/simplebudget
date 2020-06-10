# SIMPLYBUDGET - A CRUD Budgeting App

## PREVIEW
### Login and Signup Pages:
![](./secondary-readmes/preview-images/log-in-page.gif)

### Budget Details Routes:
![](./secondary-readmes/preview-images/budget-summary.gif)
## VIEW LIVE APP
https://simplybudget.herokuapp.com/

## PROJECT DESCRIPTION
SimplyBudget is an answer to the crowd of complicated budgeting apps which make the process of budgeting overwhelming and over-categorized. Rather than tracking each minute category, from your laundry fees to your 
'fun money', this app helps you track three main categories: your income, your flex expenses, and your firm expenses. 

* Income : Any incoming money to your account, whether it be from a job or a gift
* Firm Expenses: Stable expenses that have to be paid and which remain the same from month to month. This may include your rent or mortgage, your health insurance, your phone bill. Think of it as your 'automated expenses' that you don't have much control over. 
* Flex Expenses: Fluid expenses that you have more control over, even if they are necessary purchases like groceries. This category encompasses any purchases that make at a grocery store, restaurant, Target, or yard sale.

By separating expenses into your steady monthly expenses and controllable monthly expenses, you can gain realistic insights on what your monthly budget should look like while still retaining the flexibility to buy your sister a birthday fit without maxing out an overly-specfied category. Welcome to more reasonable and stress-free budgeting!

## APPROACH TAKEN

I emphasized constant testing for this project, as there were many new skills and packages that could lead to obscure error messages, particularly in working with ejs files. I began by setting up my starter files and mapping out the direction and structure of the application through wireframing. I then set up the initial RESTful routes and database for BudgetDetail before moving onto the user and budgetplan collections.

The most challenging portion of this project was using Mongoose's population feature to populate the user collection with documents from the budget detail and budget plan collections. I ran into a road block for two days while self teaching this, particularly because I was attempting to filter through the budgetdetail data to select only data from the current month, then mesh populate with passport and express-session so that they were all working in cohesion to join and immediately update the user's data. 

After overcoming the Mongoose populate struggle, I took the approach of assigning req.user from passport to req.session.user to keep the populated data rendered across all routes. This meant that I needed to update both the database and my req.session object for any create, update, or delete routes. As an example, on the create route for BudgetDetail, I used...

```
 BudgetDetail.create(newBudgetItem, (err, createdDetail) => {
    if (err) {
      res.send(err)
    } else {
      //push new budget detail into req.session array
      req.session.user.budgetdetails.push(createdDetail);
      //push id into user collection for populate upon next login
      User.findByIdAndUpdate(req.session.userId, {
        $push: {
          budgetdetails: createdDetail._id
        }
      }, {
        safe: true,
        upsert: true
      }, (err, doc) => {
        if (err) {
          res.send(err.message);
        } else {
          console.log(req.session.user);
          res.redirect('/budgetdetails')

        }
      })

```
After the back-end was set-up, I moved onto the front-end. I decided to keep the design pretty simply as my app is named "SimplyBudget". In creating the ejs files in the views directory, my challenge page was the index.ejs within my budgetdetails directory. While the page maintains a relatively simple design, I have functions that run operations on every expense and income item logged to compile totals in the expense category, income category, and the percentage of current expenses/income towards meetings the cap of expected expenses/income. These resulting variables are used to update all amounts listed on the index page and to programmatically change the chart that I built from Sass using a great design tutorial on [CSS Tricks](https://css-tricks.com/making-charts-with-css/).Last but not least, I made this app responsive with the help of Materialize CSS. 

## INSTALLATION INSTRUCTIONS

After visiting the deployed app on Heroku, you'll need to register in order to view the rest of the application pages, as I have custom Middleware which authenticates that a user is logged in before allowing access. 

## FEATURES / TECHNOLOGY USED
__Technology__:

__Languages:__  JavaScript, Sass (SCSS)
__UI Library:__ Materialize CSS
__Within JS:__ Node.js, jQuery
__Packages/Frameworks:__ express, bcrypt, passport, passport-local, express-session,
__Database / Database Libraries:__ MongoDB, MongoDB Atlas, Mongoose

__Features:__
* CRUD Application with main RESTful routes: index, new, create, edit, update, show, and delete.
* Custome Middleware authenticates that there is a user and that the user has already created a budget plan prior to allowing access to most pages of this app. If this is not the case, the user is redirected to either the login or the new budget plan page.
* Password encryption using bcrypt
* User authentication / persistent login sessions using bcrypt and passport. 
* Mongoose Population connects three collections: BudgetDetail, BudgetPlan, and User. Upon a user signing in, the user document is populated with their unique budget plan and budget details and displayed on the user's home page. 
* Express-Session is used to store the user and all populated data. Express-session is used to push, pull, and update req.session through form submissions so that the dom is updated immediately in addition to form submission updating the MongoDB database.

## UNSOLVED PROBLEMS
* Expand features to include option of joint and/or single categories for couples: 
* Add a category that tracks debt and debt payments
* Fix styling of chart on user's home page
* clean up/refactor back-end code 
* UI feedback on the login / registration page upon unsuccessful submit.