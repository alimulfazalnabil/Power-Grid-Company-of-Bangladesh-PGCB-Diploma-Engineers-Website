import { Facebook, Linkedin, Mail, Phone, Youtube } from 'lucide-react';

const contactLinks = [
  { label: 'info@pgcb.gov.bd', href: 'mailto:info@pgcb.gov.bd', icon: Mail },
  { label: '+880 1234 567890', href: 'tel:+8801234567890', icon: Phone },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export default function TopBar() {
  return (
    <div className="bg-slate-950/90 border-b border-slate-900/80 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          {contactLinks.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                className="inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {contact.label}
              </a>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
