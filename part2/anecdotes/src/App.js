import React, { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
        next anecdote
      </button>
    </>
  )
}

const Vote = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        vote
      </button>
    </>
  )
}

const ShowVote = (props) => {
  return (
    <>
      <div>
        has {props.votetotal} votes.
      </div>
    </>
  )
}

const MostVotes = (props) => {
  const length = props.votes.length
  let max = 0
  let maxIndex = 0
  for (let i=0; i<length; i++) {
    if (props.votes[i] > max){
      maxIndex=i
      max=props.votes[i]
    }
  }
  return (
    <>
      <h1>Anecdote with the most votes</h1>
      <p>
        {props.anecdotes[maxIndex]}
      </p>
      <div>
        has {max} votes.
      </div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const aneclength = anecdotes.length
  const randomquote = Math.floor((Math.random() * aneclength))
  const selectquote = newValue => {
    //logic that modifies next anecdote to a different anecdote if the next anecdote is the same as current anecdote
    if (newValue===selected) {
      if (newValue===0){
        newValue+=1
      } else {
        newValue-=1
      }
    }
    setSelected(newValue)
  }
  //console.log(selected)

  const [votes, setVotes] = useState(
    Array(aneclength).fill(0)
  )
  
  const increaseByOne = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    //console.log('copyvotes[selected] is: ' + votes[selected])
  }

  //console.log('copyvotes is: ' + votes)
  //console.log('copyvotes[0] is: ' + votes[0] )
  //console.log('selected is: ' + selected)
  //console.log('copyvotes[selected] is: ' + votes[selected])
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
      </div>
      <ShowVote votetotal={votes[selected]} />
      <Vote onClick={increaseByOne} />
      <Button handleClick={()=>selectquote(randomquote)}/>
      <div>
        <MostVotes anecdotes={anecdotes} votes={votes}/>
      </div>
    </div>
    
  )
}

export default App