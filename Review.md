# Review Questions

1# What is Node.js?

1. Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. 
Node.js lets developers use JavaScript to write Command Line tools and for server-side scripting—running scripts server-side to 
produce dynamic web page content before the page is sent to the user's web browser.


## What is Express?

2. Express is a web application framework for Node.js,  It is designed for building web applications and APIs. 
It is relatively minimal with many features available as plugins. Released in 2010 and currently has over
500 million downloads.

## Mention two parts of Express that you learned about this week.

3. Middleware and Routing

## What is Middleware?

4. Functions that get the request and response objects and can operate on them and either return the response or 
call the next middleware in the pipeline. Examples are logging or security. A web server can be seen as a function 
that takes in a request and outputs a response. Middlewares are functions executed in the middle after the incoming 
request then produces an output which could be the final output passed or could be used by the next middleware 
until the cycle is completed, meaning we can have more than one middleware and they will 
execute in the order they are declared.

## What is a Resource?

5. An object that is a source of the information we want to use in our app. example would be a database

## What can the API return to help clients know if a request was successful?

6. status codes, messages the developer codes.

## How can we partition our application into sub-applications?

7. We can divide them up by the functions they perform or by the 
data type they are using. process of breaking all the code into categories.
These groups are really defined by the type of data we are dealing with so there
is no single perfect way to do it. 

## What is express.json() and why do we need it?

8. This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
Data is sent of the internet in the form of JSON. It has to be parsed or stringified (depending on the direction 
we are going) before we can use it or send it.  
