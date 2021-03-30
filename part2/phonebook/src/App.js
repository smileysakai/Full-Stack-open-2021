import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.filterName} onChange={props.handleFilter} />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const {personsToShow} = props
  return(
    <div>
      {personsToShow.map((person) => {
        return(
          <div key={person.name}>{person.name} {person.number}</div>
        )
      }
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const [ showAll, setShowAll ] = useState(true)  
  const [ filterName, setFilterName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const personsToShow = showAll    
  ? persons    
  : persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

  const addName = (event) => {    
    event.preventDefault()
    let nameexists = false
    persons.forEach(function(person) {
      if (newName === person.name){
        window.alert(`${newName} is already added to phonebook`)
        nameexists = true
      } 
    })
    if (!nameexists){
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setFilterName(event.target.value)
    if (event.target.value===''){
      setShowAll(true)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterName={filterName} handleFilter={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber ={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons personsToShow = {personsToShow} />
    </div>
  )
}

export default App