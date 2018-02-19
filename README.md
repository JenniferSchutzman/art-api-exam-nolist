## Art Reference Project Handover guidance

Welcome future colleague to the Art Reference Project! Below you will see a step-by-step guide to help you both install the project properly and maintenance moving forward.

This first section is "Getting Started" but if you are already up and running, move straight to the second section on maintenance in the "Basics Documentation". This README will contain the following steps in numerical order so you can jump right in where necessary:

## Getting Started

1. CREATE A DATABASE
2. CLONE YOUR REPO
3. INSTALL DEPENDENCIES
4. ESTABLISH ENVIRONMENT VARIABLES
5. LOAD YOUR DATA
6. START THE API
7. MAKE YOUR FIRST GET
   ## Basics Documentation
8. BASE URL
9. SCHEME
10. HTTP VERBS
11. CONTENT TYPES
12. RESPONSE STATUS CODES
13. HOW TO CREATE
14. HOW TO READ
15. HOW TO UPDATE
16. HOW TO DELETE
17. HOW TO LIST
18. HOW TO SEARCH
    ////////////////////////////////////////////////////////////////////////////
    //
    // GETTING STARTED
    //
    ////////////////////////////////////////////////////////////////////////////

```
open terminal
```

1. CREATE A DATABASE

Use the terminal to create a roo database with the following command:

```
roo db add JenniferArt  
```

Then check to make sure the database is created by typing into the terminal:

```
roo db list
```

2. CLONE YOUR REPO

In your terminal clone the github account with the following command:

```
git clone https://github.com/JenniferSchutzman/art-api-exam-nolist.git
```

3. INSTALL DEPENDENCIES

In the terminal, install all necessary dependencies with the following command:

```
npm install node-http-error dotenv pouchdb-adapter-http pouchdb-core pouchdb-find body-parser slugify
```

Be sure to check spelling! Remember that there may be other existing dependencies with similar names so the terminal will not always stop you from installing your close but not exact dependency and it will be very hard to trouble shoot later!

4. ESTABLISH ENVIRONMENT VARIABLES

Be sure to create 2 files names named .gitignore and .env in your main folder to store confidential information. Inside the .gitignore file, place your .env and node_modules. Inside the .env, place your port and database url. You can use the below example to format your .env

```
COUCHDB_URL=https://<KEY:SECRET@rooaddress
COUCHDB_NAME=<nameArt>
PORT=3000
```

5. LOAD YOUR DATA

   Create a load-data file and use db.bulkDocs to import the data to the web-based PouchDB.

6. START THE API

In the terminal, enter node api.js to begin run the portal. Refresh both your pouchDB account and the local host before moving over to PostMan to

7. MAKE YOUR FIRST GET

After activating the port in the terminal, go to http://localhost:4000 to be receive the message "Welcome to the Art API. Manage all the paintings for much win." If you wish to run a specific GET on an all of the paintings, complete the following:
a. open Postman
b. select GET in the left-hand dropdown
c. copy and paste your localhost url
d. send

////////////////////////////////////////////////////////////////////////////
//
// BASICS DOCUMENTATION
//
////////////////////////////////////////////////////////////////////////////

8. BASE URL. See below a list endpoints with explanations for usage:

```
/paintings
```

Paintings can be used to access a list of all of the paintings.

```
/paintings/{id}
```

Paintings ID can be used to retrieve a particular painting, update a painting, or delete a painting. Just remember that when you wish to update or delete a painting, it will also require the most recent rev so be sure to retrieve the document just before completing the subsequent actions.

```
/paintings/searchFilter?=<propValue>:<searchValue>
```

Paintings searchFilter can be used to run queries directly in the browser. Just be sure to insert the necessary key value pair for the query inside the <>

9. SCHEME
   This API runs with the following HTTP systems:
   a. Express partners will with Node.js to provide middleware verb communication with the API
   b. PouchDB Roo database was utilized to for the back-end data storage. This project requires both 'pouchdb adapter http' and 'pouchdb core' installations for proper back-end communication.
   c. HTTPError is a simple error class system used to in this project to detect and respond using standardized error response.
   d. Slugify is a vanilla ES5 JavaScript dependency that coerces foreign symbols to their english equivalent. In this project it is used to force lower case and space in between words for the ID synchronization.
   e. Body Parser was utilized to parse incoming request bodies in a middle before the request body is processed in the editor code.

10. HTTP VERBS

This API utilizes standard HTTP verbs for each action.  
GET -- used to retrieve entries
POST -- used to create entries
PUT -- used to update entries
DELETE -- used to delete entries

11. CONTENT TYPES

All endpoints in the API accept and return data formatted as JSON.

12. RESPONSE STATUS CODES & DESCRIPTIONS

This API utilizes standard HTTP response status codes formatted with promises, outlined below.

Link to HTTP Error Codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

* 200 OK: The request has succeeded.
* 201 Created: The request has succeeded and a new resource has been created as a result of it.
* 202 Accepted: The request has been received but not yet acted upon.
* 400 Bad Request: This response means that server could not understand the request due to invalid syntax.
* 404 Not Found: The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist.

With this particular API, common error causes include the following:
a. You will receive a 409 conflict when you do not follow the required fields rules laid out in the beginning of the api.js file. For example, if you have listed the artist's home origin instead of their "movement", the POST or PUT will be rejected because it does not contain the proper fields.
b. You will receive a 404 if the capitalization or syntax differs in the slightest from the strict format of the existing objects.

Contact me with any questions at jennifer.schutzman@gmail.com for further guidance.

```

```
