const spacing = 150;

export default function BackgroundSVG() {
	return (
		<svg className="absolute inset-0 size-full stroke-[#262626] z-1">
			<defs>
				<pattern
					id="grid-pattern"
					height={spacing}
					width={spacing}
					x="0"
					y="0"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M -1 50 L 101 50"
						fill="#262626"
						fillOpacity="0.5"
					/>
					<path
						d="M 50 -1 L 50 101"
						fill="#262626"
						fillOpacity="0.5"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid-pattern)" />
		</svg>
	);
}
