import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
	return (
		<div>
			<p>
				<input onChange={props.onChange} value={props.value} />
			</p>
		</div>
	);
};

const Input = (props) => {
	return (
		<>
			<div>
				{props.text}
				<input value={props.value} onChange={props.onChange} />
			</div>
			<br />
		</>
	);
};

const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<Input
				text="Name"
				value={props.newName}
				onChange={props.handleNameChange}
			/>
			<Input
				text="Number:"
				value={props.newNumber}
				onChange={props.handleNumberChange}
			/>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = (props) => {
	return props.entriesToShow.map((person) => (
		<p key={person.id}>
			{person.name} {person.number}
		</p>
	));
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterInput, setFilterInput] = useState("");

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
		};
		if (persons.some((event) => event.name === nameObject.name)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(nameObject));
			setNewName("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleFilterChange = (event) => {
		setFilterInput(event.target.value);
	};

	const entriesToShow = persons.filter((person) =>
		person.name.toLowerCase().trim().includes(filterInput.toLowerCase().trim()),
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter onChange={handleFilterChange} value={filterInput} />
			<h2>Add new entry </h2>
			<PersonForm onSubmit={addName} />
			<h2>Numbers</h2>
			<Persons entriesToShow={entriesToShow} />
		</div>
	);
};

export default App;
