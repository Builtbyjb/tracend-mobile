import { BookText, ChartLine, Database } from "lucide-react";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

const features = [
	{
		title: "Full control of financial data",
		icon: Database,
		description: `No risk of losing access to critical data if you decide to 
    switch software providers or hire an in-house accounting team.`,
	},
	{
		title: "Automated bookkeeping",
		icon: BookText,
		description: `We monitor your business transactions and automatically 
    create journal entries, generate financial statements, process invoices, 
    and send you email reminders when accounts payable and accounts 
    receivable are due.`,
	},
	{
		title: "AI powered financial analysis",
		icon: ChartLine,
		description: `We use Artificial Intelligence (AI) to analyze your 
    financial data and provide actionable insights on how and where 
    improvements can be made to enhance your business health.`,
	},
];

export default function Features() {
	return (
		<div>
			<h2 className="text-2xl font-medium mb-8">More on what we offer</h2>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				{features.map((feature, index) => (
					<Card key={index} className="p-4">
						<CardHeader>
							<feature.icon className="w-8 h-8 mb-4 me-4" />
							<h3 className="text-xl font-medium mb-2">
								{feature.title}
							</h3>
						</CardHeader>
						<CardDescription>{feature.description}</CardDescription>
					</Card>
				))}
			</div>
		</div>
	);
}
