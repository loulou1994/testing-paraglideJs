import { TabsContent } from "#/components/ui/tabs";
import { addCarFormOpts, withForm } from "#/hooks/add-car-form-ctx";
import { m } from "#/paraglide/messages";

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
				<form.AppField
					name={"brand"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"Mercedes-Benz"}
							labelTitle={m["fleet.addCarForm.brand"]()}
						/>
					)}
				/>
				<form.AppField
					name={"model"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"S-Class"}
							labelTitle={m["fleet.addCarForm.model"]()}
						/>
					)}
				/>
				<form.AppField
					name={"year"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"2024"}
							labelTitle={m["fleet.addCarForm.year"]()}
						/>
					)}
				/>
				<form.AppField
					name={"color"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"Obsidian Black"}
							labelTitle={m["fleet.addCarForm.color"]()}
						/>
					)}
				/>
				<form.AppField
					name={"licensePlate"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"ABC-123"}
							labelTitle={m["fleet.addCarForm.licensePlate"]()}
						/>
					)}
				/>
				<form.AppField
					name={"vin"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"WDD2220..."}
							labelTitle={m["fleet.addCarForm.vin"]()}
						/>
					)}
				/>
				<form.AppField
					name={"transmission"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"Mercedes-Benz"}
							labelTitle={m["fleet.addCarForm.transmission"]()}
						/>
					)}
				/>
				<form.AppField
					name={"seats"}
					children={(field) => (
						<field.FormTextField
							inputId="brand"
							placeholder={"5"}
							labelTitle={m["fleet.addCarForm.seats"]()}
						/>
					)}
				/>
				{/* <form.AppForm>
					<form.SubscribeButton label="Submit" />
				</form.AppForm> */}
			</TabsContent>
		);
	},
});
