import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from "next/app";
import Header from "@/components/layout/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100,
      },
    },
  })
  return (
    <>
    <Analytics />
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <div className={`font-[family-name:var(--font-geist-sans)] bg-background ${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col justify-between`}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </QueryClientProvider>
    </UserProvider>
    </>
  );
}