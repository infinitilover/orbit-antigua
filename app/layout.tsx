
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Chatbot from '@/components/chat/Chatbot';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orbit - Antigua & Barbuda Business Directory',
  description: 'Where Business Revolves in Antigua & Barbuda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Chatbot />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
