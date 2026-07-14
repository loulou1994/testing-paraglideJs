import { Link } from "@tanstack/react-router";
import { SidebarHeader, useSidebar } from "./ui/sidebar";

export function BrandHeader({ collapsed }: { collapsed?: boolean }) {
	return (
		<Link to="/" className="flex items-center gap-2 px-2 py-3">
			<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
				L
			</div>
			{!collapsed && (
				<div className="leading-tight">
					<div className="font-semibold text-sidebar-foreground">Luxora</div>
					<div className="text-[10px] uppercase tracking-widest text-muted-foreground">
						Fleet OS
					</div>
				</div>
			)}
		</Link>
	);
}

export function BrandHeaderSidebar() {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<SidebarHeader className="border-b border-sidebar-border">
			<BrandHeader collapsed={collapsed} />
		</SidebarHeader>
	);
}
