import type { AppProps } from "next/app";
import Head from "next/head";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/lib/AuthContext";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>YourTube - YouTube Clone</title>
        <meta
          name="description"
          content="YourTube - YouTube Clone"
        />
      </Head>

      <div className="min-h-screen bg-white text-black flex flex-col">
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>

        <Toaster />

        <div className="flex flex-1">
          <div className="hidden md:block w-64 flex-shrink-0 border-r bg-white min-h-[calc(100vh-57px)]">
            <Sidebar />
          </div>

          <main className="flex-1 min-w-0 p-4">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}