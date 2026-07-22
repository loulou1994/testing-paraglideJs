import { MoveLeft, MoveRight } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { useAppForm, withForm } from "#/contexts/custom-form-hook-ctx";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	forgotPwdStep1Schema,
	forgotPwdStep2Schema,
	forgotPwdStep3Schema,
} from "../-validations/forgot-pwd";

function ForgotPwdStep1({
	setResetPwdStep,
}: {
	setResetPwdStep: (callback: (val: number) => number) => void;
}) {
	const form = useAppForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onChange: forgotPwdStep1Schema,
		},

		// onSubmit: async () => {
		// 	console.log("Form submitted successfully");
		// },
	});

	const ForgotPwdEmailInput = withForm({
		defaultValues: {
			email: "",
		},
		render: function Render({ form }) {
			return (
				<form.AppField
					name="email"
					children={(field) => (
						<field.FormTextField
							labelTitle={m["login.email"]()}
							placeholder={m["login.emailPlaceholder"]}
						/>
					)}
				/>
			);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();

				setResetPwdStep((prevVal) => prevVal + 1);
				form.handleSubmit();
			}}
		>
			<ForgotPwdEmailInput form={form} />
			<FormActions appForm={form.AppForm} />
		</form>
	);
}

function ForgotPwdStep2({
	setResetPwdStep,
}: {
	setResetPwdStep: (callback: (val: number) => number) => void;
}) {
	const form = useAppForm({
		defaultValues: {
			otpInput: "",
		},
		validators: {
			onChange: forgotPwdStep2Schema,
		},

		// onSubmit: async () => {
		// 	console.log("Form submitted successfully");
		// },
	});

	const ForgotPwdOtpInput = withForm({
		defaultValues: {
			otpInput: "",
		},
		render: function Render({ form }) {
			return (
				<form.AppField
					name="otpInput"
					children={(field) => <field.FormOTPField />}
				/>
			);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();

				setResetPwdStep((prevVal) => prevVal + 1);
				form.handleSubmit();
			}}
		>
			<ForgotPwdOtpInput form={form} />
			<FormActions appForm={form.AppForm} />
		</form>
	);
}
function ForgotPwdStep3({
	setResetPwdStep,
}: {
	setResetPwdStep: (callback: (val: number) => number) => void;
}) {
	const form = useAppForm({
		defaultValues: {
			resetPwd: "",
		},
		validators: {
			onChange: forgotPwdStep3Schema,
		},

		// onSubmit: async () => {
		// 	console.log("Form submitted successfully");
		// },
	});

	const ForgotPwdOtpInput = withForm({
		defaultValues: {
			resetPwd: "",
		},
		render: function Render({ form }) {
			return (
				<form.AppField
					name="resetPwd"
					children={(field) => (
						<field.FormTextField
							labelTitle={m["login.password"]()}
							placeholder={m["login.passwordPlaceholder"]}
							type="password"
						/>
					)}
				/>
			);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();

				setResetPwdStep((prevVal) => prevVal + 1);
				form.handleSubmit();
			}}
		>
			<ForgotPwdOtpInput form={form} />
			<FormActions appForm={form.AppForm} />
		</form>
	);
}

function FormActions({
	appForm: AppForm,
}: {
	appForm: React.ComponentType<{
		children?: React.ReactNode | undefined;
	}>;
}) {
	return (
		<div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
			<DialogClose asChild>
				<Button variant="outline" className="capitalize">
					{m["common.cancel"]()}
				</Button>
			</DialogClose>
			<AppForm>
				<Button
					className="bg-primary text-primary-foreground hover:bg-primary/90 capitalize"
					type="submit"
				>
					{m["common.confirm"]()}
				</Button>
			</AppForm>
		</div>
	);
}

export function ForgotPwd({
	className,
	dir,
}: React.HTMLAttributes<HTMLButtonElement> & {}) {
	const [currentStep, setCurrentStep] = useState(1);
	const [passedSteps, setPassedSteps] = useState(0);
	const currentLocale = getLocale();

	useEffect(() => {
		passedSteps < currentStep && setPassedSteps(currentStep - 1);
	}, [currentStep, passedSteps]);

	console.log(`current step: ${currentStep}\ntotalPasses: ${passedSteps}`);

	return (
		<Dialog>
			<DialogTrigger className={className} dir={dir}>
				{m["login.forgotPassword"]()}
			</DialogTrigger>
			<DialogContent
				dir={currentLocale === "ar" ? "rtl" : "ltr"}
				className="gap-y-8"
			>
				<DialogHeader className="flex-row">
					<Button
						className="bg-transparent group p-0 h-auto"
						variant={"link"}
						size={"icon-xs"}
						onClick={() => {
							currentStep - 1 > 0 && setCurrentStep(currentStep - 1);
						}}
					>
						<MoveLeft
							className="text-muted-foreground size-5 group-hover:text-primary rtl:scale-x-[-1]"
							strokeWidth={4}
						/>
					</Button>
					<Button
						className="bg-transparent group p-0 h-auto"
						variant={"link"}
						size={"icon-xs"}
						onClick={() => {
							currentStep + 1 <= passedSteps && setCurrentStep(currentStep + 1);

							// console.log(`the next step will be ${currentStep + 1}`);
						}}
					>
						<MoveRight
							className="text-muted-foreground size-5 group-hover:text-primary rtl:scale-x-[-1]"
							strokeWidth={4}
						/>
					</Button>
				</DialogHeader>
				<div>
					{currentStep === 1 && (
						<ForgotPwdStep1 setResetPwdStep={setCurrentStep} />
					)}
					{currentStep === 2 && (
						<ForgotPwdStep2 setResetPwdStep={setCurrentStep} />
					)}
					{currentStep === 3 && (
						<ForgotPwdStep3 setResetPwdStep={setCurrentStep} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
