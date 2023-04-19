const Person = ({person, handleDelete}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
    )
}

const Persons = ({persons, handleDelete}) => {
    return (
        persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)
    )
}

export default Persons