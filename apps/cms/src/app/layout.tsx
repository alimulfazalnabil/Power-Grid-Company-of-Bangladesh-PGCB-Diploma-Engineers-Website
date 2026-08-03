import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PGCB CMS',
  description: 'Admin CMS for PGCB portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
