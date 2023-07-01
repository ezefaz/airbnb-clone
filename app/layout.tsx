import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Airbnb",
	description: "This is Airbnb clone",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={nunito.className}>
				<ClientOnly>
					<ToasterProvider />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
