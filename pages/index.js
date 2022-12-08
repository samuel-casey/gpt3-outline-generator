import { useState } from 'react'
import Head from 'next/head'

import Form from '../components/Form'
import Outline from '../components/Outline'

const Home = () => {
  const [outlineText, setOutlineText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchOutline = async ({userInput, promptType, complexity}) => {
    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, promptType, complexity }),
    })

    const data = await response.json()
    console.log('Open API response: ', data);
    return data.output.followUpPromptOutput.text
  }

  const handleSubmitForm = async ({ userInput, promptType, complexity }) => {    
    // fetch output from GPT-3
    setIsGenerating(true)
    const outline = await fetchOutline({userInput, promptType, complexity})
    setIsGenerating(false)
    setOutlineText(outline)
  }

  const _renderOutline = () => {
    // if statement for when outlineText is empty and not generating
    if (isGenerating) {
      return 'Generating...'
    } else if (outlineText === '') {
      return null
    } else {
      return <Outline content={outlineText} />
    }
  }

  return (
    <div className="root">
      <Head>
        <title> Outline </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Outline </h1>
          </div>
          <div className="header-subtitle">
            <h2> Get the key points from any web page </h2>
          </div>
          <div className="form-container">
            <Form submitForm={handleSubmitForm} />
          </div>
          <div className="outline-container">
            {_renderOutline()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
