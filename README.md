# IT122-Adv-Javascript-NodeJS
Repository for IT 122: Advanced Javascript (Node.js) - Summer2020

## WEEK1 - Node.js up and running
-------------------------------------------------------------------------
First step toward a working web server application. Should have following files and functionality:

* Files in the root directory:
  * package.json - with information about application
  * data.js - containing:
  * an array of at least 5 items (objects), where each item has at least 4 attributes 
  * an exported getAll method that returns all array items
  * index.js - with code to launch a node.js web server on port 3000 and respond to requests.
    Should import data.js module.
* Web server should send different responses for these urls:
  * http://localhost:3000 - shows some home-page information and total number of items in your array
  * http://localhost:3000/about - returns some information about self
  * Any other path returns a 404 status code and error message

## WEEK2 - Express yourself
-------------------------------------------------------------------------
Simplify server application and add formatted pages, using Express and basic templating.

- Install these node modules:
  - express, express-handlebars & body-parser
  - Convert index.js code to use Express syntax,
  - Update default route to show formatted information for each item in data array:
    - create home.handlebars template
    - render this template for requests to default route
    - pass data array to the handlebars template
    - display the list of items in data array 
    - each item is linked to detail page with a query parameter identifying the item
- Create a new server route that:
  - can be accessed like so - http://localhost:3000/detail?item=[VALUE]
  - renders a detail.handlebars template to :
    - show an appropriate page title
    - show the value submitted on request url
    - show a link back to home page
- Create a .gitignore file in project folder that excludes the node_modules folder from git commits.

WEEK3 - Quality Matters
------------------------------------------------------------------------
Learned about test driven development and key techniques for ensuring code quality.
Practicing those with a 2-part assignment.

First:
- Install ESlint and initialize an ESlint configuration file using the 'eslint:recommended' rule set.
- Then add these to the eslint 'rules' file:
  - "prefer-arrow-callback": "warn",
  - "no-var": "warn",

Second:
- Create three new methods in data.js module:
  - getItem - should return full data about the requested item
  - addItem - should add a new item to the data array, if it doesn't already exist
  - deleteItem - should delete the requested item
- Each method should return information on whether the operation succeeded or failed.

- Install the mocha and chai modules as 'dev dependencies' for the application.
- Create a test script file in the /test folder, with Mocha+Chai test cases for the
'getItem', 'addItem' and 'deleteItem' methods. Create tests for both success & failure conditions.
- All six test cases should pass when run via Mocha.

WEEK4 - DATABASE INTEGRATION
-------------------------------------------------------------------------
Storing data in MongoDb and accessing it with Node.js and Mongoose.
For the online database, credentials provided via Canvas upon assigment submittal.

Update your Node.js application through the following steps:

Install the mongoose npm package,
- Create a data model that:
  - connects to your database
  - defines a data schema,
  - exports your data model for use by other scripts,
- Populate the new database collection with items from your existing data array.
- Update your server's 'home' and 'detail' routes to use the new database instead of
  your JavaScript data array. Your detail page should display details of the requested
  item.
- Create a new server route to 'delete' an item from your database on request. Your
  route should accept a requestquery parameter identifying the item to delete, and
  should return a response indicating whether delete succeeded or failed.
  
  
WEEK5 - REST APIS
-------------------------------------------------------------------------
Soon you'll build a front-end that needs to access your data.  REST API's have now become necessary.

For this week, provide API routes for each of the methods exported by your data module:
- get a single item
- get all items
- delete an item
- add or update an item (new route)
Most can be accessible via GET request but your add route will need to support a POST request. 

Each API should:
- support cross-origin access,
- accept necessary query parameters or request body,
- return appropriate JSON data on success,
- return an error status code and message if something went wrong,

No changes are required to your UI or existing data methods. You can use Postman for API testing.


WEEK6 - Frontend UI in React
-------------------------------------------------------------------------
Converting the frontend UI into a single-page application (SPA) using React.

Keeping existing HTML templates and routes for reference.

Create a new React-based home page. Interaction will be similar to earlier web pages, but without page reloads. Your new SPA page should:

 - Show a list of the items in your database 
 - Show item details when one is selected
(NOTE - Edit operations will be handled in a separate assignment.)

 

Hints: 
 - It may be simplest to pass the full list of items from your server's home route to your HTML page using this syntax:
    - res.render('home_react', {items: JSON.stringify(items)});
 - Start with provided handlebars template. Components and additional functions will be added.
