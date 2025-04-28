import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Persons = (props) => {
	return (
		<div>
			{props.personsToShow.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
					<button
						type="button"
						id={person.id}
						onClick={() => {
							if (window.confirm(`Do you want to delete ${person.name}?`)) {
								props.deletePerson(person.id);
							}
						}}
					>
						delete
					</button>
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
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [personFilter, setPersonFilter] = useState("");

	useEffect(() => {
		personService.getAll().then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.find((person) => person.name === newName)) {
			const person = persons.find((person) => person.name === newName);
			const id = person.id;
			const personObject = {
				...person,
				number: newNumber,
			};

			if (
				window.confirm(
					`${newName} is already added to phonebook, replace old number with the new one?`,
				)
			) {
				personService.update(id, personObject).then((response) => {
					setPersons(
						persons.map((person) =>
							person.name === personObject.name ? response.data : person,
						),
					);
				});
			} else {
				const personObject = {
					name: newName,
					number: newNumber,
					id: (persons.length + 1).toString(),
				};
				/*if the person is in the phonebook already, display error alert*/
				setPersons(persons.concat(personObject));

				personService.create(personObject).then((response) => {
					setPersons(persons.concat(response.data));
				});
			}
		}
	};
	const deletePerson = (id) => {
		personService.remove(id).then(() => {
			setPersons(persons.filter((person) => person.id !== id));
		});
	};

	const updateNumber = (id, newNumber) => {
		personService.update(id, newNumber).then(() => {
			setPersons(persons.filter((person) => person.id !== id));
		});
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
			<Persons
				personsToShow={personsToShow}
				persons={persons}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
