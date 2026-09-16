import { ArrowUp, Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { waLink, INSTAGRAM_URL, FOUNDER_INSTAGRAM, WHATSAPP_DISPLAY, SITE_NAME } from '../lib/site';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 pb-8 pt-4">
      <div className="max-w-6xl mx-auto glass rounded-[2rem] p-7 sm:p-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-sm text-slate-400 mt-4 max-w-sm leading-relaxed">
              {SITE_NAME} is a teen-run design studio crafting websites, brand logos and opening
              videos for brands across India — at prices students and startups can actually afford.
            </p>
            <div className="flex gap-2.5 mt-5">
              <a href={waLink('Hi Pixel Teenz!')} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-xl bg-[#25D366] flex items-center justify-center hover:opacity-85 transition">
                <MessageCircle size={19} style={{ color: '#04050c' }} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:opacity-90 transition">
                <Instagram size={19} className="text-white" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Explore</div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li><a href="#services" className="hover:text-neon transition">Services</a></li>
              <li><a href="#pricing" className="hover:text-neon transition">Pricing</a></li>
              <li><a href="#work" className="hover:text-neon transition">Our work</a></li>
              <li><a href="#founder" className="hover:text-neon transition">Founder</a></li>
              <li><a href="#reviews" className="hover:text-neon transition">Reviews</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Contact</div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>WhatsApp: {WHATSAPP_DISPLAY}</li>
              <li>Instagram: @{FOUNDER_INSTAGRAM}</li>
              <li>Mon - Sat, 4 PM - 10 PM IST</li>
              <li>India, working remotely</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span>Designed & built by teens, for brands with big dreams.</span>
          <a href="#top" className="glass rounded-full h-9 w-9 flex items-center justify-center hover:bg-white/10 transition" aria-label="Back to top">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
