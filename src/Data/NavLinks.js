import { SlGameController } from "react-icons/sl";
import { BsDoorClosed } from "react-icons/bs";
import { FiBook } from "react-icons/fi";
import { MdOutlineCalendarViewMonth, MdOutlineFeedback } from "react-icons/md";

// icon array
const iconsList = [
	{
		text: "Learn",
		icon: FiBook,
		link: "/learn",
	},
	{
		text: "Play Game",
		icon: SlGameController,
		link: "/selectgame",
	},
	{
		text: "High Score",
		icon: MdOutlineCalendarViewMonth,
	},
	{
		text: "Give Feedback",
		icon: MdOutlineFeedback,
	},
	{
		text: "Quit",
		icon: BsDoorClosed,
		link: "/",
	},
];

export default iconsList;
