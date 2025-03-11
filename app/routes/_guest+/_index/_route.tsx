import type { MetaFunction } from "@remix-run/node";
import Features from "./Features";
import Benefits from "./Benefits";
import Cta from "./Cta";
import { useFetcher } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { validateData, getEnv, validateENV } from "~/lib/utils";
import * as z from "zod";
import { AxiosError } from "axios";
import api from "~/lib/api";
import type { ActionFunctionArgs } from "@remix-run/node";
import { WaitlistFormActionResponse } from "~/lib/types";
// import Testimonials from "./Testimonials";
// import Pricing from "~/components/Pricing";

export const meta: MetaFunction = () => {
	return [
		{ title: "ThinkLedger" },
		{
			name: "description",
			content: `Welcome to ThinkLedger. We help business owners like you 
      		to effortlessly track your business’s financial health with automated, 
      		accurate bookkeeping and AI-driven financial analysis while keeping 
      		you in full control of your financial data.`,
		},
	];
};

const env = getEnv();

const envVars: any = {
	sendGridAPIKey: env.SENDGRID_API_KEY,
	sendGridURL: env.SENDGRID_URL,
	sendGridListID: env.SENDGRID_LIST_ID,
};

const formSchema = z.object({
	firstname: z.string().min(2, {
		message: "First name must be at least 2 characters long.",
	}),
	lastname: z.string().min(2, {
		message: "Last name must be at least 2 characters long.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

const envSchema = z.object({
	sendGridURL: z.string().url(),
	sendGridListID: z.string().nonempty(),
	sendGridAPIKey: z.string().nonempty(),
});

type ActionInput = z.TypeOf<typeof formSchema>;

export async function action({
	request,
}: ActionFunctionArgs): Promise<WaitlistFormActionResponse | undefined> {
	const formData = await request.formData();

	const { errors } = await validateData<ActionInput>({
		formData,
		formSchema,
	});

	if (errors !== null) {
		return Response.json({ errors: errors });
	}

	const { isValidEnv, error } = validateENV(envSchema, envVars);

	if (isValidEnv) {
		const data = {
			list_ids: [envVars.sendGridListID],
			contacts: [
				{
					first_name: formData.get("firstname"),
					last_name: formData.get("lastname"),
					email: formData.get("email"),
				},
			],
		};

		// console.log(data);
		// return Response.json({ success: true });

		try {
			const response = await api.put(envVars.sendGridURL, data, {
				headers: {
					Authorization: `Bearer ${envVars.sendGridAPIKey}`,
					"Content-Type": `application/json`,
				},
			});
			console.log(response.data);
			if (response.status === 202) {
				return Response.json({ success: true });
			} else {
				return Response.json({ success: false });
			}
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.response?.data);
			return Response.json({ success: false });
		}
	} else {
		console.log(error);
		return Response.json({ success: false });
	}
}

export default function IndexPage() {
	const fetcher = useFetcher<WaitlistFormActionResponse>();
	const formRef = useRef<HTMLFormElement>(null);
	const [shouldClose, setShouldClose] = useState<boolean>(false);

	useEffect(() => {
		if (fetcher.data) {
			if (fetcher.data.success === true) {
				alert(
					"You've been added to the waitlist! A welcome email has been sent to you. If you don't see it in your inbox, please check your spam folder. Thank you!"
				);
				setShouldClose(true);
			} else if (fetcher.data.success === false) {
				alert(
					"Something went wrong while adding you to the waitlist. Please try again."
				);
			}
		}
	}, [fetcher.data]);

	const waitlistHandleSubmit = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		if (formRef.current) {
			const formData = new FormData(formRef.current);
			fetcher.submit(formData, { method: "PUT" });
		}
	};
	return (
		<main className="space-y-20">
			{/* Hero Section */}
			<section>
				<div className="z-20">
					<h1 className="text-5xl md:text-5xl lg:text-5xl font-medium mb-4 leading-[1.2]">
						Keep track of your business's financial health.
					</h1>
					<p className="text-white mb-8 2xl:w-[70%] xl:w-[70%] l:w-[75%] md:w-[80%] sm:w-[100%] w-[100%]">
						We help business owners like you to effortlessly track
						your business’s financial health with automated,
						accurate bookkeeping and AI-driven financial analysis
						while keeping you in full control of your financial
						data.
					</p>

					<p className="text-white mb-4">
						Join the waitlist to get early access
					</p>
					<Cta
						formRef={formRef}
						handleSubmit={waitlistHandleSubmit}
						fetch={fetcher}
						shouldClose={shouldClose}
					/>
				</div>
			</section>

			{/* Features Section */}
			<section id="features">
				<Features />
			</section>

			{/* Benefits section */}
			<section id="benefits">
				<Benefits />
			</section>

			{/* Pricing Section */}
			{/* <section id="pricing" className="">
          <Pricing />
        </section> */}

			{/* Testimonials Section */}
			{/* <section id="testimonials" className="">
          <Testimonials />
        </section> */}

			{/* CTA Section */}
			<section id="cta">
				<h2 className="text-3xl font-medium mb-4">
					Running a healthy business has never been easier.
				</h2>
				<p className="mb-4">
					Join the waitlist to get early access today!.
				</p>
				<Cta
					formRef={formRef}
					handleSubmit={waitlistHandleSubmit}
					fetch={fetcher}
					shouldClose={shouldClose}
				/>
			</section>
		</main>
	);
}
