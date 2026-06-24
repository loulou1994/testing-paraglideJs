import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "#/components/layouts/dashboard";
import { SidebarProvider } from "#/components/ui/sidebar";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<DashboardLayout>{<Outlet />}</DashboardLayout>
		</SidebarProvider>
	);
}
