import {
	ArrowLeft,
	ArrowRight,
	MoveLeft,
	MoveRight,
	XIcon,
} from "lucide-react";
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
	setResetPwdPassedStep,
}: {
	setResetPwdPassedStep: (val: number) => void;
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
							labelTitle={""}
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

				setResetPwdPassedStep(1);
				form.handleSubmit();
			}}
		>
			<DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Button>
							<ArrowLeft />
						</Button>
						<DialogTitle className="flex">{m["login.email"]()}</DialogTitle>
					</div>
					<Button>
						<ArrowRight />
					</Button>
				</div>
				<DialogDescription>
					{m["login.forgotPasswordStep1desc"]()}
				</DialogDescription>
			</DialogHeader>

			<ForgotPwdEmailInput form={form} />
			<form.AppForm>
				<Button
					className="bg-primary text-primary-foreground hover:bg-primary/90 capitalize"
					type="submit"
				>
					{m["common.confirm"]()}
				</Button>
			</form.AppForm>
			{/* <FormActions appForm={form.AppForm} /> */}
		</form>
	);
}

function ForgotPwdStep2({
	setResetPwdPassedStep,
}: {
	setResetPwdPassedStep: (val: number) => void;
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

				setResetPwdPassedStep(2);
				form.handleSubmit();
			}}
		>
			<ForgotPwdOtpInput form={form} />
			<FormActions appForm={form.AppForm} />
		</form>
	);
}
function ForgotPwdStep3({
	setResetPwdPassedStep,
}: {
	setResetPwdPassedStep: (val: number) => void;
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

				setResetPwdPassedStep(MAX_STEPS);
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

const MAX_STEPS = 3;

export function ForgotPwd({
	className,
	dir,
}: React.HTMLAttributes<HTMLButtonElement> & {}) {
	const [currentStep, setCurrentStep] = useState(1);
	const [passedSteps, setPassedSteps] = useState(0);
	const currentLocale = getLocale();

	const handleOnOpenChange = (open: boolean) => {
		if (!open) setPassedSteps(0);
	};

	useEffect(() => {
		setCurrentStep(MAX_STEPS === passedSteps ? MAX_STEPS : passedSteps + 1);
	}, [passedSteps]);

	return (
		<Dialog onOpenChange={handleOnOpenChange}>
			<DialogTrigger className={className} dir={dir}>
				{m["login.forgotPassword"]()}
			</DialogTrigger>
			<DialogContent
				dir={currentLocale === "ar" ? "rtl" : "ltr"}
				className="w-[calc(100%-2rem)] bg-[url('/src/assets/images/forgot-pwd-bg.jpg')] bg-cover bg-no-repeat rounded-lg bg-center sm:max-w-175 sm:bg-[center_-175px] p-0"
				showCloseButton={false}
			>
				<div className="bg-[#080e14]/35 backdrop-blur-[2px] rounded-lg">
					<DialogClose className="absolute right-4 top-4 rounded-full bg-white p-2 text-muted-foreground hover:bg-muted hover:text-foreground shadow-md">
						<XIcon className="size-4 stroke-destructive" />
						<span className="sr-only">Close</span>
					</DialogClose>
					<div className="bg-background/80 w-[80%] sm:w-[70%] rounded-lg sm:p-6 px-3 py-6">
						{/* <DialogHeader className="flex-row">
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
								currentStep + 1 <= MAX_STEPS &&
									currentStep + 1 <= passedSteps + 1 &&
									setCurrentStep(currentStep + 1);
							}}
						>
							<MoveRight
								className="text-muted-foreground size-5 group-hover:text-primary rtl:scale-x-[-1]"
								strokeWidth={4}
							/>
						</Button>
					</DialogHeader> */}
						{/* <div>
							</div> */}
						<ForgotPwdStep1 setResetPwdPassedStep={setPassedSteps} />
						{/* {currentStep === 1 && (
						<ForgotPwdStep1 setResetPwdPassedStep={setPassedSteps} />
					)} */}
						{/* {currentStep === 2 && (
						<ForgotPwdStep2 setResetPwdPassedStep={setPassedSteps} />
					)}
					{currentStep === 3 && (
						<ForgotPwdStep3 setResetPwdPassedStep={setPassedSteps} />
					)} */}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
