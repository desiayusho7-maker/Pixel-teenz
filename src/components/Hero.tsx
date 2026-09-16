import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, MessageCircle, Palette, Rocket, Star } from 'lucide-react';
import { waLink, inr } from '../lib/site';

const STATS = [
  { value: '40+', label: 'Projects delivered' },
  { value: '25+', label: 'Happy brands' },
  { value: '4.9', label: 'Average rating', star: true },
  { value: '48hr', label: 'Express delivery' },
];

const TICKER = [
  'Website Design', 'Logo Design', 'Brand Identity', 'Intro Videos', 'YouTube Openers',
  'Business Cards', 'Social Media Kits', 'Landing Pages', 'Reels Editing', 'Thumbnails',
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-10 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200">
              <Rocket size={14} className="text-neon" />
              A design studio run entirely by teens
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mt-6">
            Big-brand looks,
            <br />
            <span className="text-gradient">teen-friendly prices.</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-slate-300/90 text-base sm:text-xl mt-6 max-w-xl leading-relaxed">
            Pixel Teenz designs websites, brand logos and opening videos that make small businesses look like big brands — starting at just {inr(999)}.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="#pricing" className="btn-glow inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold" style={{ color: '#04050c' }}>
              View Plans in INR <ArrowRight size={18} />
            </a>
            <a href={waLink('Hi Pixel Teenz! I saw your website and I want to discuss a project for my brand.')} target="_blank" rel="noreferrer" className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition">
              <MessageCircle size={18} className="text-neon" />
              WhatsApp Us
            </a>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-3 text-center">
                <div className="font-display text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-1">
                  {s.value}
                  {s.star && <Star size={16} className="text-amber-300 fill-amber-300" />}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative hidden lg:block">
          <div className="glass-strong rounded-[2rem] p-2 overflow-hidden shadow-[0_20px_80px_-20px_rgba(168,85,247,0.5)]">
            <img src="/reference-theme.png" alt="Pixel Teenz brand" className="rounded-[1.6rem] w-full object-cover" />
            <div className="absolute inset-0 rounded-[2rem] pointer-events-none ring-1 ring-inset ring-white/15" />
          </div>
          <div className="absolute -left-8 top-10 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 animate-floaty shadow-xl">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon to-grape flex items-center justify-center">
              <BadgeCheck size={20} style={{ color: '#04050c' }} />
            </span>
            <div>
              <div className="text-sm font-semibold">Logo delivered</div>
              <div className="text-xs text-slate-400">Cafe Brew House</div>
            </div>
          </div>
          <div className="absolute -right-4 bottom-16 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 animate-floaty-delay shadow-xl">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-candy to-grape flex items-center justify-center">
              <Palette size={20} style={{ color: '#04050c' }} />
            </span>
            <div>
              <div className="text-sm font-semibold">Website went live</div>
              <div className="text-xs text-slate-400">2 days flat</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto mt-14">
        <div className="glass rounded-2xl overflow-hidden py-3.5 relative">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="mx-5 text-sm font-semibold tracking-wide text-slate-300 flex items-center gap-5">
                {t}
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon to-candy inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
