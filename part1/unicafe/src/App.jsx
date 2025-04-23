import { useState } from "react";

const Button = ({ text, onClick }) => {
	return (
		<button type="button" onClick={onClick}>
			{text}
		</button>
	);
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (good + neutral + bad === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>
							<StatisticLine text="good" />
						</td>
						<td>
							<StatisticLine value={good} />
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine text="neutral" />
						</td>
						<td>
							<StatisticLine value={neutral} />
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine text="bad" />
						</td>
						<td>
							<StatisticLine value={bad} />
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine text="all" />
						</td>
						<td>
							<StatisticLine value={all} />
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine text="average" />
						</td>
						<td>
							<StatisticLine value={average} />
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine text="positive" />
						</td>
						<td>
							<StatisticLine value={positive} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<p>
			{text} {value}
		</p>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseGood = () => {
		setGood(good + 1);
	};

	const increaseNeutral = () => {
		setNeutral(neutral + 1);
	};

	const increaseBad = () => {
		setBad(bad + 1);
	};
	const all = good + neutral + bad;
	const average = (good - bad) / all;
	const positive = (good / (good + bad + neutral)) * 100;
	return (
		<div>
			<h1>Give feedback</h1>
			<Button text="good" onClick={increaseGood} />
			<Button text="neutral" onClick={increaseNeutral} />
			<Button text="bad" onClick={increaseBad} />
			<h1>Statistics</h1>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
