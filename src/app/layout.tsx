import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "App de cadastro de clientes",
 description: "Feito para aprendizado de requisição",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html suppressHydrationWarning lang="ot-br">
   <body className={inter.className}>{children}</body>
  </html>
 );
}
