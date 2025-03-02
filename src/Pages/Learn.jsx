import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import bg from "../Assets/design.png";
import { BsTelephone } from "react-icons/bs";
import tempData from "../Data/Tempdata.js";
const Learn = () => {
	const [countryDB, setcountryDB] = useState([]);
	const [countryName, setcountryName] = useState("");
	const [tempcontryName, settempcontryName] = useState("");
	let values = "";

	// get the data using the API
	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => setcountryDB(data))
			.catch((err) => console.log(err));

	}, []);
	// useEffect for name adjustment
	useEffect(() => {
		let wordArr = countryName;
		wordArr = countryName.split(" ");
		for (let i = 0; i < wordArr.length; i++) {
			wordArr[i] = wordArr[i].charAt(0).toUpperCase() + wordArr[i].slice(1);
		}
		wordArr = wordArr.join(" ");
		setcountryName(wordArr);
	}, [countryName]);

	// set name of country
	function setName(e) {
		setcountryName(e);
	}
	// handle situation when wrong contry name is typed
	let countryfilter = countryDB.filter(
		(country) => country.name.common === countryName
	);
	if (countryfilter.length === 0) {
		// set the data to a predefined  default array of object
		countryfilter = tempData;
	}
	return (
		// Main page
		<section className="bg-[var(--primaryBg)] min-h-screen ">
			<Navbar />
			{/* the middle box where the main content is */}
			<div className="questionBox w-[90%] mx-[5%]  bg-[var(--secondbg)] rounded-xl p-[30px] lg:mt-[30px] mt-[10px] z-10 absolute h-[80vh] overflow-auto	">
				{countryfilter.map((item) => {
					// convert some multi level object to an array
					let currencyArray = Object.values(item.currencies);
					let denonymArray = Object.values(item.demonyms);
					let language = Object.values(item.languages);
					let currency = currencyArray[0].name;
					let Indigine = denonymArray[0];
					// the major display. This is where the whole th
					let population = item.population;
					let commaPopulation = population.toLocaleString("en-US");

					return (
						<section
							className=" "
							key={item.name.common}>
							<div className="topside flex flex-col-reverse lg:flex-row md:justify-left justify-center w-full">
								{/* top navigation with the search box */}
								<div className="countryInfo flex lg:flex-row flex-col items-center 	 justify-left gap-5 lg:w-[50%] lg:mt-0 mt-[10%]">
									{/* the flag */}
									<img
										src={item.flags.png}
										alt=""
										className="lg:w-[150px] lg:h-[150px] w-[300px] h-[250px] object-fill text-center"
									/>

									<div className="sideinfo flex flex-col gap-3">
										<h3 className="text-[24px] text-[var(--secondary)] font-bold text-center">
											{item.name.common}
										</h3>
										<div className="bottominfo flex  items-center justify-center gap-5 text-white">
											<h5>{item.capital}</h5>
											<span className="lg:block hidden">|</span>
											<h5 className="flex items-center justify-center gap-3">
												{item.cca3}
											</h5>
											<span className="lg:block hidden">|</span>
											<h5 className="flex items-center justify-center gap-3">
												<BsTelephone />
												{item.idd.root + item.idd.suffixes[0]}
											</h5>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-end justify-center w-full">
									<form
										action=""
										onSubmit={(e) => {
											e.preventDefault();
											settempcontryName("");
										}}
										className="lg:w-[60%] w-[100%] text-white text-center flex lg:flex-row flex-col justify-center items-center ">
										<input
											className="p-[14px] outline-none border-none lg:w-[60%] md:w-[50%] w-full lg:mb-0 mb-[10px] text-black rounded-sm"
											type="text"
											onChange={(e) => {
												values = e.target.value.toLowerCase();
												settempcontryName(values);
											}}
											value={tempcontryName}
											placeholder="Type a country name"
										/>
										<button
											type="submit"
											className="p-[14px] mx-[10px] bg-[var(--secondary)] lg:w-[30%] md:w-[20%] w-full text-[var(--primaryBg)] font-bold rounded-sm"
											onClick={(e) => {
												setName(tempcontryName);
											}}>
											Search
										</button>
									</form>
									<h2 className="text-center lg:w-[60%] w-[100%] mt-[10px] py-1 text-lg text-red-400">
										{item.errorMsg}
									</h2>
								</div>
							</div>

							{/* THE INFORMATTION BOXES */}
							<div className="flex items-center justify-between mt-[50px] flex-wrap flex-col lg:flex-row ">
								{/* BOX 1 */}
								<div className="otherinfo lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg">
									<div className="w-full h-full overflow-hidden">
										<h3 className="text-center text-xl font-bold pt-[10px] pb-[5px] text-[var(--secondary)]">
											Coat Of Arm
										</h3>
										<div className="w-full  flex justify-center items-center">
											<img
												src={item.coatOfArms.svg}
												alt=""
												className="w-[200px] h-[250px] text-center  object-fill"
											/>
										</div>
									</div>
								</div>
								{/* BOX 2 */}
								<div className="namelang lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg p-5 flex flex-col ">
									{/* official name */}
									<p className="flex flex-col items-center justify-between border-b-[1px] border-white pr-5 pb-[10px] text-[var(--secondary)] font-bold w-full text-center">
										Offical name{" "}
										<span className="text-white font-normal">
											{item.name.official}
										</span>
									</p>
									{/* region*/}
									<p className="flex flex-col items-center justify-between border-b-[1px] border-white pr-5 py-[10px] text-[var(--secondary)] font-bold w-full text-center">
										Continent{" "}
										<span className="text-white font-normal">
											{item.continents}
										</span>
									</p>
									{/* Currency */}
									<p className="flex flex-col items-center justify-between	 border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center">
										Currency{" "}
										<span className="text-white font-normal">{currency}</span>
									</p>
									{/* indigine name */}
									<p className="flex flex-col items-center justify-between	  py-[10px] text-[var(--secondary)] font-bold text-center">
										Citizen{" "}
										<span className="text-white font-normal">{Indigine.m}</span>
									</p>
								</div>
								{/* BOX 3 */}
								<div className="geography lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg p-5 flex flex-col">
									{/* GET THE CONTINENT */}
									<p className="flex flex-col items-center justify-between	 border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center">
										Official Languge
										<span className="text-white font-normal">{language}</span>
									</p>
									{/* GET THE POPULATION */}
									<p className="flex flex-col items-center justify-between	 border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center">
										Population{" "}
										<span className="text-white font-normal">
											{commaPopulation}
										</span>
									</p>
									{/* GET THE TIME ZONE */}
									<p className="flex flex-col items-center justify-between	 border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center">
										Time Zone{" "}
										<span className="text-white font-normal">
											{item.timezones[0]}
										</span>
									</p>
									{/* GET THE TIME ZONE */}
									<p className="flex flex-col items-center justify-between	  py-[10px] text-[var(--secondary)] font-bold text-center">
										Start of Week{" "}
										<span className="text-white font-normal">
											{item.startOfWeek}
										</span>
										{/* GET THE TIME ZONE */}
									</p>
								</div>
							</div>
						</section>
					);
				})}
			</div>

			{/* The infrastructure bg */}
			<div className="absolute z-0  bottom-0 top-[1vh] md:top-0 md:w-[100vw] w-[200vw] right-0 h-[100vh] object-fill overflow-y-hidden">
				<img
					src={bg}
					alt="bg"
					className="h-[100vh]"
				/>
			</div>
		</section>
	);
};

export default Learn;
