import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
//const baseUrl = 'http://localhost:3001/persons'


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
  const personsToShowFix = [...props.personsToShow]
  return(
    <div>
      {personsToShowFix.map((person) => {
        //console.log(person.id)
        return(
          <div key={person.id}> {person.name} {person.number} <button onClick={() => props.handleDelete([person.id, person.name])}>delete</button></div>
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

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    personService
      .getPersons()
      .then ( contacts => setPersons(contacts))
  },[])

  const personsToShow = showAll    
  ? persons    
  : persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

  const addName = (event) => {    
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const [contactExist] = persons.filter(person => person.name===newName)
    //console.log(contactExist.id)
    if (contactExist){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        //functionality for editing contact
        personService
          .updatePerson(contactExist.id, nameObject)
          .then( updatedPerson => {
            setPersons(persons.map(person => person.id !== contactExist.id ? person : updatedPerson))
            setSuccessMessage(`Updated ${newName}`)
            setTimeout(() => {          
              setSuccessMessage(null)        
            }, 3000)
          })
          .catch(error => {
            //console.log(`Information of ${newName} has already been removed from the server`)
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 3000)
            setPersons(persons.filter(person => person.id !== contactExist.id))
          })
          setNewName('')
          setNewNumber('')
      }
    } else {
      //add new person
      personService
        .addPerson(nameObject)
        .then( addedPersonData => {
          setPersons(persons.concat(addedPersonData))
          setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {          
              setSuccessMessage(null)        
            }, 3000)
          setNewName('')
          setNewNumber('')
        })
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

  const deletePerson = ([contactid, contactname]) => {
    if (window.confirm(`Delete ${contactname} ?`)){
      personService
        .deletePerson(contactid)
      setPersons(persons.filter(person=> person.id !==contactid))
    }
  }

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    if (type === 'success'){
      return (
        <div className="success">
          {message}
        </div>
      )
    } else {
      return  (
        <div className="error">
          {message}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={successMessage} type='success'/>
        <Notification message={errorMessage} type='error'/>
        <Filter filterName={filterName} handleFilter={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber ={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons personsToShow = {personsToShow} handleDelete = {deletePerson}/>
    </div>
  )
}

export default App