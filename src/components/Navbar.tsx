import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { waLink } from '../lib/site';

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Work', href: '#work' },
  { label: 'Founder', href: '#founder' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3">
      <nav className={`max-w-6xl mx-auto rounded-2xl px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(34,211,238,0.35)]' : 'glass'}`}>
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition">
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden lg:block">
            <a href={waLink('Hi Pixel Teenz! I want a quote for my brand.')} target="_blank" rel="noreferrer" className="btn-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#04050c]" style={{ color: '#04050c' }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
          <button className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden pb-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-white/10 transition">
                {l.label}
              </a>
            ))}
            <a href={waLink('Hi Pixel Teenz! I want a quote for my brand.')} target="_blank" rel="noreferrer" className="btn-glow mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold" style={{ color: '#04050c' }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
