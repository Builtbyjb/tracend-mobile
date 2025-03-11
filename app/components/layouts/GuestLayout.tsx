import GuestNavBar from "~/components/navbar/GuestNavBar";
import Footer from "../Footer";
import BackgroundSVG from "../backgroundSVG";

export function GuestLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<BackgroundSVG />
			<div className="w-[90%] py-8 mx-auto sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] relative z-2">
				<GuestNavBar />
				<div className="mt-16 mb-8 min-h-[45vh]">{children}</div>
				<Footer />
			</div>
		</div>
	);
}
