"use client"; // Necesario porque Redux usa estado

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="es">
        <body className={`${geistMono.variable} bg-black text-green-400 font-mono`}> 
          <Header />
            <main className="min-h-screen p-6 text-center">
              {children}
            </main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
