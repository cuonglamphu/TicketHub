import type { Metadata } from "next";
import "./globals.css";
import { Pixelify_Sans, VT323 } from 'next/font/google';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

const pixelify = Pixelify_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixelify',
});

export const metadata: Metadata = {
  title: "TicketHub",
  description: "TicketHub is a platform for buying and selling tickets for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${pixelify.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
