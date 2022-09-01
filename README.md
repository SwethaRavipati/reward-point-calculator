# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


In this project, we are using react framework for the frontend and MongoDB to store the data and express hosting the backend APIs.


### Ways to configure your database details:
Navigate to file: backend/src/index.js and update the Mongodb configuration


Ways to start the backend:
### 'cd backend'
Navigate to backend folder from root path.

### 'npm install'
Installs the required dependencies for backend: express, mongoose, cors etc.,

### 'node src/index.js'
Above command will start the node server and hosts the APIs in http://localhostL3000/

Ways to add or access the Mongodb data:.
There is a sample data in the file: backend/src/SampleData.json. Feel free to use the data and insert it into your database.
You can also use the insert the transaction data using the below API with the below format:
API URL: http://localhost:3000/add_transaction
Body: 
{
    "orderId": "623435df273a5c3e3ee45a137",
    "firstName":"Jacob",
    "lastName":"Anderson",
    "orderDate": "Mon Feb 12 2022 03:00:00",
    "orderTotal": 250
}


Ways to start the frontend:
### 'cd frontend'
Navigate to frontend folder from root path.

### 'npm install'
Installs the required dependencies for frontend: react, redux, mui etc.,

### 'npm start'
Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.


Screenshots of the running application:
Ran the application in my local and uploaded the screenshots in the folder: app-screenshots/

