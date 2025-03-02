import React from "react";
import Navbar from "../Components/Navbar";
import cooking from "../Assets/chef.png";
import { Link } from "react-router-dom";
import bg from "../Assets/design.png";
const PlayRandom = () => {
	return (
		<section className="bg-[var(--primaryBg)] min-h-screen z-30 pb-[40px] overflow-auto  ">
			<Navbar />
			<div className="questionBox md:w-[40%] w-[80%] mx-[10%] md:mx-[30%] h-auto bg-[var(--secondbg)] rounded-xl p-[30px] md:mt-[100px] absolute z-30">
				<h2 className="text-lg text-center text-[var(--secondary)] font-bold mb-[30px]">
					Still cooking up this page.
				</h2>
				<img
					src={cooking}
					alt=""
					className="md:w-[20%] flex items-center justify-center md:mx-[40%]"
				/>
				<Link
					to="/selectgame"
					className="p-[12px] md:w-[50%] md:mx-[25%] w-full text-[var(--secondary)] border-[var(--secondary)] border-[2px] block text-center rounded-lg hover:bg-white transition-color duration-[1s] hover:text-[var(--primaryBg)]">
					Change Level
				</Link>
			</div>
			{/* The infrastructure bg */}
			<div className="absolute z-0  bottom-0 top-[1vh] md:top-0 md:w-[100vw] w-[200vw] right-0 h-[100vh] object-fill overflow-y-hidden">
				<img src={bg} alt="bg" className="h-[100vh]" />
			</div>
		</section>
	);
};

export default PlayRandom;
