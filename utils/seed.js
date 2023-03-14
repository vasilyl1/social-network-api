const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUser, getThought, getReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  // how much data to generate
  const noUsers = 8; // total number of users
  const noThoughts = 20; // total number of thoughts, approximately
  const noReactions = 10; // total number of reactions, approximately
  const noFriends = 5; // total number of friends for the database
  // generating users
  const users = [];
  for (let i = 0; i < noUsers; i++) { // generate users
    const name = getUser(); // get random username and e-mail for the new user
    const newUser = {
      username: name.username,
      email: name.email
    }
    users.push(newUser);
  }
  // generating thoughts
  const thoughts = []; // generate random thoughts for the created users
  const thoughtsNumber = Math.floor(Math.random() * noThoughts); // get random number of thougths
  for (let i = 0; i < thoughtsNumber; i++) {
    const newThought = {
      thoughtText: getThought(), // gets random text of thought
      username: users[Math.floor(Math.random() * noUsers)].username // random user
    }
    thoughts.push(newThought);
  }



  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // generating reactions

  let thoughtData = []; // get the newly created id's of all pushed thoughts
  await Thought.collection('thoughts')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      thoughtData = results;
    });

  const reactionsNumber = Math.floor(Math.random() * noReactions); // get random number of reactions
  let thoughtToAttach = 0; // randomly choose the thought to attach the reaction
  let newReaction = {};
  for (let i = 0; i < reactionsNumber; i++) {
    thoughtToAttach = Math.floor(Math.random() * noThoughts); // which thought to attach to
    newReaction = {
      reactionBody: getReaction(thoughtData[thoughtToAttach].thoughtText), // gets random text of reaction
      username: users[Math.floor(Math.random() * noUsers)].username // random user
    }
    await Thought.findOneAndUpdate( // attach the reaction to the thought
      { _id: thoughtData[thoughtToAttach]._id },
      { $addToSet: { reactions: newReaction } }
    );
  }

  // generating friends

  let userData = []; // get the newly created id's of all pushed thoughts
  await User.collection('users')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      userData = results;
    });
  let randomFriend = 0;
  for (let i = 0; i < noFriends; i++) {
    randomFriend = Math.floor(Math.random() * noUsers); // choose the random friend
    // check so that there is no friendship in place
    if (!userData.find(element => element._id == userData[randomFriend]._id)) {
      await User.findOneAndUpdate( // attach the friend ID to the user
        { _id: userData[randomFriend]._id },
        { $addToSet: { friends: userData[randomFriend]._id } }
      );
    }
  }

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});