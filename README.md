# Social Network API

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. 


## Description

The application is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

Express.js is used for routing, a MongoDB database, and the Mongoose ODM. JavaScript Data object was used to format timestamps.

That application is not deployed, however the link to the video is provided below to be able to demonstrate the API functionality using Insomnia tool.

## Table of Contents

  [Title](#title)

  [Description](#description)

  [Installation](#installation)

  [Usage](#usage)

  [MongoDB_Schema](#MongoDB_Schema)

  [API_Description](#API_Description)

  [License](#license)

  [Contributing](#contributing)

  [Questions](#questions)

## Installation

Step 1: clone GitHub repository, for that run the following command from the command line prompt (make sure you navigate to the directory of your choice before start cloning): git clone https://github.com/vasilyl1/social-network-api

Step 2: navigate to the cloned repositary directory, for that run: cd social-network-api

Step 3: install the libraries required by the application by running: NPM install

Step 4: make sure MongoDB is installed on your machine

Step 5: launch the express.js server by starting the following command from your project directory: npm start

Step 6: he contact information for questions is provided below for the reference

## Usage

Please refer to the video below which demonstrates the use of API (Insomnia tool has been used to correctly demonstrate GET, POST, PUT and DELETE requests):

https://watch.screencastify.com/v/YTie9yZ0CA4dzEw3l2qk


## MongoDB_Schema

User

username :String :Unique :Required :Trimmed
email :String :Required :Unique
thoughts :Array of _id values referencing the Thought model
friends :Array of _id values referencing the User model (self-reference)
Virtual called friendCount that retrieves the length of the user's friends array field on query.

Thought

thoughtText :String :Required :between 1 and 280 characters
createdAt :Date :default value to the current timestamp
username (the user that created this thought) :String :Required
reactions (these are like replies) :array of nested documents created with the reactionSchema
Virtual called reactionCount that retrieves the length of the thought's reactions array field on query

Reaction

reactionId :Mongoose's ObjectId data type :default value is set to a new ObjectId
reactionBody :String :Required :280 character maximum
username :String :Required :createdAt
Date :set default value to the current timestamp :getter method to format the timestamp on query

Reaction is not a model, but used as the reaction field's subdocument schema in the Thought model.

## API_Description


### /api/users

GET all users

GET a single user by its _id and populated thought and friend data

POST a new user:

// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}

PUT to update a user by its _id

DELETE to remove user by its _id

### /api/users/:userId/friends/:friendId

POST to add a new friend to a user's friend list

DELETE to remove a friend from a user's friend list

### /api/thoughts

GET to get all thoughts

GET to get a single thought by its _id

POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
PUT to update a thought by its _id

DELETE to remove a thought by its _id

### /api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value



## Credits

Node.js
Express
MongoDB
Mongoose ODM

## License

MIT License

Copyright (c) 2023 Vasily Likhovaydo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

vl1
  
## Questions

My GitHub name is vl1. Most of the answers to the questions can be found there, here is the link to my profile at GitHub:

https://github.com/vl1

For additional questions please e-mail to likhovaido@gmail.com

Thank you for your interest in this app.
