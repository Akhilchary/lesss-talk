# Lesss-Talk
Lesss-Talk 
-this repository contains a chat room application built with socket.io, expressJS, and MongoDB.

## Tech-stack used-
- HTMLCSS,EJS(for front-end )
- ExpressJS and NodeJS(for backend server)
- Socket.io(for real-time interaction between client and server)
- MongoDB(database to store users)

## Features -
- New users can register with a username ,email and password
- Registered users can use their credentials (username and password) to log in
- After logging in user can join an existing room or create a new room
- User can know the room they have joined
- User can view users who are online in the room
- The bot will notify when a new user joins the room as well as when a user leaves the room

## Installation Guide -

1. Install [Node.js](https://nodejs.org/). Check using the following commands in the terminal -

```cmd
$ node -v
```
2. Open your terminal and run the following -
fork the repo
```cmd
$ git clone <clone link>
$ cd <project path>
$ npm install
```

3.
```
$ node server
```
or
```
$ nodemon server
```


4. Now, the server is running, open the link http://localhost:6969 to access the application

Heroku Link - https://less-talk.herokuapp.com/
