const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
};

const Part = ({ part }) => {
	return (
		<>
			<p key={part.id}>
				{part.name} {part.exercises}
			</p>
		</>
	);
};

const Total = ({ total }) => {
	return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }) => {
	const parts = course.parts;
	const exercises = parts.map((part) => [part.exercises]);
	const total = exercises.reduce((s, p) => Number(s) + Number(p), 0);
	return (
		<>
			<Header name={course.name} />
			<Content parts={parts} />
			<Total total={total} />
		</>
	);
};
export default Course;
