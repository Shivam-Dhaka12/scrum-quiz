import React from 'react';
import Option from './Option';
import { forwardRef, useImperativeHandle } from 'react';

const Question = forwardRef((props, ref) => {
	const [selected, setSelected] = React.useState(-1);
	const [optionarr, setOptionArr] = React.useState(() => {
		const optionEl = [];
		let correctOption = props.correct_option;
		if (
			correctOption.includes('all') ||
			correctOption.includes('All') ||
			correctOption.includes('of the above')
		) {
			props.incorrect_option.push(props.correct_option);
		} else {
			props.incorrect_option.splice(
				Math.floor(Math.random() * 10),
				0,
				props.correct_option
			);
		}

		for (let i = 0; i < props.incorrect_option.length; i++) {
			const id = i;
			const element = (
				<Option
					select={selected === id ? true : false}
					showCorrect={false}
					key={id}
					id={id}
					value={props.incorrect_option[i]}
					correct={props.incorrect_option[i] === props.correct_option}
					handleClick={() => setSelect(id)}
				/>
			);
			optionEl.push(element);
		}
		return optionEl;
	});

	function setSelect(id) {
		setSelected(id);
		setOptionArr((prev) =>
			prev.map((item) => (
				<Option
					showCorrect={false}
					showInCorrect={false}
					select={item.props.id === id ? true : false}
					key={item.props.id}
					id={item.props.id}
					value={item.props.value}
					correct={item.props.correct}
					handleClick={() => setSelect(item.props.id)}
				/>
			))
		);
	}

	useImperativeHandle(ref, () => ({
		showAnswer() {
			setOptionArr((prev) =>
				prev.map((item) => (
					<Option
						showCorrect={item.props.correct}
						showInCorrect={!item.props.correct && item.props.select}
						select={item.props.select}
						key={item.props.id}
						id={item.props.id}
						value={item.props.value}
						correct={item.props.correct}
						handleClick={() => setSelect(item.props.id)}
					/>
				))
			);
		},
		checkAnswer() {
			let res = { selectedOption: -1, isCorrect: 0 };
			for (let i = 0; i < optionarr.length; i++) {
				if (optionarr[i].props.select) {
					res.selectedOption = i;
					res.isCorrect = optionarr[i].props.correct ? 1 : 0;
					break;
				}
			}
			return res;
		},
	}));

	function decodeHtml(html) {
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	return (
		<div className="question">
			<span className="question-value">{decodeHtml(props.value)}</span>
			<div className="option-container">{optionarr}</div>
			<div className="line"></div>
		</div>
	);
});

Question.displayName = 'Question';

export default Question;
