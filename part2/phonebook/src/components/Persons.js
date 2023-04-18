const Person = ({person}) => <p> {person.name} {person.number} </p>

const Persons = ({persons}) => persons.map(person => <Person key={person.id} person={person} />)

export default Persons