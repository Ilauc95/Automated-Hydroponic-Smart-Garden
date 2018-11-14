# Micro Garden APP

The application is running on a google firebase server. With a single API end point that saves measurements to google's fire store. 

API: https://garden-app-e0ea1.firebaseapp.com/api

The API is then triggered once an hour by a cron job running here: 

https://cron-job.org/en/members/

## Dependencies 

- https://cron-job.org/en/members/
- https://firebase.google.com/

## Setup 

In order to run the project you are going to need node installed locally.

https://nodejs.org/en/

Run the following commands in your terminal to run the project locally.

This command will install all the external dependencies for Garden App

```
npm install
```

This command starts up a development environment and runs the app in your default browser on port 4200.

```
npm start
```
