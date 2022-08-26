# ThumbStack

## What is ThumbStack?
ThumbStack is an application that allows you to create and save thumbnails for your videos. It's frontend is created with React and the editor uses the Konva library to create, transform and export canvas elements. The back-end consists of an Express server while the database uses MongoDB with Mongoose.

![Thumbstack editor screenshot](images/editor.png?raw=true "Thumbstack")


## Prerequisites
Must have installed:
- NodeJS
- NPM
- MongoDB

Must have a Cloudinary account with an unsigned preset.


## Installation
- Fork and clone this repository.
- `cd client` into the cloned repo's client directory and run `npm install`.
- Following the .env.example file, add an .env file in the client directory with the respective variables.
- Run `npm start` and the React app should start.


- Open another terminal in the root directory and go to the server directory: `cd server`.
- Run `npm install` to install server dependancies.
- Following the .env.example file, add an .env file in the server directory with the respective variables.
- If you have nodemon installed run `nodemon` else run `node` to start the server.