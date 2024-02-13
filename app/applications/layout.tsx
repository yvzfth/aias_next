import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PrimeReactProvider } from 'primereact/api';
const inter = Inter({ subsets: ['latin'] });
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
export const metadata: Metadata = {
  title: 'Akademik Teşvik Sistemi',
  description: 'Akademik Teşvik Sistemi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='tr' suppressHydrationWarning={true}>
      <body
        className={inter.className + ' overflow-visible'}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
