import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import SupportCategories from "./SupportCategories";
import FAQ from "./FAQ";
import ContactForm from "./ContactForm";
import { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { validateData, validateENV, getEnv } from "~/lib/utils";
import emailjs from "@emailjs/browser";
// import SupportResources from "./SupportResources";

export const meta: MetaFunction = () => {
	return [
		{ title: "ThinkLedger | Support" },
		{
			name: "description",
			content: `Find answers to your questions about our software
            and services`,
		},
	];
};

const env = getEnv();

const envVars: any = {
	emailJSPublicKey: env.EMAILJS_PUBLIC_KEY,
	emailJSServiceId: env.EMAILJS_SERVICE_ID,
	emailJSTemplateId: env.EMAILJS_TEMPLATE_ID,
};

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be more than 2 characters",
	}),
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	subject: z.string().min(5, {
		message: "Subject must be more than 5 characters",
	}),
	description: z.string().min(10, {
		message: "Description must be more than 10 characters",
	}),
	privacyPolicy: z.string().refine((value) => value === "on", {
		message:
			"Before sending an email, please review and agree to our privacy policy.",
	}),
});

const envSchema = z.object({
	emailJSPublicKey: z.string().nonempty({
		message: "Could not load emailjs public key",
	}),
	emailJSServiceId: z.string().nonempty({
		message: "Could not load emailjs service id",
	}),
	emailJSTemplateId: z.string().nonempty({
		message: "Could not load emailjs template id",
	}),
});

type ActionInput = z.TypeOf<typeof formSchema>;

export default function Support() {
	const formRef = useRef<HTMLFormElement>(null);
	const [zodErrors, setZodErrors] = useState<any>(undefined);

	useEffect(() => {
		emailjs.init(envVars.emailJSPublicKey);
	}, []);

	const ContactFormHandleSubmit = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		if (formRef.current) {
			const formData = new FormData(formRef.current);

			const { errors } = await validateData<ActionInput>({
				formData,
				formSchema,
			});

			if (errors !== null) {
				// TODO: fix privacy policy zod error
				// console.log(errors);
				setZodErrors(errors);
				return;
			}

			const { isValidEnv, error } = validateENV(envSchema, envVars);
			if (isValidEnv) {
				try {
					const response = await emailjs.send(
						envVars.emailJSServiceId,
						envVars.emailJSTemplateId,
						Object.fromEntries(formData)
					);
					if (response.status === 200) {
						alert(
							"Your email has been sent, we will get back to shortly"
						);
						formRef.current?.reset();
					} else {
						alert(
							"An error occurred while sending your email, Please try again"
						);
					}
				} catch (error) {
					console.log(error);
				}
				console.log("success");
			} else {
				console.log(error);
			}
		}
	};
	return (
		<main className="space-y-16">
			<section>
				<h1 className="text-3xl font-bold mb-4">
					How can we help you?
				</h1>
				<p className="mb-8">
					Find answers to your questions about our software and
					services
				</p>
			</section>

			{/* Support Categories */}
			<section id="support-categories">
				<h2 className="text-2xl font-medium mb-8">
					Support Categories
				</h2>
				<SupportCategories />
			</section>

			{/* FAQ Section */}
			<section id="FAQ">
				<h2 className="text-2xl font-semibold mb-8">
					Frequently Asked Questions
				</h2>
				<FAQ />
			</section>

			{/* Contact Section */}
			<section id="contact">
				<h2 className="text-2xl font-medium mb-8">Contact Us</h2>
				<p className="mb-6">
					Our support team is available to assist you with any
					questions or issues you may have.
				</p>
				<ContactForm
					zodErrors={zodErrors}
					formRef={formRef}
					handleSubmit={ContactFormHandleSubmit}
				/>
			</section>

			{/* Resources Section */}
			{/* <section id="resources">
				<SupportResources />
			</section> */}
		</main>
	);
}
