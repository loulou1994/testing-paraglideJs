import { Link, useRouterState } from "@tanstack/react-router";
import {
	Bell,
	Car,
	ClipboardList,
	DollarSign,
	LayoutDashboard,
	Megaphone,
	Search,
	Settings,
	Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { BrandHeaderSidebar } from "../brand-header";
import ParaglideLocaleSwitcher from "../LocaleSwitcher";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const main = [
	{ titleKey: "sidebar.dashboard", url: "/dashboard", icon: LayoutDashboard },
	{ titleKey: "sidebar.fleet", url: "/dashboard/fleet", icon: Car },
	{ titleKey: "sidebar.orders", url: "/orders", icon: ClipboardList },
	{ titleKey: "sidebar.revenue", url: "/revenue", icon: DollarSign },
] as const;

const secondary = [
	{ titleKey: "sidebar.advertising", url: "/advertising", icon: Megaphone },
	{ titleKey: "sidebar.customers", url: "/customers", icon: Users },
	{ titleKey: "sidebar.settings", url: "/settings", icon: Settings },
] as const;

export function DashboardHeader({
	title,
	subtitle,
	actions,
}: {
	title: string;
	subtitle?: string;
	actions?: ReactNode;
}) {
	return (
		<div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight md:text-3xl capitalize">
					{title}
				</h1>
				{subtitle && (
					<p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
				)}
			</div>
			{actions && (
				<div className="flex flex-wrap items-center gap-2">{actions}</div>
			)}
		</div>
	);
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isActive = (url: string) => {
		return url === pathname;
	};
	// const isActive = (url: string) =>
	// 	url === "/"
	// 		? pathname === "/"
	// 		: pathname === url || pathname.startsWith(url + "/");

	return (
		<div className="flex min-h-screen w-full bg-background">
			<Sidebar
				collapsible="icon"
				side={getLocale() === "ar" ? "right" : "left"}
			>
				<BrandHeaderSidebar />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>{m["sidebar.operations"]()}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{main.map((item) => (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											asChild
											isActive={isActive(item.url)}
											tooltip="nothing"
										>
											<Link to={item.url}>
												<item.icon className="h-4 w-4" />
												<span>{m[item.titleKey]()}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>{m["sidebar.growth"]()}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{secondary.map((item) => (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											asChild
											isActive={isActive(item.url)}
											tooltip="nothing"
										>
											<Link to={item.url}>
												<item.icon className="h-4 w-4" />
												<span>{m[item.titleKey]()}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>

			<div className="flex flex-1 flex-col">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
					<SidebarTrigger />
					<div className="relative hidden flex-1 max-w-md md:block">
						<Search className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder={m["sidebar.search"]()}
							className="h-9 ps-9 bg-secondary/50 border-border"
						/>
					</div>
					<div className="ms-auto flex items-center gap-1.5">
						<ParaglideLocaleSwitcher />
						<ThemeToggle />
						<Button variant="ghost" size="icon" aria-label="Notifications">
							<Bell className="h-4 w-4" />
						</Button>
						<div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1">
							<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
								AG
							</div>
							<span className="hidden text-xs font-medium pe-2 sm:inline">
								{m["sidebar.agency"]()}
							</span>
						</div>
					</div>
				</header>
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
