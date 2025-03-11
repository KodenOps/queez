import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Game = ({ gameData, question, question2 }) => {
	const [index, setindex] = useState(1);
	const [score, setscore] = useState(0);
	const [remark, setremark] = useState(
		"Giving up is okay. But doing that without even trying first? That's a dick move!"
	);
	const [shuffledQuestions, setShuffledQuestions] = useState([]);
	const [shuffledOptions, setShuffledOptions] = useState([]);

	// Fisher-Yates Shuffle Algorithm
	const shuffle = (array) => {
		let shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray;
	};

	// Get remark based on score
	const getRemark = (score) => {
		if (score === 0)
			return 'Your head big and empty. It should be used as a cupboard.';
		if (score <= 3) return 'Bad news mate! You are too Dumb';
		if (score <= 6) return 'You tried, but you need to improve';
		if (score <= 9) return 'You are smart. Keep it up';
		return 'You are on fire! Try another level';
	};

	// Shuffle questions once when the component mounts
	useEffect(() => {
		setShuffledQuestions(shuffle(gameData)); // Shuffle the questions
	}, [gameData]);

	// Shuffle options when a new question is loaded
	useEffect(() => {
		const currentQuestion = shuffledQuestions[index - 1]; // Get the current question
		if (currentQuestion) {
			setShuffledOptions(shuffle([...currentQuestion.options])); // Shuffle its options
		}
	}, [index, shuffledQuestions]);

	// Update remark whenever score changes
	useEffect(() => {
		setremark(getRemark(score));
	}, [score]);

	return index <= 10 ? (
		<div className='questionBox absolute z-10 w-[90%] mx-[5%] md:mt-[10vh]  '>
			{shuffledQuestions.length > 0 && (
				<div>
					{/* the question section */}
					<div className='text-xl text-white text-bold flex flex-col items-center justify-center gap-[10px] md:gap-[30px]'>
						<p className='rounded-full text-center flex items-center justify-center text-2xl '>
							{index}/10 ===== {shuffledQuestions[index - 1].level} Level
						</p>
						<p className='md:text-3xl text-xl md:text-left text-center text-[var(--secondary)]'>
							{question} {shuffledQuestions[index - 1].name} {question2}
						</p>
					</div>
					{/* the option section */}
					<div className='option flex flex-wrap gap-[20px] mt-[10%]  md:mt-[40px] justify-center items-center md:flex-row flex-col  text-white'>
						{shuffledOptions.map((option) => (
							<button
								key={option}
								className='p-[20px] border-[2px] border-[var(--white)] min-w-[60vw] md:min-w-[15vw] gap-[20px] rounded-lg'
								onClick={(e) => {
									if (option === shuffledQuestions[index - 1].answer) {
										setscore((prevScore) => prevScore + 1);
										e.target.style.backgroundColor = 'green';
									} else {
										e.target.style.backgroundColor = 'red';
									}
									setTimeout(() => {
										setindex((prevIndex) => prevIndex + 1);
									}, 1000);
								}}>
								{option}
							</button>
						))}
					</div>
					<div className='w-full flex items-center justify-center'>
						<button
							className='p-[20px] border-[2px] border-white text-white min-w-[60vw]  md:min-w-[25vw] gap-[20px] rounded-lg bg-red-500 md:mt-[100px] mt-[30px]'
							onClick={() => {
								setindex(11);
							}}>
							Give Up
						</button>
					</div>
				</div>
			)}
		</div>
	) : (
		// This handles when the index is now 11 (score page)
		<div className='scorepage md:w-[50vw] w-[80vw] h-[70vh] md:mx-[25vw] mx-[10vw] bg-[var(--secondbg)] rounded-md p-[10px] absolute z-10'>
			<div className='result text-center h-[50%] outline-dashed outline-[var(--secondary)] rounded-t-lg p-[20px] flex flex-col items-center justify-center'>
				<h2 className='text-xl text-[var(--secondary)] font-bold'>
					Your score <br />
					<span className='text-3xl text-white font-normal'>
						{(score / 10) * 100}%
					</span>
				</h2>
				<h2 className='text-md font-bold mt-[20px] text-[var(--secondary)]'>
					Remark <br />
					<span className='text-lg text-white font-normal'>{remark}</span>
				</h2>
			</div>
			{/* The Button group */}
			<div className='btns w-[80%] mx-[10%] flex gap-[30px] justify-center items-center md:flex-row flex-col h-[50%]'>
				<button
					onClick={() => {
						setindex(1);
						setscore(0);
						setremark(
							"Giving up is okay. But doing that without even trying first? That's a dick move!"
						);
						setShuffledQuestions(shuffle(gameData)); // Reshuffle the questions
					}}
					className='p-[12px] md:w-[45%] w-full bg-[var(--secondary)] rounded-lg hover:bg-[var(--brownColor)] transition-color duration-[1s]'>
					Retry
				</button>
				<Link
					to='/selectgame'
					onClick={() => {
						setindex(1);
						setscore(0);
					}}
					className='p-[12px] md:w-[45%] w-full text-[var(--secondary)] border-[var(--secondary)] border-[2px] block text-center rounded-lg hover:bg-white transition-color duration-[1s] hover:text-[var(--primaryBg)]'>
					Change Level
				</Link>
			</div>
		</div>
	);
};

export default Game;
