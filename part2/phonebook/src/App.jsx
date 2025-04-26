import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterInput, setFilterInput] = useState("");

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
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};
	const handleFilterChange = (event) => {
		console.log(event.target.value);
		setFilterInput(event.target.value);
	};

	const entriesToShow = persons.filter((person) =>
		person.name.toLowerCase().trim().includes(filterInput.toLowerCase().trim()),
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<p>
					filter shown with
					<input onChange={handleFilterChange} value={filterInput} />
				</p>
			</div>
			<h2>Add new entry </h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{entriesToShow.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
