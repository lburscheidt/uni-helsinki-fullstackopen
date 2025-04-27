import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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

const promise = axios.get("http://localhost:3001/persons");
console.log(promise);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [personFilter, setPersonFilter] = useState("");
	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	useEffect(() => {
		personService.getAll().then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	console.log("render", persons.length, "persons");

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const personObject = {
				name: newName,
				id: (persons.length + 1).toString(),
				number: newNumber,
			};
			/*if the person is in the phonebook already, display error alert*/
			setPersons(persons.concat(personObject));

			personService.create(personObject).then((response) => {
				setPersons(persons.concat(response.data));
			});
		}
	};

	const handleNameInputChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberInputChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handlePersonFilter = (event) => {
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
