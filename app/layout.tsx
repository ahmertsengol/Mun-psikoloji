import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsWrapper } from '@/components/analytics-wrapper';
import { CookieManager } from "@/components/cookie-manager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Munzur Üniversitesi Psikoloji Kulübü",
  description: "Munzur Üniversitesi Psikoloji Kulübü topluluk sitesi. Bu site resmi değildir.",
  keywords: ["psikoloji", "munzur üniversitesi", "kulüp", "etkinlikler", "haberler"],
  authors: [{ name: "Munzur Psikoloji Kulübü" }],
  openGraph: {
    title: "Munzur Üniversitesi Psikoloji Kulübü",
    description: "Munzur Üniversitesi Psikoloji Kulübü topluluk sitesi",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <CookieManager />
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
