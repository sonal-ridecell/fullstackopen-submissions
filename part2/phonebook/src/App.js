import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={ message[1] }>
      {message[0]}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    let personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .destroy(id)
        .then(res => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setNotif([`Looks like ${personToDelete.name} is already deleted.`, 'error'])
          setTimeout(() => setNotif(null), 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace?`)) {
        let personToReplace = persons.find(person => person.name === newName)
        personService
          .update(personToReplace.id, personObject)
          .then(returnedPerson => setPersons(persons.map(person => person.name === newName ? returnedPerson : person)))
          .catch(error => {
            setNotif([`Looks like ${personToReplace.name} is already deleted.`, 'error'])
            setTimeout(() => setNotif(null), 5000)
            setPersons(persons.filter(person => person.name !== personToReplace.name))
          })
        setNotif([`${newName} updated!`, 'success']);
      }
    }
    else {
      personService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)))
      setNotif([`${newName} updated!`, 'success']);
    }
    setTimeout(() => setNotif(null), 5000)
    setNewName('')
    setNewNumber('')
  }

  let filteredPersons = persons
  if (search) {
    filteredPersons = persons.filter(person => person.name.includes(search) || person.number.includes(search))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App