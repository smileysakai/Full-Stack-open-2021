import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  const personsRequest = axios.get(baseUrl)
  const responseData = personsRequest.then( response => response.data)
  return responseData
}

/*useEffect(() => {
  const personsRequest = axios.get(baseUrl)
  const responseData = personsRequest.then( response => response.data)
  responseData.then ( numbers => setPersons(numbers))
},[]) */

const addPerson = (contactObject) => {
  const request = axios.post(baseUrl, contactObject)
  const addedPerson = request.then( addedPerson => addedPerson.data)
  return addedPerson
}

/*
  //add persons
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
      const request = axios.post(baseUrl, nameObject)
      const addedPerson = request.then( returnedPerson => 
        returnedPerson.data
      )
      addedPerson.then( addedPersonData => {
        setPersons(persons.concat(addedPersonData))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  */

const deletePerson = (contactid) => {
  const request = axios.delete(`${baseUrl}/${contactid}`)
  return request
}

const updatePerson = (contactid, contactObject) => {
  const personsRequest = axios.put(`${baseUrl}/${contactid}`, contactObject)
  return personsRequest.then(response => response.data)
}

const personService = {getPersons, addPerson, deletePerson, updatePerson}

export default personService