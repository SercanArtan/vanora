import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Rick and Morty Explorer | Vanora Ventures",
  description:
    "Explore characters from the Rick and Morty universe. Browse, search, and filter your favorite characters.",
  keywords: ["Rick and Morty", "characters", "explorer", "Vanora Ventures"],
  openGraph: {
    title: "Rick and Morty Explorer",
    description: "Explore characters from the Rick and Morty universe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
