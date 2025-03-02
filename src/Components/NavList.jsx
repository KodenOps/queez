import React from "react";
import { Link } from "react-router-dom";
import iconsList from "../Data/NavLinks";
const NavList = () => {
	return (
		<div>
			<ul className="flex gap-5 text-[18px] p-5 ">
				{iconsList.map((e) => (
					<Link to={e.link} key={e.icon}>
						<li className="flex items-center gap-[10px]" key={e.text}>
							<e.icon size={18} className="md:block hidden" />
							{e.text}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default NavList;
