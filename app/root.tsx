import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import CookieConsentBanner from "./components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
	},
	{
		rel: "apple-touch-icon",
		sizes: "180x180",
		href: "/apple-touch-icon.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "/favicon-32x32.png",
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "/favicon-16x16.png",
	},
	{
		rel: "manifest",
		href: "/site.webmanifest",
	},
];

export async function loader() {
	return Response.json({
		ENV: {
			SERVER_URL: process.env.SERVER_URL,
			SENDGRID_URL: process.env.SENDGRID_URL,
			SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
			SENDGRID_LIST_ID: process.env.SENDGRID_LIST_ID,
			EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
			EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
			EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
		},
	});
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
				<GoogleAnalytics />
			</head>
			<body className="bg-primary">
				<Outlet />
				<CookieConsentBanner />
				{/* Send env variables to the server */}
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
