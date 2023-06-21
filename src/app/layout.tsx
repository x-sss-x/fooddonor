"use client";
import { Flowbite, CustomFlowbiteTheme } from "flowbite-react";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-pink-600 hover:bg-pink-700 text-slate-50",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={"h-screen w-screen overflow-hidden overflow-y-scroll"}
        style={inter.style}
      >
        <Providers>
          <Flowbite theme={{ theme }}>{children}</Flowbite>
        </Providers>
      </body>
    </html>
  );
}
