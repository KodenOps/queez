import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../Components/Navbar';
import bg from '../Assets/design.png';
import { BsTelephone } from 'react-icons/bs';
import tempData from '../Data/Tempdata.js';
import { mydata } from '../Data/API.js';
const Learn = () => {
	const [countryDB, setCountryDB] = useState([]);
	const [countryName, setCountryName] = useState('');
	const [tempCountryName, setTempCountryName] = useState('');

	useEffect(() => {
		setCountryDB(mydata);
	}, []);

	const normalizeName = (name) => {
		return name
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formatted = normalizeName(tempCountryName.trim().toLowerCase());
		setCountryName(formatted);
		setTempCountryName('');
	};

	const countryFilter = useMemo(() => {
		if (!Array.isArray(countryDB)) return tempData;

		const filtered = countryDB.filter(
			(country) =>
				country.name.common.toLowerCase() === countryName.toLowerCase()
		);
		return filtered.length > 0 ? filtered : tempData;
	}, [countryDB, countryName]);

	return (
		<section className='bg-[var(--primaryBg)] min-h-screen'>
			<Navbar />
			<div className='questionBox w-[90%] mx-[5%] bg-[var(--secondbg)] rounded-xl p-[30px] lg:mt-[30px] mt-[10px] z-10 absolute h-[80vh] overflow-auto'>
				{countryFilter.map((item) => {
					const currencyArray = item.currencies
						? Object.values(item.currencies)
						: [];
					const denonymArray = item.demonyms
						? Object.values(item.demonyms)
						: [];
					const languageArray = item.languages
						? Object.values(item.languages)
						: [];
					const currency = currencyArray[0]?.name || 'N/A';
					const Indigine = denonymArray[0] || { m: 'N/A' };
					const population = item.population || 0;
					const commaPopulation = population.toLocaleString('en-US');

					return (
						<section key={item.name.common}>
							<div className='topside flex flex-col-reverse lg:flex-row md:justify-left justify-center w-full'>
								<div className='countryInfo flex lg:flex-row flex-col items-center justify-left gap-5 lg:w-[50%] lg:mt-0 mt-[10%]'>
									<img
										src={item.flags?.png}
										alt='flag'
										className='lg:w-[150px] lg:h-[150px] w-[300px] h-[250px] object-fill text-center'
									/>
									<div className='sideinfo flex flex-col gap-3'>
										<h3 className='text-[24px] text-[var(--secondary)] font-bold text-center'>
											{item.name.common}
										</h3>
										<div className='bottominfo flex items-center justify-center gap-5 text-white'>
											<h5>{item.capital}</h5>
											<span className='lg:block hidden'>|</span>
											<h5>{item.cca3}</h5>
											<span className='lg:block hidden'>|</span>
											<h5 className='flex items-center gap-3'>
												<BsTelephone />
												{item.idd?.root + (item.idd?.suffixes?.[0] || '')}
											</h5>
										</div>
									</div>
								</div>

								<div className='flex flex-col items-end justify-center w-full'>
									<form
										onSubmit={handleSubmit}
										className='lg:w-[60%] w-[100%] text-white text-center flex lg:flex-row flex-col justify-center items-center'>
										<input
											className='p-[14px] outline-none border-none lg:w-[60%] md:w-[50%] w-full lg:mb-0 mb-[10px] text-black rounded-sm'
											type='text'
											value={tempCountryName}
											onChange={(e) => setTempCountryName(e.target.value)}
											placeholder='Type a country name'
										/>
										<button
											type='submit'
											className='p-[14px] mx-[10px] bg-[var(--secondary)] lg:w-[30%] md:w-[20%] w-full text-[var(--primaryBg)] font-bold rounded-sm'>
											Search
										</button>
									</form>
								</div>
							</div>

							<div className='flex items-center justify-between mt-[50px] flex-wrap flex-col lg:flex-row'>
								<div className='otherinfo lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg'>
									<div className='w-full h-full overflow-hidden'>
										<h3 className='text-center text-xl font-bold pt-[10px] pb-[5px] text-[var(--secondary)]'>
											Coat Of Arm
										</h3>
										<div className='w-full flex justify-center items-center'>
											<img
												src={item.coatOfArms?.svg}
												alt='coat of arms'
												className='w-[200px] h-[250px] object-fill'
											/>
										</div>
									</div>
								</div>

								<div className='namelang lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg p-5 flex flex-col'>
									<p className='flex flex-col items-center border-b-[1px] border-white pb-[10px] text-[var(--secondary)] font-bold text-center'>
										Official name{' '}
										<span className='text-white font-normal'>
											{item.name.official}
										</span>
									</p>
									<p className='flex flex-col items-center border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center'>
										Continent{' '}
										<span className='text-white font-normal'>
											{item.continents}
										</span>
									</p>
									<p className='flex flex-col items-center border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center'>
										Currency{' '}
										<span className='text-white font-normal'>{currency}</span>
									</p>
									<p className='flex flex-col items-center py-[10px] text-[var(--secondary)] font-bold text-center'>
										Citizen{' '}
										<span className='text-white font-normal'>{Indigine.m}</span>
									</p>
								</div>

								<div className='geography lg:w-[30%] w-full mb-[20px] h-[300px] bg-[var(--box)] rounded-lg p-5 flex flex-col'>
									<p className='flex flex-col items-center border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center'>
										Official Language{' '}
										<span className='text-white font-normal'>
											{languageArray.join(', ')}
										</span>
									</p>
									<p className='flex flex-col items-center border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center'>
										Population{' '}
										<span className='text-white font-normal'>
											{commaPopulation}
										</span>
									</p>
									<p className='flex flex-col items-center border-b-[1px] border-white py-[10px] text-[var(--secondary)] font-bold text-center'>
										Time Zone{' '}
										<span className='text-white font-normal'>
											{item.timezones?.[0]}
										</span>
									</p>
									<p className='flex flex-col items-center py-[10px] text-[var(--secondary)] font-bold text-center'>
										Start of Week{' '}
										<span className='text-white font-normal'>
											{item.startOfWeek}
										</span>
									</p>
								</div>
							</div>
						</section>
					);
				})}
			</div>

			<div className='absolute z-0 bottom-0 top-[1vh] md:top-0 md:w-[100vw] w-[200vw] right-0 h-[100vh] object-fill overflow-y-hidden'>
				<img
					src={bg}
					alt='bg'
					className='h-[100vh]'
				/>
			</div>
		</section>
	);
};

export default Learn;
