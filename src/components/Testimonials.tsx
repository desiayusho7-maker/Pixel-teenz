import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Quote, Send, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { SERVICES } from '../lib/site';

type T = {
  id: number;
  name: string;
  business: string | null;
  rating: number;
  message: string;
  service: string | null;
};

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= n ? 'text-amber-300 fill-amber-300' : 'text-slate-600'} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = () => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch((e) => console.error('testimonials fetch failed', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const avg = items.length ? (items.reduce((a, t) => a + t.rating, 0) / items.length).toFixed(1) : '5.0';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (message.trim().length < 10) return setError('Please write at least a few words about your experience.');
    setSending(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), business: business.trim() || null, service, rating, message: message.trim() }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setDone(true);
      setName(''); setBusiness(''); setMessage(''); setRating(5);
      fetchItems();
      setTimeout(() => setDone(false), 5000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="reviews" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="Client love"
          title={<>Brands that <span className="text-gradient">trusted the teenz</span></>}
          sub="Real reviews from real business owners. Worked with us? Drop your own review below."
        />

        {!loading && items.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="glass rounded-2xl px-6 py-3 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-gradient">{avg}</span>
              <div>
                <Stars n={Math.round(Number(avg))} />
                <div className="text-xs text-slate-400 mt-0.5">{items.length} verified reviews</div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-14 text-slate-300 gap-2">
            <Loader2 className="animate-spin" size={22} /> Loading reviews...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="glass rounded-3xl p-6 flex flex-col card-hover">
                <Quote size={24} className="text-grape" />
                <p className="text-sm text-slate-200 leading-relaxed mt-3 flex-1">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-4"><Stars n={t.rating} /></div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon to-grape flex items-center justify-center font-bold" style={{ color: '#04050c' }}>
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.business || t.service || 'Happy client'}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="glass rounded-3xl p-6 sm:p-8 mt-8">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-center">Worked with us? Leave a review</h3>
          <p className="text-sm text-slate-400 text-center mt-1">It takes 30 seconds and means the world to our teen crew.</p>
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name *" className="input-glass rounded-xl px-4 py-3 text-sm" />
            <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business / brand name" className="input-glass rounded-xl px-4 py-3 text-sm" />
            <select value={service} onChange={(e) => setService(e.target.value)} className="input-glass rounded-xl px-4 py-3 text-sm">
              {SERVICES.map((s) => <option key={s} value={s} className="bg-[#0b0e1a]">{s}</option>)}
            </select>
            <div className="input-glass rounded-xl px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm text-slate-400">Rating</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button type="button" key={i} onClick={() => setRating(i)} aria-label={`${i} stars`}>
                    <Star size={20} className={i <= rating ? 'text-amber-300 fill-amber-300' : 'text-slate-600'} />
                  </button>
                ))}
              </div>
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How was your experience with Pixel Teenz? *" rows={3} className="input-glass rounded-xl px-4 py-3 text-sm sm:col-span-2 resize-none" />
            {error && <div className="sm:col-span-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-400/30 rounded-xl px-4 py-2.5">{error}</div>}
            {done && <div className="sm:col-span-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-4 py-2.5">Thanks! Your review is now live above.</div>}
            <button type="submit" disabled={sending} className="btn-glow sm:col-span-2 rounded-xl px-6 py-3 font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60" style={{ color: '#04050c' }}>
              {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={17} />}
              {sending ? 'Posting...' : 'Post my review'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
