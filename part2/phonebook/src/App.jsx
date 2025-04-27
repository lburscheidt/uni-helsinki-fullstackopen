import { useState } from "react";
import "./App.css";

const Persons = (props) => {
	return (
		<div>
			{props.personsToShow.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

const Filter = (props) => {
	return (
		<label>
			filter shown with
			<input value={props.value} onChange={props.onChange} />
		</label>
	);
};
const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<div>
				<label>
					name:
					<input value={props.name} onChange={props.handleNameInputChange} />
				</label>
				<br />
				<label>
					number:
					<input
						value={props.number}
						onChange={props.handleNumberInputChange}
					/>
				</label>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};
const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [personFilter, setPersonFilter] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const personObject = {
				name: newName,
				id: persons.length + 1,
				number: newNumber,
			};
			/*if the person is in the phonebook already, display error alert*/
			setPersons(persons.concat(personObject));
		}
	};

	const handleNameInputChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberInputChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const handlePersonFilter = (event) => {
		console.log(event.target.value);
		setPersonFilter(event.target.value.toLowerCase().trim());
	};

	const personsToShow = persons.filter(
		(person) =>
			person.name.toLowerCase().trim().startsWith(personFilter) === true,
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={personFilter} onChange={handlePersonFilter} />
			<h3>Add a new</h3>
			<PersonForm
				onSubmit={addPerson}
				name={newName}
				number={newNumber}
				handleNumberInputChange={handleNumberInputChange}
				handleNameInputChange={handleNameInputChange}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} persons={persons} />
		</div>
	);
};

export default App;
