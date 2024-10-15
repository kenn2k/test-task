import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ReactQueryClientProvider } from "@/provider/QueriClientProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
