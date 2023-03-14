const getReaction = (body) => {
    // returns the reaction based on the input text body of the thougth
    return 'just a reaction';
};

const getUser = () => {
    return {
        username: 'username',
        email: 'abc@abc.com'
    }
}

const getThought = () => {
    return 'just a random text of thought'
}




module.exports = { getUser, getThought, getReaction };