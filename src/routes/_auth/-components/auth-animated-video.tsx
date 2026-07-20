import { Eye, Shield, TrendingUp } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import video from "../../../assets/0050-0109.webm";
import { m } from "#/paraglide/messages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "#/lib/utils";

const dashboardFeatures = [
	{
		title: m["login.features_1_title"](),
		description: m["login.feature_1_description"](),
		icon: TrendingUp,
		gridPosition: "[grid-area:card-one]"
	},
	{
		title: m["login.features_2_title"](),
		description: m["login.feature_2_description"](),
		icon: Eye,
		gridPosition: "[grid-area:card-two]"
	},
	{
		title: m["login.features_3_title"](),
		description: m["login.feature_3_description"](),
		icon: Shield,
		gridPosition: "[grid-area:card-three]"
	},
]

export function AuthAnimatedVideo() {
	const matches = useMediaQuery("(min-width: 1024px)");

	return (
		<div className="w-150">
			{matches && (
				<video
					autoPlay
					playsInline
					muted
					className="absolute w-[calc(0.5rem+50vw)] left-0 bottom-[-4vw]"
				>
					<source src={video} type="video/webm" />
				</video>
			)}
			<div className="absolute grid [grid-template-areas:'card-one_._.''._card-two_.''._._card-three'] gap-x-3 " dir="ltr">
				{dashboardFeatures.map(({description, icon: Icon, title, gridPosition}) => (
					<Card className={cn("relative", gridPosition)}>
						<CardHeader className="flex flex-row gap-x-1.5 px-2">
							<span className="w-6 relative aspect-square bg-secondary rounded-full h-fit before:w-3 before:aspect-square before:h-fit before:bg-white before:rounded-full before:absolute before:left-1/2 before:top-1/2 before:-translate-1/2" ></span>
							<div className="flex-1">
								<CardTitle className="leading-tight">{title}</CardTitle>
								<CardDescription className="mt-3">{description}</CardDescription>
							</div>
							{<Icon className="absolute bottom-4 right-4"/>}
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
