import { Link } from "@remix-run/react";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { CardHeader } from "~/components/ui/card";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "ThinkLedger | Support - Financial Reports" },
		{
			name: "description",
			content: `Generate and understand your financial reports`,
		},
	];
};

export default function FinancialReports() {
	return (
		<>
			<Link to={"/support"}>
				<ArrowLeft className="mb-8 h-12 w-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-120" />
			</Link>
			<CardHeader className="mb-4">
				<FileSpreadsheet className="h-8 w-8 mr-2" />
				<h3 className="font-medium text-xl">Financial Reports</h3>
			</CardHeader>
			<div className="space-y-4">
				<p className="leading-[1.5]">
					Our software automatically generates the following financial
					statements for business users:
				</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>Income statements (profit and loss statements).</li>
					<li>Owner's equity statements.</li>
					<li>Balance Sheets.</li>
					<li>Cashflow statements</li>
				</ul>
				<p>
					These financial statements are updated automatically as new
					transactions are recorded.
				</p>
			</div>
		</>
	);
}
