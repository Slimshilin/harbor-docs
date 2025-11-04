import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider/next";
import { GeistMono } from "geist/font/mono";
import {
  Instrument_Sans,
  Instrument_Serif,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./global.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const plus = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        plus.variable,
        instrumentSerif.variable,
        instrumentSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
