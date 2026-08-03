import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PGCB Portal',
  description: 'Public website for PGCB portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
