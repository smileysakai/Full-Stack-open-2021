import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.identifier}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  if (props.total===0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <Statistic text="good" value ={props.goodscore} />
        <Statistic text="neutral" value ={props.neutralscore} />
        <Statistic text="bad" value ={props.badscore} />
        <Statistic text="all" value ={props.total} />
        <Statistic text="average" value ={props.average} />
        <Statistic text="positive" value ={props.positive} identifier='%'/>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }
  const totalFeedback = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1)/totalFeedback
  const posOverall = (good/totalFeedback * 100)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() =>setToGood( good + 1)} text="good"/>
      <Button handleClick={() =>setToNeutral( neutral + 1)} text="neutral"/>
      <Button handleClick={() =>setToBad( bad + 1)} text="bad"/>
      
      <h1>statistics</h1>
      <Statistics goodscore={good} neutralscore={neutral} badscore={bad} total={totalFeedback} average={average} positive={posOverall}/>
    </div>
  )
}

export default App