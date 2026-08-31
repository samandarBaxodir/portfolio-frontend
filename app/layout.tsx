import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { SiteBackground } from "@/components/site-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salom | Portfolio",
  description: "IT talabasi, full-stack dasturchi va 3D dizayner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteBackground />
          <ScrollProgress />
          <div className="relative z-10 flex-1 flex flex-col">
            <Navbar />
            <PageTransition>{children}</PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
