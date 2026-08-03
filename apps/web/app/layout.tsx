import './globals.css';
import type { Metadata } from 'next';

import { Providers } from '../src/components/providers';

export const metadata: Metadata = {
  title: 'PGCB Portal',
  description: 'A modern portal for PGCB diploma engineers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
