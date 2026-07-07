import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "#/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { addCarFormOpts, useAppForm } from "#/contexts/add-car-form-ctx";
import { m } from "#/paraglide/messages";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { addCarFormSchema } from "../-validations/add-car";
import { AddCarBasicForm } from "./add-car-basic";

export function AddCar({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (val: boolean) => void;
}) {
	const form = useAppForm({
		...addCarFormOpts,
		validators: {
			onChange: addCarFormSchema,
		},
		onSubmit: async () => {
			toast.success("Form submitted successfully");
		},
	});
	const matches = useMediaQuery("(min-width: 768px)");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{m["fleet.addNew"]()}</DialogTitle>
				</DialogHeader>
				<Tabs
					defaultValue="basic"
					className="w-full"
					orientation={matches ? "horizontal" : "vertical"}
				>
					<TabsList className="flex-col sm:flex-row gap-y-1 w-full">
						<TabsTrigger value="basic" className="capitalize">
							{m["fleet.addCarForm.basic"]()}
						</TabsTrigger>
						<TabsTrigger value="images" className="capitalize">
							{m["fleet.addCarForm.images"]()}
						</TabsTrigger>
						<TabsTrigger value="services" className="capitalize">
							{m["fleet.addCarForm.services"]()}
						</TabsTrigger>
						<TabsTrigger value="pricing" className="capitalize">
							{m["fleet.addCarForm.pricing"]()}
						</TabsTrigger>
						<TabsTrigger value="rental" className="capitalize">
							{m["fleet.addCarForm.rentalRules"]()}
						</TabsTrigger>
						<TabsTrigger value="extras" className="capitalize">
							{m["fleet.addCarForm.extras"]()}
						</TabsTrigger>
						<TabsTrigger value="availability" className="capitalize">
							{m["fleet.addCarForm.availability"]()}
						</TabsTrigger>
					</TabsList>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							console.log("triggered!!!");
							form.handleSubmit();
						}}
					>
						<AddCarBasicForm form={form} />
						<DialogFooter className="mt-4">
							<DialogClose asChild>
								<Button variant="outline" className="capitalize">
									{m["common.cancel"]()}
								</Button>
							</DialogClose>
							<form.AppForm>
								<Button
									className="bg-primary text-primary-foreground hover:bg-primary/90 capitalize"
									type="submit"
								>
									{m["fleet.addCarForm.submitBtn"]()}
								</Button>
							</form.AppForm>
						</DialogFooter>
					</form>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
