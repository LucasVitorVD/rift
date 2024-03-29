import { Inter, Poppins } from "next/font/google"

export const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter"
});

export const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins"
})