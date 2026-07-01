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
				{/* <form.AppForm>
					<form.SubscribeButton label="Submit" />
				</form.AppForm> */}
			</TabsContent>
		);
	},
});
