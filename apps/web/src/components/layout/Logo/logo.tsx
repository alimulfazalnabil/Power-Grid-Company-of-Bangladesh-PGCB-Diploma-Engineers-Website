import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="PGCB"
        width={64}
        height={64}
        priority
      />

      <div>
        <h1 className="font-bold text-lg text-white">PGCB</h1>
        <p className="text-sm text-slate-300">Professional Engineers</p>
      </div>
    </Link>
  );
}
