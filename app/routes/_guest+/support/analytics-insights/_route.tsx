import { Link } from "@remix-run/react";
import { ArrowLeft, ChartLine } from "lucide-react";
import { CardHeader } from "~/components/ui/card";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "ThinkLedger | Support - Analytics Insights" },
		{
			name: "description",
			content: `Get AI-powered insights about your finances`,
		},
	];
};

export default function AnalyticsInsights() {
	return (
		<>
			<Link to={"/support"}>
				<ArrowLeft className="mb-8 h-12 w-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-120" />
			</Link>
			<CardHeader className="mb-4">
				<ChartLine className="w-8 h-8 mr-2" />
				<h3>Analytics Insights</h3>
			</CardHeader>
			<p className="leading-[1.5]">
				Access financial analytics and insights directly through Google
				Chat. This user-friendly interface lets you interact with your
				data and our services seamlessly. You can request regular
				updates on your business's financial health, compare performance
				across different accounting periods, and much more.
			</p>
		</>
	);
}
