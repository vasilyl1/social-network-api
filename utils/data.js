const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.openAI
  });

const openai = new OpenAIApi(configuration);

const botResponse = async (input) => {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: input,
      max_tokens: 20,
      temperature: 0.8
    });
    return completion.data.choices[0].text.replace(/^[\r\n]+$/, '').trim();
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }};

const getReaction = async (body) => {
    // returns the reaction based on the input text body of the thougth
    return await botResponse(`Comment the thought: ${body}. Not more than 100 characters.`);
};

const getUser = async () => {
    return {
        username: await botResponse('Generate one random readable user name no longer than 10 characters'),
        email: await botResponse(`Generate one random email matching the following regular expression: "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/" `)
    }
}

const getThought = async () => {
    return await botResponse('Generate one random thought no more than 100 characters')
}




module.exports = { getUser, getThought, getReaction };