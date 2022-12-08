import { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

const _COMPLEXITIES = ['Low', 'Medium', 'High']
const _OUTLINE_TYPES = [
  { value: 'essayOrBlog', label: 'Essay / Blog' },
  { value: 'studyGuide', label: 'Study Guide' },
  { value: 'flashCards', label: 'Flash Cards' },
]

const Form = ({ submitForm }) => {
  // make a form with an input and a button
  // when the button is clicked, the input value is logged to the console
  const [userInput, setUserInput] = useState('')
  const [complexity, setComplexity] = useState(0)
  const [promptType, setPromptType] = useState(_OUTLINE_TYPES[0].value)

  const handleInputChange = (e) => {
    // set the value of the input to the state
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    // prevent the page from refreshing
    e.preventDefault()
    // log the value of the input to the console
    submitForm({ userInput, complexity, promptType })
    // call the onChange function that's passed down as props
  }

  const handleSliderChange = (value) => {
    console.log(value)
    setComplexity(value)
  }

  const handleSelectChange = (value) => {
    console.log(value)
    setPromptType(value.value)
  }

  return (
    <form>
      <textarea
        className="prompt-box"
        placeholder="Paste or type your passage here"
        value={userInput}
        onChange={handleInputChange}
      />
      <div className="prompt-buttons">
        <h4>Outline type</h4>
        {/* <div>{`Complexity: ${_COMPLEXITIES[complexity]}`}</div> */}
        {/* <div className="slider-container">
          <ReactSlider
            className="horizontal-slider"
            min={0}
            max={2}
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            onChange={(value) => handleSliderChange(value)}
            renderThumb={(props, state) => (
              <div {...props}>
                <FontAwesomeIcon icon={faCaretUp} />
              </div>
            )}
          />
        </div> */}
        <div className="select-container">
          <Select
            className="basic-single"
            classNamePrefix="select"
            maxMenuHeight={80}
            options={_OUTLINE_TYPES}
            getOptionLabel={(options) => options['label']}
            getOptionValue={(options) => options['value']}
            onChange={(value) => handleSelectChange(value)}
          />
        </div>

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
