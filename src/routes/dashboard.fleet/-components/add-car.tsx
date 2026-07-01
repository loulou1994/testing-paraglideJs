import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { addCarFormOpts, useAppForm } from "#/hooks/add-car-form-ctx";
import { m } from "#/paraglide/messages";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { validateAddCarForm } from "../-validations/add-car";
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
			onSubmit: validateAddCarForm,
		},
		onSubmit: async () => {
			toast.success("Form submitted successfully");
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto" >
				<DialogHeader>
					<DialogTitle>{m["fleet.addNew"]()}</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="basic" className="w-full">
					<TabsList className="grid w-full sm:grid-cols-7 gap-y-1 grid-cols-1 h-auto!">
						<TabsTrigger value="basic">
							{m["fleet.addCarForm.basic"]()}
						</TabsTrigger>
						<TabsTrigger value="images">
							{m["fleet.addCarForm.images"]()}
						</TabsTrigger>
						<TabsTrigger value="services">
							{m["fleet.addCarForm.services"]()}
						</TabsTrigger>
						<TabsTrigger value="pricing">
							{m["fleet.addCarForm.pricing"]()}
						</TabsTrigger>
						<TabsTrigger value="rental">
							{m["fleet.addCarForm.rentalRules"]()}
						</TabsTrigger>
						<TabsTrigger value="extras">
							{m["fleet.addCarForm.extras"]()}
						</TabsTrigger>
						<TabsTrigger value="availability">
							{m["fleet.addCarForm.availability"]()}
						</TabsTrigger>
					</TabsList>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<AddCarBasicForm form={form} />
					</form>
					{/* <form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}

					></form> */}
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
