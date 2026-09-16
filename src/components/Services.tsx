import { motion } from 'framer-motion';
import { ArrowUpRight, Clapperboard, Globe, MessagesSquare, Palette, PenTool, Rocket, Wallet } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { waLink, inr } from '../lib/site';

const CARDS = [
  {
    icon: Globe,
    title: 'Website Design',
    desc: 'Fast, mobile-first websites and landing pages that turn visitors into customers.',
    points: ['Business websites & portfolios', 'Landing & coming-soon pages', 'WhatsApp chat + maps + forms', 'Basic SEO + speed setup'],
    price: 2999,
    grad: 'from-neon to-sky-500',
    msg: 'Hi Pixel Teenz! I need a website for my brand. Please share details.',
  },
  {
    icon: PenTool,
    title: 'Logo & Branding',
    desc: 'Memorable logos and complete brand kits that make you look established from day one.',
    points: ['Custom logo + 3 concepts', 'Colors, fonts & brand guide', 'Visiting card & letterhead', 'Social media profile kit'],
    price: 999,
    grad: 'from-grape to-candy',
    msg: 'Hi Pixel Teenz! I need a logo / brand kit for my business. Please share details.',
  },
  {
    icon: Clapperboard,
    title: 'Intro & Opening Videos',
    desc: 'Cinematic channel intros, logo reveals and promo openers for YouTube, reels & events.',
    points: ['YouTube channel intros', 'Logo animation & reveals', 'Promo & event openers', 'Outro + subscribe pack'],
    price: 1499,
    grad: 'from-candy to-amber-400',
    msg: 'Hi Pixel Teenz! I need an intro / opening video. Please share details.',
  },
];

const STEPS = [
  { icon: MessagesSquare, title: 'Say hi on WhatsApp', desc: 'Tell us about your brand and what you need.' },
  { icon: Wallet, title: '50% advance on UPI', desc: 'Simple, secure payment to start your project.' },
  { icon: Palette, title: 'Design + revisions', desc: 'We design, you review, we refine till you love it.' },
  { icon: Rocket, title: 'Final delivery', desc: 'Get all files + launch support on WhatsApp.' },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="What we do"
          title={<>Everything your brand needs <span className="text-gradient">to look legit online</span></>}
          sub="One teen crew for your complete internet presence — no agencies, no middlemen, no crazy bills."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="glass rounded-3xl p-7 flex flex-col card-hover relative overflow-hidden"
            >
              <div className={`absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${c.grad} opacity-20 blur-3xl`} />
              <span className={`p-3.5 rounded-2xl bg-gradient-to-br ${c.grad} w-fit shadow-lg`}>
                <c.icon size={26} style={{ color: '#04050c' }} />
              </span>
              <h3 className="font-display text-2xl font-bold mt-5">{c.title}</h3>
              <p className="text-slate-300/85 text-sm mt-2 leading-relaxed">{c.desc}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-200">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${c.grad} shrink-0`} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <div className="text-xs text-slate-400 uppercase tracking-widest">Starting at</div>
                <div className="font-display text-3xl font-bold text-white">{inr(c.price)}</div>
                <div className="flex gap-2 mt-4">
                  <a href="#pricing" className="glass flex-1 text-center rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition">
                    See plans
                  </a>
                  <a href={waLink(c.msg)} target="_blank" rel="noreferrer" className="btn-glow flex-1 inline-flex items-center justify-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ color: '#04050c' }}>
                    Order <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 glass rounded-3xl p-6 sm:p-8">
          <div className="text-center font-display text-xl sm:text-2xl font-bold">How ordering works</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 relative">
                <span className="absolute top-4 right-4 font-display text-3xl font-bold text-white/10">0{i + 1}</span>
                <s.icon size={22} className="text-neon" />
                <div className="font-semibold mt-3">{s.title}</div>
                <div className="text-sm text-slate-400 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
