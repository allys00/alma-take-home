import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const montserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alma - Immigration made easy!',
  description: 'Immigration made easy!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratSans.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
