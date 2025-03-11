import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

export default function SupportResources() {
	return (
		<>
			<h2 className="text-2xl font-medium mb-8">Resources</h2>
			<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
				<Link to="" className="group">
					<Card className="p-4 h-full">
						<CardHeader className="font-medium text-xl mb-4">
							Getting Started Guide
						</CardHeader>
						<CardDescription className="mb-4">
							Learn the basics and set up your account
						</CardDescription>
						<div className="flex items-center">
							<span>Read guide</span>
							<ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</div>
					</Card>
				</Link>
				<Link to="/resources/tutorials" className="group">
					<Card className="p-4 h-full">
						<CardHeader className="font-medium mb-4 text-xl">
							Video Tutorials
						</CardHeader>
						<CardDescription className="mb-4">
							Watch step-by-step tutorials on using our features
						</CardDescription>
						<div className="flex items-center">
							<span>Watch videos</span>
							<ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</div>
					</Card>
				</Link>
				<Link to="/resources/api" className="group">
					<div className="bg-background p-6 rounded-lg border hover:border-primary transition-colors">
						<h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
							API Documentation
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Integrate AI Accountant with your existing systems
						</p>
						<div className="flex items-center text-sm text-primary">
							<span>View docs</span>
							<ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</div>
					</div>
				</Link>
			</div>
		</>
	);
}
