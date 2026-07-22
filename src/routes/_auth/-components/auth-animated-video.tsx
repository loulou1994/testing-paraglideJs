import { Eye, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import video from "../../../assets/0050-0109.webm";

const dashboardFeatures = [
	{
		title: m["login.features_1_title"](),
		description: m["login.feature_1_description"](),
		icon: TrendingUp,
		styling: "[grid-area:card-one] [--opacity-delay:0s] [--orbit-delay:4s] [--direction:1]", // css variables used for the "fadeIn" & "revolve" animations
	},
	{
		title: m["login.features_2_title"](),
		description: m["login.feature_2_description"](),
		icon: Eye,
		styling: "[grid-area:card-two] [--opacity-delay:1.5s] [--orbit-delay:5.5s] [--direction:-1]",
	},
	{
		title: m["login.features_3_title"](),
		description: m["login.feature_3_description"](),
		icon: Shield,
		styling:
			"[grid-area:card-three] [--opacity-delay:3s] [--orbit-delay:7s] [--direction:1]",
	},
];

export function AuthAnimatedVideo() {
	const [animateCards, setAnimateCards] = useState(false);
	const matches = useMediaQuery("(min-width: 1024px)");

	return (
		<div className="w-150">
			{matches && (
				<video
					autoPlay
					playsInline
					muted
					className="absolute w-[calc(0.5rem+50vw)] left-0 bottom-[-4vw]"
					onPlay={() => {
						setAnimateCards(true);
					}}
				>
					<source src={video} type="video/webm" />
				</video>
			)}
			<div
				className="hidden lg:absolute lg:grid lg:grid-cols-3 lg:[grid-template-areas:'card-one_._.''._card-two_.''._._card-three'] lg:gap-x-0 lg:w-162.5 lg:left-[clamp(1.25rem,3vw,3rem)] lg:grid-rows-[repeat(3,10.5rem)] xl:w-212.5 xl:gap-x-6 xl:grid-rows-[repeat(3,11.2rem)]"
				dir="ltr"
			>
				{dashboardFeatures.map(
					({ description, icon: Icon, title, styling }) => (
						<Card
							className={cn(
								"relative orbit z-0  bg-[linear-gradient(347deg,transparent_0%,var(--background)_52%)] bg-transparent mask-linear-[linear-gradient(345deg,#0d1218_0_5rem,transparent_11rem)] backdrop-blur-xs opacity-0 before:content-normal before:inset-0 before:duration-300 before:ease-linear before:bg-background before:opacity-0 before:transition-opacity before:-z-1 hover:before:opacity-100 before:absolute before:rounded-xl",
								animateCards && styling,
							)}
							key={styling}
						>
							{/* <div className="absolute inset-0 mask-linear-[linear-gradient(345deg,#0d1218_0_5rem,transparent_11rem)] backdrop-blur-sm z-0 rounded-2xl"></div> */}
							<CardHeader className="flex flex-row gap-x-1.5 px-2 z-1">
								<span className="w-6 relative aspect-square bg-primary rounded-full h-fit before:w-3 before:aspect-square before:h-fit before:bg-background before:rounded-full before:absolute before:left-1/2 before:top-1/2 before:-translate-1/2"></span>
								<div className="flex-1">
									<CardTitle className="leading-tight">{title}</CardTitle>
									<CardDescription className="mt-3">
										{description}
									</CardDescription>
								</div>
							</CardHeader>
							{<Icon className="absolute bottom-4 right-4 stroke-primary" />}
						</Card>
					),
				)}
			</div>
		</div>
	);
}
