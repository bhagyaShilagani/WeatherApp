# WeatherApp
WeatherApp to request weather forecast from wunderground.com for a give zipcode.

Weather App - Backend
----------------------
A RESTful API built using Node and Express 4 

- Receive API request from Client Application for zip code. Example: 60203.
- Check stored cache implemented in node-cache module for data on 60203 that is less than 1 hour old.
- If data is not stale, return's it to the user making the API request.
- If data is stale (older than 60 minutes) or non-existent, goes to the wunderground API to get the data, update cache and return's the data.

Backend: ** Installation Instructions
Download from ../bhagyaShilagani/WeatherApp/server/
- app.js
- weatherNode.js
- config/properties

1.	Install Node and npm, to install Node on your machine, go to  https://nodejs.org and click on the Download button and check version
  -	node -v
  -	npm -v
2.	Install, express-generator and create a server project folder
  -	npm install express-generator -g
  -	express server
  -	cd server && npm install
3.	Install request, node-cache and limiter modules
  -	npm install request –save (https://www.npmjs.com/package/request)
  -	npm install limiter –save (https://www.npmjs.com/package/limiter)
  -	npm install node-cache –save (https://www.npmjs.com/package/node-cache)
4.	Copy to files to ..\server\ folder
  - app.js
  - weatherNode.js
  - config/properties
5.	Start Server 
  - npm start 
6.	Test Server 
  - http://localhost:3010/forecast?60015
  - http://localhost:3010/search?60015 
7.	Send a request from client app 
  - http://localhost:3000/#!/

Weather App - Client Application
---------------------------------
A Simple AngularJS single page application that connects to the Backend API. 

-Allow a user to enter a zip code.
-Display a three day forecast for the entered zip code.
-Display a spinning circle over the forecast while waiting for API data to load to give the user some indication that something is happening while you wait for data.

Client Setup on a web server
1.	Download(weatherApp.zip) and extract files to any local web server. I am using a json-server, copy files into the public folder of a webserver.
2.	To install json-server go to  https://github.com/typicode/json-server
3.	Start json-server, client can be accessed at http://localhost:3000/#!/
4.	Client Weather App shows weather forecast for Zipcode: 60203 as default
	  
Client: ** Installation Instructions
1.	download zip file (weatherApp.zip) from ../bhagyaShilagani/WeatherApp/client/weatherApp.zip
2.	Extract weatherApp.zip files to ..\weatherApp folder 
3.	Install following node modules under ..\weatherApp\. Skip this step and goto step 4 if you already have these modules installed
  a.	Install Node and npm, to install Node on your machine, go to  https://nodejs.org and click on the Download button
  b.	To check if they were installed check version: node -v, npm -v
  c.	npm bower
  d.	npm install -g gulp
  e.	npm install gulp --save-dev
  f.	npm install jshint gulp-jshint jshint-stylish gulp-imagemin gulp-concat gulp-uglify gulp-minify-css gulp-usemin gulp-cache gulp-  changed gulp-rev gulp-rename gulp-notify  browser-sync del --save-dev
4.	bower update
5.	npm install
6.	gulp
7.	gulp watch (This Starts Client)

**Note, order in which you should start

   a. Server running at http://localhost:3010/
    Word Doc with snapshots and detailed instructions for client Setup.
    https://github.com/bhagyaShilagani/WeatherApp/blob/master/server/BackendSetupInstructions.docx
   
   b. Client running at http://localhost:3001/#!/, Start server before starting client to avoid port conflicts
    Word document WeatherAppClientSetup.docx for detailed instructions with screen shots for server setup
    https://github.com/bhagyaShilagani/WeatherApp/blob/master/client/WeatherAppClientSetup.docx
