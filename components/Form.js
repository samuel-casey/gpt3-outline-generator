import { useState, useEffect } from 'react'

const Form = ({ submitForm }) => {
  // make a form with an input and a button
  // when the button is clicked, the input value is logged to the console
  const [inputValue, setInputValue] = useState('')


const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const handleInputChange = (e) => {
    // set the value of the input to the state
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    // prevent the page from refreshing
    e.preventDefault()
    // log the value of the input to the console
    submitForm(inputValue)
    // call the onChange function that's passed down as props
  }

  return (
    <form>
      <textarea
        className="prompt-box"
        placeholder="Paste or type your passage here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="prompt-buttons">
        <a className="generate-button" onClick={handleSubmit}>
          <div className="generate">
            <p>Generate</p>
          </div>
        </a>
      </div>
    </form>
  )
}

export default Form
