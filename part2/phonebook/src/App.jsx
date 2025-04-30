import { useState, useEffect } from "react";
import personService from "./services/persons";

const Persons = (props) => {
	console.log(props);
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

const Filter = ({ value, onChange }) => {
	return (
		<label>
			filter shown with
			<input value={value} onChange={onChange} />
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

const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}
	if (message.startsWith("Successfully")) {
		return <div className="notification">{message}</div>;
	}
		return <div className="error">{message}</div>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [personFilter, setPersonFilter] = useState("");
	const [notification, setNotification] = useState(null);

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
			const newPersonObject = {
				...person,
				number: newNumber,
			};

			if (
				window.confirm(
					`${newName} is already added to phonebook, replace old number with the new one?`,
				)
			) {
				personService
					.update(id, newPersonObject)
					.then((response) => {
						setPersons(
							persons.map((person) =>
								person.name === newPersonObject.name ? response.data : person,
							),
						);
						setNotification(`Successfully added new number for ${newName}.`);
						setTimeout(() => {
							setNotification(null);
						}, 5000);
					})
					.catch((error) => {
						setNotification(
							`Information for ${newName} has already been removed from the server.`,
						);
						setTimeout(() => {
							setNotification(null);
						}, 5000);
						setPersons(
							persons.filter((person) => person.name !== newPersonObject.name),
						);
					});
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};

			personService.create(personObject).then((response) => {
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
			});
			setNotification(`Successfully added ${newName}`);
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	const deletePerson = (id) => {
		personService.remove(id).then(() => {
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
			<Notification message={notification} />
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
