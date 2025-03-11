import { HandCoins, Lightbulb, MousePointerClick, Timer } from "lucide-react";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

const benefits = [
	{
		title: "Cost savings",
		icon: HandCoins,
		description: `We lower labor costs by reducing the need for manual 
    bookkeeping and by preventing costly mistakes that could lead to penalties 
    or financial losses.`,
	},
	{
		title: "Time efficiency",
		icon: Timer,
		description: `We reduce the time spent on financial management by 
    eliminating manual tasks, streamlining processes, and improving efficiency.`,
	},
	{
		title: "Real time financial insights",
		icon: Lightbulb,
		description: `Access to up-to-date financial information allows you to make 
    quick, informed decisions. It helps identify trends, adjust pricing 
    strategies, and manage cash flow effectively.`,
	},
	{
		title: "Easy to use",
		icon: MousePointerClick,
		description: `We use Google Workspace apps to seamlessly integrate with 
    your workflow. Our software delivers critical updates, lets you request 
    information, and provides detailed business analysis through a simple 
    chat interface—helping you fully understand your business without the 
    need to hire experts or learn new software.`,
	},
];

export default function Benefits() {
	return (
		<div>
			<h2 className="text-2xl mb-8 font-medium">
				Why you will love ThinkLedger
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				{benefits.map((benefit, index) => (
					<Card key={index} className="p-4">
						<CardHeader>
							<benefit.icon className="w-8 h-8 mb-4 me-4" />
							<h3 className="text-xl font-medium mb-2">
								{benefit.title}
							</h3>
						</CardHeader>
						<CardDescription>{benefit.description}</CardDescription>
					</Card>
				))}
			</div>
		</div>
	);
}
