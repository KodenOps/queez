import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Game = ({ gameData }) => {
	const [index, setindex] = useState(1);
	const [score, setscore] = useState(0);
	const [remark, setremark] = useState(
		"Giving up is okay. But doing that without even trying first? That's a dick move!"
	);

	let levels = gameData;

	function shuffle() {
		for (let i = 0; i <= levels.length - 1; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = levels[i];

			levels[i] = levels[j];
			temp.id = i;
			levels[j] = temp;
		}
	}

	function getRemark() {
		switch (score) {
			case '':
				setscore(0);
				setremark(
					"Giving up is okay. But doing that without even trying first? That's a dick move!"
				);
				break;
			case 0:
				setremark('Your head big and empty. It should be used as a cupboard.');
				break;
			case 1:
			case 2:
			case 3:
				setremark('Bad news mate! You are too Dumb');
				break;
			case 4:
			case 5:
			case 6:
				setremark('You tried, but you need to improve');
				break;
			case 7:
			case 8:
			case 9:
				setremark('You are smart. Keep it up');
				break;
			case 10:
				setremark('You are on fire! Try another level');
				break;
			default:
				setremark(
					"Giving up is okay. But doing that without even trying first? That's a dick move!"
				);
				break;
		}
	}

	return index <= 10 ? (
		<div className='questionBox absolute z-10 w-[90%] mx-[5%] '>
			{levels
				.filter((item) => item.id === index)
				.map((e) => {
					return (
						<div key={e.id}>
							{/* the question section */}
							<div className=' text-xl text-white text-bold flex flex-col items-center justify-center gap-[10px] md:gap-[30px]'>
								<p className=' rounded-full  text-center flex items-center justify-center text-2xl '>
									{index}/10 ===== {e.level} Level
								</p>
								<p className='md:text-3xl text-xl md:text-left text-center text-[var(--secondary)]'>
									What is the capital of {e.name}
								</p>
							</div>
							{/* the option section */}
							<div className='option flex flex-wrap gap-[20px] mt-[10%]  md:mt-[40px] justify-center items-center md:flex-row flex-col  text-white'>
								{e.options.map((option) => (
									<div key={option}>
										{' '}
										<button
											key={option}
											className='p-[20px] border-[2px] border-[var(--white)] min-w-[60vw] md:min-w-[15vw] gap-[20px] rounded-lg'
											onClick={(h) => {
												if (option === e.answer) {
													setscore((prevScore) => prevScore + 1);
													h.target.style.backgroundColor = 'green';
													getRemark();
												} else {
													setscore(score);
													h.target.style.backgroundColor = 'red';
													getRemark();
												}

												setTimeout(() => {
													setindex((prevIndex) => prevIndex + 1);
												}, 1000);
											}}>
											{option}
										</button>
									</div>
								))}
								<button
									className='p-[10px] border-[2px] border-[var(--white)] w-full md:w-[15vw] gap-[20px] rounded-lg bg-red-500 md:mt-[100px] mt-[30px]'
									onClick={() => {
										setindex(11);
										shuffle();
									}}>
									Give Up
								</button>
							</div>
						</div>
					);
				})}
		</div>
	) : (
		// this cater for when the index is now 11. It shows the score page

		<div className='scorepage md:w-[50vw] w-[80vw] h-[70vh] md:mx-[25vw] mx-[10vw] bg-[var(--secondbg)] rounded-md p-[10px] absolute z-10'>
			<div className='result text-center h-[50%] outline-dashed outline-[var(--secondary)] rounded-t-lg p-[20px] flex flex-col items-center justify-center'>
				<h2 className='text-xl text-[var(--secondary)] font-bold'>
					Your score <br />{' '}
					<span className='text-3xl text-white font-normal'>
						{(score / gameData.length) * 100}%
					</span>
				</h2>
				<h2 className='text-md font-bold mt-[20px] text-[var(--secondary)]'>
					Remark <br />{' '}
					<span className='text-lg text-white font-normal'>{remark}</span>
				</h2>
			</div>
			{/* The Button group */}
			<div className='btns w-[80%] mx-[10%]  flex gap-[30px] justify-center items-center md:flex-row flex-col h-[50%]'>
				<button
					onClick={() => {
						setindex(1);
						setscore(0);
						setremark(
							"Giving up is okay. But doing that without even trying first? That's a dick move!"
						);

						shuffle();
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
