import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { Providers } from '@/lib/provider';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster position="bottom-right" expand={true} richColors />
        </Providers>
      </body>
    </html>
  );
}
