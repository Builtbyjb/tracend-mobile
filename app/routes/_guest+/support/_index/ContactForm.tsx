import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Form, Link } from "@remix-run/react";
import { Switch } from "~/components/ui/switch";
import { btn, linkText } from "~/lib/styles";

type Props = {
	formRef: React.RefObject<HTMLFormElement>;
	handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	zodErrors: any;
};

export default function ContactForm({
	zodErrors,
	formRef,
	handleSubmit,
}: Props) {
	const [toggleSwitch, setToggleSwitch] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>(undefined);

	const handleToggleSwitch = () => {
		setToggleSwitch(!toggleSwitch);
	};

	useEffect(() => {
		if (zodErrors) {
			setErrors(zodErrors);
		}
	}, [zodErrors]);

	return (
		<Form ref={formRef} className="space-y-4">
			<div>
				<Label htmlFor="name">
					Name
					<span className="text-red-500 ms-2">*</span>
				</Label>
				<Input
					id="name"
					name="name"
					type="text"
					placeholder="Your name"
					className="text-gray-900 bg-gray-200 focus:border-2 focus:border-accent"
				/>
				<p className="text-sm text-red-500">{errors?.name}</p>
			</div>
			<div>
				<Label htmlFor="email">
					Email
					<span className="text-red-500 ms-2">*</span>
				</Label>
				<Input
					name="email"
					id="email"
					type="email"
					placeholder="Your email address"
					className="text-gray-900 bg-gray-200 focus:border-2 focus:border-accent"
				/>
				<p className="text-sm text-red-500">{errors?.email}</p>
			</div>
			<div>
				<Label htmlFor="subject">
					Subject
					<span className="text-red-500 ms-2">*</span>
				</Label>
				<Input
					id="subject"
					name="subject"
					type="text"
					placeholder="Brief description of your issue or question"
					className="text-gray-900 bg-gray-200 focus:border-2 focus:border-accent"
				/>
				<p className="text-sm text-red-500">{errors?.subject}</p>
			</div>
			<div>
				<Label htmlFor="description">
					Description
					<span className="text-red-500 ms-2">*</span>
				</Label>
				<Textarea
					name="description"
					id="description"
					placeholder="Please provide a detailed description your issue or question"
					className="min-h-[120px] text-gray-900 bg-gray-200 focus:border-2 focus:border-accent"
				/>
				<p className="text-sm text-red-500">{errors?.description}</p>
			</div>
			<div className="flex items-center">
				<Switch
					id="privacyPolicy"
					name="privacyPolicy"
					checked={toggleSwitch}
					onCheckedChange={() => {
						handleToggleSwitch();
					}}
					className="mr-4"
				/>
				<p className="text-sm">
					By clicking this you agree to our{" "}
					<Link to="/privacy-policy" className={`${linkText}`}>
						privacy policy
					</Link>
					.
				</p>
			</div>
			<p className="text-sm text-red-500">{errors?.privacyPolicy}</p>
			<Button
				type="submit"
				className={`${btn}`}
				onClick={(event) => {
					handleSubmit(event);
				}}
			>
				Send Message
			</Button>
		</Form>
	);
}
