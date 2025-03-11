import { useState, useRef, useEffect } from "react";
import { FetcherWithComponents, Link, useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { X } from "lucide-react";
import { WaitlistFormActionResponse } from "~/lib/types";
import { Card } from "~/components/ui/card";
import { btn, linkText } from "~/lib/styles";

type Props = {
	formRef: React.RefObject<HTMLFormElement>;
	handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	fetch: FetcherWithComponents<WaitlistFormActionResponse>;
	shouldClose: boolean;
};

export default function JoinWaitlist({
	formRef,
	handleSubmit,
	fetch,
	shouldClose,
}: Props) {
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		if (shouldClose) {
			setShow(false);
		}
	}, [shouldClose]);

	if (!show) {
		return (
			<Button
				size="lg"
				onClick={() => setShow(true)}
				className={`${btn}`}
			>
				Join waitlist
			</Button>
		);
	}

	return (
		<div className="w-[100%] h-[100%] bg-primary bg-opacity-[0.8] fixed top-0 left-0 flex items-center justify-center">
			<Card className="mx-auto w-[30rem] bg-primary p-8 text-left">
				<div className="flex w-full justify-between mb-8 items-center">
					<h3 className="text-white text-xl">Join our waitlist</h3>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => setShow(false)}
						className="h-8 w-8"
					>
						<X className="h-8 w-8" />
						<span className="sr-only">Close</span>
					</Button>
				</div>
				<p className="text-white mb-4">
					Be the first to know when we launch. Get early access to our
					product.
				</p>
				<fetch.Form ref={formRef} className="space-y-4">
					<div>
						<Label htmlFor="firstname">
							First name
							<span className="text-red-500 ms-2">*</span>
						</Label>
						<Input
							className="font-poppins text-gray-900"
							placeholder="Enter your first name"
							id="firstname"
							name="firstname"
							type="text"
						/>
						<p className="text-sm text-red-500">
							{fetch.data?.errors?.firstname}
						</p>
					</div>
					<div>
						<Label htmlFor="lastname">
							Last name
							<span className="text-red-500 ms-2">*</span>
						</Label>
						<Input
							placeholder="Enter your last name"
							name="lastname"
							id="lastname"
							type="text"
							className="font-poppins text-gray-900"
						/>
						<p className="text-sm text-red-500">
							{fetch.data?.errors?.lastname}
						</p>
					</div>
					<div>
						<Label htmlFor="email">
							Email
							<span className="text-red-500 ms-2">*</span>
						</Label>
						<Input
							placeholder="Enter your email"
							className="font-poppins text-gray-900"
							type="email"
							name="email"
							id="email"
						/>
						<p className="text-sm text-red-500">
							{fetch.data?.errors?.email}
						</p>
					</div>
					<p className="text-sm">
						Your privacy matters to us, and we will never share or
						sell your information. Read our{" "}
						<Link
							to={"/privacy-policy#communication-preferences"}
							target="_blank"
							className={`${linkText}`}
						>
							privacy policy
						</Link>{" "}
						for more information.
					</p>
					<Button
						type="submit"
						className={`${btn}`}
						onClick={(event) => {
							handleSubmit(event);
						}}
					>
						Join waitlist
					</Button>
				</fetch.Form>
			</Card>
		</div>
	);
}
