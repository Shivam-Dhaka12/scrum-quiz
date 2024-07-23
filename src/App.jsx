import React from 'react';
import Question from './components/Question';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import Confetti from 'react-confetti';

export default function App() {
	const [quizArray, setQuizArray] = React.useState([]);
	const [questionEl, setQuestionEl] = React.useState([]);
	const [ans, setAns] = React.useState(0);
	const [show, setshow] = React.useState(false);
	const ref = [
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
		useRef(),
	];

	// useEffect(()=>console.log(quizArray),[quizArray])
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
		}
		return array;
	}

	async function start() {
		const quizEl = [];
		// const arr = await getQuiz(category_name, difficulty_name);
		let arr = [
			{
				question:
					'Who are the attendees of scrum sprint planning meeting?',
				correct_answer: 'All of above',
				incorrect_answers: [
					'Development Team',
					'Scrum Master',
					'Product Owner',
				],
			},
			{
				question: 'The concept of "timeboxing" in Agile refers to:',
				correct_answer:
					'Setting a fixed amount of time to complete a task or activity  ',
				incorrect_answers: [
					'Estimating project duration',
					'Prioritizing tasks in a backlog',
					'Creating deadlines for the team',
				],
			},
			{
				question: 'What is the duration of daily scrum meeting?',
				correct_answer: '15 Minutes',
				incorrect_answers: ['5 Minutes', '10 Minutes', '1 hour'],
			},
			{
				question: 'Which are the pillars of Scrum framework?',
				correct_answer: 'All of above',
				incorrect_answers: ['Transparency', 'Inspection', 'Adaptation'],
			},
			{
				question: 'What are the benefits of the Agile/Scrum?',
				correct_answer: 'All of above',
				incorrect_answers: [
					'Improved Quality',
					'Customer Satisfaction',
					'Productivity',
				],
			},
			{
				question: 'Scrum is best described as',
				correct_answer: 'A lightweight framework for complex problems',
				incorrect_answers: [
					'An easy-to-use software development methodology',
					'A software development process for large teams to follow',
					'An Agile approach to software development',
				],
			},
			{
				question:
					'Which of the following is not a Scrum-defined team role or accountability?',
				correct_answer: 'Project manager',
				incorrect_answers: [
					'Product owner',
					'Scrum Master',
					'Developers',
				],
			},
			{
				question:
					'The ScrumMaster and the Product Owner can be the same individual;',
				correct_answer: 'False',
				incorrect_answers: ['True'],
			},
			{
				question: 'What are the scrum values?',
				correct_answer: 'Courage, Focus, Commitment, Respect, Openness',
				incorrect_answers: [
					'Fear, Focus, Indifference, Respect, Non-transparent',
					'Courage, Disruptive, Non-committed, Respect, Openness',
					'Courage, Focus, Commitment, Respect, Non-transparent',
				],
			},
			{
				question:
					'Select the option that suits the Manifesto for Agile Software Development',
				correct_answer: 'All of the mentioned',
				incorrect_answers: [
					'Individuals and interactions',
					'Working software',
					'Customer collaboration',
				],
			},
		];

		arr = shuffleArray(arr);

		for (let index = 0; index < arr.length; index++) {
			let id = nanoid();
			const element = (
				<Question
					ref={ref[index]}
					key={id}
					id={id}
					value={arr[index].question}
					correct_option={arr[index].correct_answer}
					incorrect_option={arr[index].incorrect_answers}
				/>
			);
			// console.log(arr[index].correct_answer);
			quizEl.push(element);
		}
		setQuizArray(arr);
		setQuestionEl(quizEl);
		setAns(0);
		setshow(false);
	}

	function checkAnswer() {
		let res = 0;
		for (let i = 0; i < 10; i++) {
			let curr = ref[i].current.checkAnswer();
			res += curr.isCorrect;
			console.log(curr);
			if (curr.selectedOption < 0) {
				alert('Please answer all the questions');
				return;
			}
		}

		for (let i = 0; i < 10; i++) {
			ref[i].current.showAnswer();
		}
		setAns(res);
		setshow(true);
	}

	const height = window.document.body.offsetHeight;
	return (
		<div>
			{quizArray.length === 0 ? (
				<div className="landing">
					<div className="container">
						<h1 className="title">Scrum Quiz</h1>
						<h4 className="sub-title">Test your knowledge!</h4>

						<button className="start-btn" onClick={() => start()}>
							Start quiz
						</button>
					</div>
				</div>
			) : (
				<div className="main">
					<div className="quiz-container">
						{ans === 10 && (
							<Confetti height={height} className="confetti" />
						)}
						{questionEl}
						{!show && (
							<button
								className="check-btn"
								onClick={() => {
									checkAnswer();
								}}
							>
								Check answers
							</button>
						)}
						{show && (
							<div className="play-again">
								<span className="result">{`You scored ${ans} out of 10`}</span>
								<button
									className="play-btn"
									onClick={() => {
										start();
									}}
								>
									Play again
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
