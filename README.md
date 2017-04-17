# Development Challenge
Please follow the below steps to setup this project in your local machine
-----
* To get docker redis image (docker pull sameersbn/redis:lates) after that run (docker-compose up -d) into docker-redis folder. 
* You need to install serverless globally (npm install serverless -g)
* Serverless Offline Plugin (npm install serverless-offline --save-dev)
* To install Nodejs all other components run this ( npm install) into the server folder. 
* You need to install (mocha) for running the test case. 
* Run this command (npm run serverless)  into the server folder.
* Open another terminal and Run this command (npm run client) into the server folder.   

Following components are used in the backend.
-----
* [Nodejs] as a javascript runtime 
* [redis] in-memory data structure store, used as a
* [jsonwebtoken] for token base authentication
* [lowdb] as JSON database.
* [chai] as assertion library
* [mocha] as javascript test framework.
* [aws-sdk] for amazon SNS service
* [async] async is a utility module which provides straight-forward
* [superagent] HTTP request library used for testing.l
