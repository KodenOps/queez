import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App";
import SelectGame from "./Pages/SelectGame";
import SelectLevel from "./Pages/SelectLevel";
import PlayEasy from "./Pages/PlayEasy";
import PlayTeen from "./Pages/PlayTeen";
import PlayBoss from "./Pages/PlayBoss";
import PlayRandom from "./Pages/PlayRandom";
import PlayMusic from "./Pages/PlayMusic";
import Learn from "./Pages/Learn";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
const router = createBrowserRouter([
	{
		path: "/",
		element: <SelectGame />,
	},
	{
		path: "/selectgame",
		element: <SelectLevel />,
	},
	{
		path: "/playeasy",
		element: <PlayEasy />,
	},
	{
		path: "/playteen",
		element: <PlayTeen />,
	},
	{
		path: "/playboss",
		element: <PlayBoss />,
	},
	{
		path: "/PlayRandom",
		element: <PlayRandom />,
	},
	{
		path: "/music",
		element: <PlayMusic />,
	},
	{
		path: "/learn",
		element: <Learn />,
	},
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<SpeedInsights />
		<Analytics />
		<RouterProvider router={router} />
	</React.StrictMode>
);
