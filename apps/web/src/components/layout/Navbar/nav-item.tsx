import clsx from 'clsx';

interface NavItemProps {
  href: string;
  title: string;
  className?: string;
}

export default function NavItem({ href, title, className }: NavItemProps) {
  return (
    <a
      href={href}
      className={clsx(
        'rounded-full px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className
      )}
    >
      {title}
    </a>
  );
}
