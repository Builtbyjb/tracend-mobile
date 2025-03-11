import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Link, Navigate, useLocation } from "@remix-run/react";

type CookieConsent = {
	//   necessary: boolean;
	//   functional: boolean;
	analytics: boolean;
	//   marketing: boolean;
};

const cookies = [
	//   {
	//     id: "necessary",
	//     title: "Strictly Necessary Cookies",
	//     description: `These cookies are essential for the website to
	//     function properly and cannot be switched off.`,
	//     // required: true,
	//   },
	//   {
	//     id: "functional",
	//     title: "Functional Cookies",
	//     description: `These cookies enable the website to provide
	//     enhanced functionality and personalization.`,
	//   },
	{
		id: "analytics",
		title: "Analytics Cookies",
		description: `These cookies help us understand how visitors 
		interact with the website, helping us improve our services.`,
		info: `We use Google Analytics to better understand how visitors 
		interact with our website. These cookies help us collect anonymous
	 	data about website traffic, user behavior, and engagement. 
	 	This information allows us to: 
		Analyze website performance and identify areas for improvement
		Understand which pages and content are most popular
		Optimize user experience based on visitor interactions
		Measure the effectiveness of our marketing efforts
		Google Analytics cookies do not collect personal data like your name, email, or payment information. The data is aggregated and used only to enhance our website and services.`,
	},
	//   {
	//     id: "marketing",
	//     title: "Marketing Cookies",
	//     description: `These cookies are used to track visitors across
	//     websites to display relevant advertisements.`,
	//   },
];

// const domain = "localhost";
const domain = ".thinkledger.app";

export default function CookieConsentBanner() {
	const [isVisible, setIsVisible] = useState(false);
	const [activeTab, setActiveTab] = useState("simple");
	const [consent, setConsent] = useState<CookieConsent>({
		// necessary: true, // Always required
		// functional: false,
		analytics: false,
		// marketing: false,
	});

	const location = useLocation();
	const cookieHash = location.hash.slice(1);

	const handleOpenPreferences = () => {
		setIsVisible(true);
		setActiveTab("advanced");
	};

	// Opens the cookie consent when the url path includes in the hash "#cookie-preferences"
	useEffect(() => {
		if (cookieHash === "cookie-preferences") {
			handleOpenPreferences();
		}
	}, [cookieHash]);

	const saveConsent = (consentData: CookieConsent) => {
		const consentWithTimestamp = {
			preferences: consentData,
			timestamp: new Date().toISOString(),
		};
		localStorage.setItem(
			"cookieConsent",
			JSON.stringify(consentWithTimestamp)
		);
		setConsent(consentData);
		setIsVisible(false);

		// Removes google analytics cookies
		if (!consentData.analytics) {
			document.cookie = `_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${domain}`;
			document.cookie = `_ga_ZHYE58GHZM=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${domain}`;
		}

		const analyticsCookieAccess = consentData.analytics
			? "granted"
			: "denied";

		window.gtag("consent", "update", {
			analytics_storage: analyticsCookieAccess,
		});

		// console.log("Consent saved:", consentWithTimestamp);
	};

	useEffect(() => {
		// Check if user has already made a choice
		const savedConsent = localStorage.getItem("cookieConsent");

		if (!savedConsent) {
			// Show banner if no consent has been saved
			setIsVisible(true);
		} else {
			// Load saved preferences
			setConsent(JSON.parse(savedConsent).preferences);
		}
	}, []);

	const handleAcceptAll = () => {
		const newConsent = {
			//   necessary: true,
			//   functional: true,
			analytics: true,
			//   marketing: true,
		};
		saveConsent(newConsent);
		window.location.replace(location.pathname);
	};

	const handleRejectAll = () => {
		const newConsent = {
			//   necessary: true,
			//   functional: false,
			analytics: false,
			//   marketing: false,
		};
		saveConsent(newConsent);
		window.location.replace(location.pathname);
	};

	const handleSavePreferences = () => {
		saveConsent(consent);

		// Remove location hash
		window.location.replace(location.pathname);
	};

	const handleToggleConsent = (type: keyof CookieConsent) => {
		// if (type === "necessary") return; // Cannot toggle necessary cookies

		setConsent((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	if (!isVisible) return;

	return (
		<div className="w-[100%] h-[100%] fixed top-0 left-0 z-20 bg-primary bg-opacity-[0.8]">
			<div className="fixed bottom-0 left-0 right-0 p-4 md:p-6">
				<Card className="p-4 bg-primary">
					<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
						<div>
							<CardTitle className="text-xl">
								Cookie Preferences
							</CardTitle>
							<CardDescription className="mt-1">
								Manage your cookie settings for this site
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								setIsVisible(false);
								window.location.replace(location.pathname);
							}}
							className="h-8 w-8"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</Button>
					</CardHeader>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						{/* <div className="px-6">
							<TabsList className="grid w-full grid-cols-2 bg-[#262626]">
			  				<TabsTrigger value="simple">Simple</TabsTrigger>
			 				<TabsTrigger value="advanced">Advanced</TabsTrigger>
							</TabsList>
		  				</div> */}
						<TabsContent value="simple" className="space-y-4">
							<CardContent className="pt-4">
								<p>
									We use cookies to analyze how visitors
									interact with our website, allowing us to
									enhance your experience and improve our
									services.
								</p>
							</CardContent>
							<CardFooter className="flex flex-col sm:flex-row gap-2">
								<Button
									variant="outline"
									onClick={handleRejectAll}
									className="w-full sm:w-auto hover:bg-blue-900"
								>
									Reject
								</Button>
								<Button
									variant="outline"
									onClick={() => setActiveTab("advanced")}
									className="w-full sm:w-auto hover:bg-blue-900"
								>
									Customize
								</Button>
								<Button
									onClick={handleAcceptAll}
									className="w-full sm:w-auto bg-accent hover:bg-blue-900"
								>
									Accept
								</Button>
							</CardFooter>
						</TabsContent>

						<TabsContent value="advanced">
							<CardContent className="space-y-4 pt-4">
								<div className="space-y-4">
									{cookies.map((cookie) => (
										<div
											key={cookie.id}
											className="flex items-center justify-between space-x-2"
										>
											<Label
												htmlFor={cookie.id}
												className="flex flex-col space-y-1"
											>
												<span className="mb-2">
													{cookie.title}
												</span>
												<p className="leading-[1.5]">
													{cookie.description}
												</p>
											</Label>
											<div className="flex items-center space-x-2">
												<Switch
													id={cookie.id}
													checked={
														consent[
															cookie.id as keyof CookieConsent
														]
													}
													onCheckedChange={() =>
														handleToggleConsent(
															cookie.id as keyof CookieConsent
														)
													}
													// disabled={cookie.required}
												/>
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8"
														>
															<Info className="h-4 w-4" />
															<span className="sr-only">
																More info
															</span>
														</Button>
													</DialogTrigger>
													<DialogContent className="bg-primary">
														<DialogHeader>
															<DialogTitle>
																{cookie.title}
															</DialogTitle>
															<DialogDescription className="leading-[1.5]">
																{cookie.info}
															</DialogDescription>
														</DialogHeader>
													</DialogContent>
												</Dialog>
											</div>
										</div>
									))}
								</div>
							</CardContent>
							<CardFooter className="flex flex-col sm:flex-row gap-2">
								<Button
									variant="outline"
									onClick={() => setActiveTab("simple")}
									className="w-full sm:w-auto hover:bg-blue-900"
								>
									Back
								</Button>
								<Button
									onClick={handleSavePreferences}
									className="w-full sm:w-auto bg-accent hover:bg-blue-900"
								>
									Save Preferences
								</Button>
							</CardFooter>
						</TabsContent>
					</Tabs>
				</Card>
			</div>
		</div>
	);
}
