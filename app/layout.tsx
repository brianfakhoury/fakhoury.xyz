import { Raleway } from 'next/font/google';
import { Providers } from '@/app/providers';
import Layout from '@/components/Layout';

import '@/styles/globals.css';

const raleway = Raleway({ weight: '400', subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.className}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
