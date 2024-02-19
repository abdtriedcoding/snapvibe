import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import SessionProvider from "@/components/providers/auth-provider";

const font = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "snapvibe",
  description:
    "A visually stunning platform for sharing moments, connecting with friends, and exploring the world through photos and videos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
