import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const BASE_PROMPTS = {
  essayOutline: `Generate a title and outline for a blog based on the following passage. Provide 1-3 sub-bullets for each section of the outline. Make the section headings creative.`,
  studyGuide: `Generate a study guide based on the following passage. The sections of the guide should be Summary (paragraph form), Key Takeaways (bullet points), and Study questions (3-5 of them)`,
  flashCards: `Generate 3-5 flash cards from the following passage. Each flash card should have a question and answer. The question should be a question that someone at reading level would ask about the passage. The answer should be a short answer that someone at reading level would understand. The question and answer should be on the same flash card. The flash cards should be in a format that can be easily imported into Anki or Quizlet.`
}

const FOLLOW_UP_PROMPTS = {
  essayOutline: `Generate key quotations from the following text labelled "Passage" and output them in a list. The quotations should be relevant to the section headings from the text labelled "Outline". The quotations should be in the form of a quote followed by a citation. The quotations should be in a format that can be easily imported into a Google Doc.`,
  studyGuide: `Generate a list of related topics from the following text:`,
  flashCards: `Generate more flash cards based on these existing ones. User the same format provided here: `
}

const buildBasePrompt = (promptType, userInput, complexity) => { 
  return `${BASE_PROMPTS[promptType]} Language Complexity: ${complexity}. Passage: ${userInput}`;
}

const buildFollowUpPrompt = (promptType, userInput, baseOutput) => { 
  return `${FOLLOW_UP_PROMPTS[promptType]} Passage: ${userInput} Outline: ${baseOutput}`;
}

const generateAction = async (req, res) => {
  console.log({body:req.body})
  
  const { userInput, promptType, complexity } = req.body


  const basePromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: buildBasePrompt(userInput, promptType, complexity),
    temperature: 0.8,
    max_tokens: 300, // make this vary depending on length of text passed in
  });
  
  const basePromptOutput = basePromptCompletion.data.choices.pop();
  
  const followUpPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: buildFollowUpPrompt(promptType, userInput, basePromptOutput),  
    temperature: 0.85,
    max_tokens: 300, // make this vary depending on length of text passed in
  });
  
  // Get the output
  const followUpPromptOutput = followUpPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: { followUpPromptOutput, basePromptOutput } });
};

export default generateAction;
