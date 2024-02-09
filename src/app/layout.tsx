import type { Metadata } from "next";
import { inter, poppins } from "@/lib/fonts";
import { Header } from "@/components/header/Header";
import "./globals.css";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "RIFT",
  description: "Veja as principais recomendações da comunidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-poppins antialiased flex flex-col flex-1 min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
