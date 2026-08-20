import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "QuickBite Reviews",
  description: "Fast, privacy-first restaurant location reviews"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
