import { useMediaQuery } from "usehooks-ts";
import video from "../../../assets/0050-0109.webm";

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
		</div>
	);
}
