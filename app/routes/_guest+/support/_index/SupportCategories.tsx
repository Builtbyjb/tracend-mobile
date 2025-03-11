import { Link } from "@remix-run/react";
import {
	FileSpreadsheet,
	Receipt,
	CreditCard,
	Settings,
	ChartLine,
	BookText,
} from "lucide-react";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

const categories = [
	{
		title: "Bookkeeping",
		description: "Learn how we handle your bookkeeping tasks",
		icon: BookText,
		href: "/support/bookkeeping",
	},
	{
		title: "Financial Reports",
		description: "Generate and understand your financial reports",
		icon: FileSpreadsheet,
		href: "/support/financial-reports",
	},
	{
		title: "Analytics & Insights",
		description: "Get AI-powered insights about your finances",
		icon: ChartLine,
		href: "/support/analytics-insights",
	},
	// {
	// 	title: "Expense Tracking",
	// 	description: "Track and categorize your business expenses",
	// 	icon: Receipt,
	// 	href: "/support/expense-tracking",
	// },
	// {
	// 	title: "Billing & Payments",
	// 	description: "Manage invoices and process payments",
	// 	icon: CreditCard,
	// 	href: "/support/billing-payments",
	// },
	// {
	// 	title: "Account Settings",
	// 	description: "Manage your account and preferences",
	// 	icon: Settings,
	// 	href: "/support/account-settings",
	// },
];

export default function SupportCategories() {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{categories.map((category, index) => (
				<Link key={index} to={category.href} className="group">
					<Card className="h-full py-4 px-4">
						<CardHeader className="mb-4">
							<category.icon className="h-8 w-8 mr-2" />
							<h3 className="font-medium text-xl">
								{category.title}
							</h3>
						</CardHeader>
						<CardDescription>
							<p>{category.description}</p>
						</CardDescription>
					</Card>
				</Link>
			))}
		</div>
	);
}
