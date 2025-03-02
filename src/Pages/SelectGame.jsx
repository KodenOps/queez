import React from 'react';
import Navbar from '../Components/Navbar';
import bg from '../Assets/bg.mp4';
import { Link } from 'react-router-dom';
import { SlGameController } from 'react-icons/sl';
import { FiBook } from 'react-icons/fi';

const SelectGame = () => {
	return (
		<section className='py-[2vh]'>
			<Navbar />
			<video
				src={bg}
				alt='background'
				muted
				loop
				autoPlay
				className='md:h-screen h-screen  fixed  w-screen object-cover  top-0 left-0 opacity-90 '
			/>
			<div className=' w-[90vw] mx-[5vw] sm:w-[60vw] sm:mx-[20vw] md:mt-[3vh] mt-[1vh] px-[24px]  py-[32px] absolute rounded-lg z-0 flex items-center justify-center bg-white border-2 border-[var(--secondary)] '>
				<div className='h-full w-full text-black   z-10 overflow-y-scroll overflow-x-hidden '>
					<h4 className='text-[var(--deepBlue)] text-center z-10  text-[24px] font-extrabold'>
						Choose Your Starting Point
					</h4>
					<p className='text-center mt-[2px] z-10 mb-[10px] pb-[5px]'>
						Welcome to IQueez. You have two options to learn about countries.
						Either play a queez game or search for any country you want and
						learn basic stuff about them. So, Where should we start?
					</p>
					<div className='btn flex justify-center items-center md:flex-row flex-col gap-[5%]'>
						<Link
							className='md:w-[40%] w-[90%] mt-[10px] bg-[var(--deepBlue)] py-[15px] rounded-full  flex items-center text-white justify-center gap-3'
							to='/selectgame'>
							{' '}
							<SlGameController />
							Play Game Now
						</Link>
						<Link
							className='md:w-[40%] w-[90%] mt-[20px] border-[3px] border-[var(--deepBlue)] py-[15px] rounded-full  flex items-center text-[var(--deepBlue)] justify-center gap-3'
							to='/learn'>
							{' '}
							<FiBook />
							Learn About Countries
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SelectGame;
