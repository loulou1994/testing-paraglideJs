import { TabsContent } from "#/components/ui/tabs";
import { addCarFormOpts, withForm } from "#/contexts/add-car-form-ctx";
import { m } from "#/paraglide/messages";

const addCarBasicInputs = [
	{
		name: "brand",
		type: "text",
		placeholder: m["fleet.addCarForm.brandPlaceholder"],
		label: m["fleet.addCarForm.brand"],
		items: null,
	},
	{
		name: "model",
		type: "text",
		placeholder: m["fleet.addCarForm.modelPlaceholder"],
		label: m["fleet.addCarForm.model"],
		items: null,
	},
	{
		name: "year",
		type: "number",
		placeholder: m["fleet.addCarForm.yearPlaceholder"],
		label: m["fleet.addCarForm.year"],
		items: null,
	},
	{
		name: "color",
		type: "text",
		placeholder: m["fleet.addCarForm.colorPlaceholder"],
		label: m["fleet.addCarForm.color"],
		items: null,
	},
	{
		name: "licensePlate",
		type: "text",
		placeholder: m["fleet.addCarForm.licensePlatePlaceholder"],
		label: m["fleet.addCarForm.licensePlate"],
		items: null,
	},
	{
		name: "vin",
		type: "text",
		placeholder: m["fleet.addCarForm.vinPlatePlaceholder"],
		label: m["fleet.addCarForm.vin"],
		items: null,
	},
	{
		name: "transmission",
		type: "select",
		placeholder: m["fleet.addCarForm.transmissionPlaceholder"],
		label: m["fleet.addCarForm.transmission"],
		items: [
			{ label: m["fleet.auto"], value: "auto" },
			{ label: m["fleet.manual"], value: "manual" },
		],
	},
	{
		name: "seats",
		type: "number",
		placeholder: m["fleet.addCarForm.seatsPlaceholder"],
		label: m["fleet.addCarForm.seats"],
		items: null,
	},
] as const;

export const AddCarBasicForm = withForm({
	...addCarFormOpts,
	// Optional, but adds props to the `render` function in addition to `form`
	// props: {
	// 	// These props are also set as default values for the `render` function
	// 	brandLabel: m["fleet.addCarForm.brand"](),
	// 	brandPlaceHolder: "Mercedes-Benz",
	// },
	render: function Render({ form }) {
		return (
			<TabsContent value="basic" className="mt-4 grid gap-4 md:grid-cols-2">
				{addCarBasicInputs.map(({ label, name, placeholder, type, items }) => {
					if (type === "select") {
						return (
							<form.AppField
								name={name}
								key={name}
								children={(field) => (
									<field.FormSelectField
										key={name}
										labelTitle={label()}
										items={
											items as unknown as {
												label: () => string;
												value: string;
											}[]
										}
										placeholder={placeholder}
									/>
								)}
							/>
						);
					} else if (type === "number") {
						return (
							<form.AppField
								name={name}
								key={name}
								children={(field) => (
									<field.FormNumberField
										key={name}
										// inputId={name}
										placeholder={placeholder}
										labelTitle={label()}
									/>
								)}
							/>
						);
					} else {
						return (
							<form.AppField
								name={name}
								key={name}
								children={(field) => (
									<field.FormTextField
										key={name}
										// inputId={name}
										placeholder={placeholder}
										labelTitle={label()}
									/>
								)}
							/>
						);
					}
				})}
			</TabsContent>
		);
	},
});
