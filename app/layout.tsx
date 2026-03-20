import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 	"GradeGit",
  description: "GradeGit is a tool that helps you analyze your GitHub contributions and get a grade for your commits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          
          {children}


        </Providers>
      </body>
    </html>
  )
}
