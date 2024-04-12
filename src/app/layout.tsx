import type { Metadata } from "next";
import { inter, poppins } from "@/lib/fonts";
import { Header } from "@/components/header/Header";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";
import { AuthContextProvider } from "@/context/AuthContext";
import { SkeletonTheme } from "react-loading-skeleton";
import TanstackProvider from "@/context/TanstackProvider";
import "react-loading-skeleton/dist/skeleton.css";

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
      <body
        className={`${inter.variable} ${poppins.variable} font-poppins antialiased flex flex-col flex-1 min-h-screen`}
      >
        <Toaster richColors position="bottom-right" data-testid="toast" />
        <AuthContextProvider>
          <TanstackProvider>
            <SkeletonTheme baseColor="#333333 " highlightColor="#666666">
              <Header />
              <main className="flex flex-col flex-1">{children}</main>
              <Footer />
            </SkeletonTheme>
          </TanstackProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
