export default function ChartSVG() {
	return (
		<svg
			viewBox="0 0 240 120"
			xmlns="http://www.w3.org/2000/svg"
			className="stroke-gray-300"
		>
			<path
				d="M20 80
				 L40 40
				 L80 20
				 L100 60
				 L120 100
				 L140 40
				 L160 20
				 L180 70
				 L200 100
				 L220 30"
				stroke="#0065FA"
				fill="none"
				strokeWidth="10"
				strokeLinejoin="miter"
				strokeDasharray="1000"
				strokeDashoffset="1000"
			>
				<animate
					attributeName="stroke-dashoffset"
					from="1000"
					to="0"
					dur="1.5s"
					fill="freeze"
					begin="0.5s"
					calcMode="spline"
					keySplines="0.4 0 0.2 1"
					repeatCount="indefinite"
				/>
			</path>
		</svg>
	);
}
