import { Link } from "@remix-run/react";
import { ArrowLeft, BookText } from "lucide-react";
import { CardHeader } from "~/components/ui/card";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "ThinkLedger | Support - Bookkeeping" },
		{
			name: "description",
			content: `Learn how we handle your bookkeeping tasks`,
		},
	];
};

export default function Bookkeeping() {
	return (
		<>
			<Link to={"/support"}>
				<ArrowLeft className="mb-8 h-12 w-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-120" />
			</Link>
			<CardHeader className="mb-4">
				<BookText className="h-8 w-8 mr-2" />
				<h3 className="font-medium text-xl">Bookkeeping</h3>
			</CardHeader>
			<p className="leading-[1.5]">
				Our software automatically retrieves your business transaction
				data from your connected banking services. Using generative AI,
				we convert this data into journal entries in your Google Sheets.
				For business users, the entries follow a double-entry format
				that clearly shows the accounts being credited and debited. The
				Google Sheets file is then stored in a folder we automatically
				generate in the Google Drive account linked to the email address
				you used to create your account.
			</p>
		</>
	);
}
