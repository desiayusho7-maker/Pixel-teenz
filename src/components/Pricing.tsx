import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Check, Crown, Loader2, MessageCircle, ShieldCheck, Timer, Wallet } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { waLink, inr } from '../lib/site';

type Plan = {
  id: number;
  category: string;
  name: string;
  price_inr: number;
  old_price_inr: number | null;
  features: string[];
  delivery: string;
  popular: boolean;
};

const CATS = ['Websites', 'Logos & Branding', 'Intro Videos', 'Combos'];

const TRUST = [
  { icon: Wallet, text: 'UPI / GPay / PhonePe accepted' },
  { icon: ShieldCheck, text: 'Only 50% advance to start' },
  { icon: BadgeCheck, text: 'Free revisions till you smile' },
  { icon: Timer, text: 'On-time delivery, always' },
];

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState(CATS[0]);

  useEffect(() => {
    fetch('/api/plans')
      .then((r) => r.json())
      .then((d) => setPlans(Array.isArray(d) ? d : []))
      .catch((e) => console.error('plans fetch failed', e))
      .finally(() => setLoading(false));
  }, []);

  const shown = plans.filter((p) => p.category === cat);

  return (
    <section id="pricing" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="Pricing in INR"
          title={<>Honest prices, <span className="text-gradient">zero hidden charges</span></>}
          sub="Every plan includes WhatsApp support, source files and revisions. Pick a plan and order in one tap."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                cat === c
                  ? 'bg-gradient-to-r from-neon to-grape text-[#04050c] shadow-[0_8px_30px_-8px_rgba(34,211,238,0.6)]'
                  : 'glass text-slate-300 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-300 gap-2">
            <Loader2 className="animate-spin" size={22} /> Loading plans...
          </div>
        ) : shown.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center text-slate-300">
            Plans are being updated. Ping us on WhatsApp for the latest quote.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-7 flex flex-col card-hover ${p.popular ? 'price-popular' : 'glass'}`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon to-grape px-4 py-1 text-xs font-bold whitespace-nowrap" style={{ color: '#04050c' }}>
                    <Crown size={13} /> MOST POPULAR
                  </span>
                )}
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">{p.category}</div>
                <h3 className="font-display text-2xl font-bold mt-1">{p.name}</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="font-display text-4xl font-bold text-gradient">{inr(p.price_inr)}</span>
                  {p.old_price_inr ? <span className="text-slate-500 line-through mb-1">{inr(p.old_price_inr)}</span> : null}
                </div>
                <div className="text-xs text-slate-400 mt-1">Delivery: {p.delivery}</div>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-200 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-neon/15 border border-neon/30 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-neon" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Hi Pixel Teenz! I want to order the "${p.name}" plan (${p.category}) at ${inr(p.price_inr)}. Please confirm availability.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${p.popular ? 'btn-glow' : 'glass hover:bg-white/10 text-white'}`}
                  style={p.popular ? { color: '#04050c' } : undefined}
                >
                  <MessageCircle size={16} /> Order on WhatsApp
                </a>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {TRUST.map((t) => (
            <div key={t.text} className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 text-sm text-slate-200">
              <t.icon size={20} className="text-neon shrink-0" />
              {t.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
