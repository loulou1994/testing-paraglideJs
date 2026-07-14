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
					className="absolute w-[755px] left-0 top-32"
				>
					<source src={video} type="video/webm" />
				</video>
			)}
		</div>
	);
}
