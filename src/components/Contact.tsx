import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Instagram, Loader2, MessageCircle, Phone, Send, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { SERVICES, BUDGETS, waLink, WHATSAPP_DISPLAY, INSTAGRAM_URL, FOUNDER_INSTAGRAM } from '../lib/site';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sentLink, setSentLink] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))) return setError('Please enter a valid 10-digit mobile number.');
    if (message.trim().length < 10) return setError('Tell us a little more about your project (min 10 characters).');

    const text =
      'Hi Pixel Teenz! New project inquiry from the website.' +
      `\n\nName: ${name.trim()}` +
      `\nPhone: ${phone.trim()}` +
      `\nService: ${service}` +
      `\nBudget: ${budget}` +
      `\nProject details: ${message.trim()}` +
      '\n\nPlease share next steps!';

    setSending(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), service, budget, message: message.trim() }),
      });
    } catch (err) {
      console.error('inquiry save failed', err);
    } finally {
      setSending(false);
    }
    const link = waLink(text);
    setSentLink(link);
    window.open(link, '_blank');
  };

  const quick = (s: string) =>
    waLink(`Hi Pixel Teenz! I'm interested in "${s}" for my brand. My name is ___ and my budget is around ___. Please share details.`);

  return (
    <section id="contact" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="Get in touch"
          title={<>Let&apos;s build your <span className="text-gradient">internet presence</span></>}
          sub="Fill the form and we will auto-open WhatsApp with your message ready to send. Zero friction, instant reply."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <motion.div initial={{ opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="flex flex-col gap-4">
            <a href={waLink('Hi Pixel Teenz! I want to discuss a project for my brand.')} target="_blank" rel="noreferrer" className="glass rounded-3xl p-6 card-hover block">
              <span className="h-12 w-12 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg">
                <MessageCircle size={24} style={{ color: '#04050c' }} />
              </span>
              <div className="font-display text-xl font-bold mt-4">WhatsApp us directly</div>
              <div className="text-neon font-semibold text-lg">{WHATSAPP_DISPLAY}</div>
              <div className="text-sm text-slate-400 mt-1">Tap to chat — we usually reply within a few hours.</div>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="glass rounded-3xl p-6 card-hover block">
              <span className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-lg">
                <Instagram size={24} className="text-white" />
              </span>
              <div className="font-display text-xl font-bold mt-4">DM the founder</div>
              <div className="text-neon font-semibold text-lg">@{FOUNDER_INSTAGRAM}</div>
              <div className="text-sm text-slate-400 mt-1">Behind-the-scenes, new drops & design tips.</div>
            </a>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-neon to-grape flex items-center justify-center shadow-lg">
                  <Clock size={22} style={{ color: '#04050c' }} />
                </span>
                <div>
                  <div className="font-display text-lg font-bold">Working hours</div>
                  <div className="text-sm text-slate-300">Mon - Sat, 4 PM - 10 PM IST</div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                <Phone size={12} /> After school hours — because yes, we are actual students.
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-neon/15 via-grape/15 to-candy/15 border border-white/15">
              <div className="flex items-center gap-2 font-display font-bold">
                <Zap size={18} className="text-neon" /> Quick order
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {SERVICES.slice(0, 4).map((s) => (
                  <a key={s} href={quick(s)} target="_blank" rel="noreferrer" className="text-xs font-semibold rounded-full glass px-3.5 py-2 hover:bg-white/10 transition">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="glass rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-neon to-grape opacity-20 blur-3xl" />
            <h3 className="font-display text-2xl font-bold relative">Project inquiry form</h3>
            <p className="text-sm text-slate-400 mt-1 relative">Hit send — WhatsApp opens with everything pre-filled.</p>
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-6 relative">
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-400">Your name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rohan Sharma" className="input-glass rounded-xl px-4 py-3 text-sm mt-1.5 w-full" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-400">Mobile number *</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} className="input-glass rounded-xl px-4 py-3 text-sm mt-1.5 w-full" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-400">Service needed</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="input-glass rounded-xl px-4 py-3 text-sm mt-1.5 w-full">
                  {SERVICES.map((s) => <option key={s} value={s} className="bg-[#0b0e1a]">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-400">Budget range</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="input-glass rounded-xl px-4 py-3 text-sm mt-1.5 w-full">
                  {BUDGETS.map((b) => <option key={b} value={b} className="bg-[#0b0e1a]">{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-400">Project details *</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your brand, what you need, and any deadline..." rows={4} className="input-glass rounded-xl px-4 py-3 text-sm mt-1.5 w-full resize-none" />
              </div>
              {error && <div className="sm:col-span-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-400/30 rounded-xl px-4 py-2.5">{error}</div>}
              {sentLink && !error && (
                <div className="sm:col-span-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Saved! WhatsApp should have opened — <a href={sentLink} target="_blank" rel="noreferrer" className="underline font-semibold">tap here if it didn&apos;t</a>.</span>
                </div>
              )}
              <button type="submit" disabled={sending} className="btn-glow sm:col-span-2 rounded-xl px-6 py-3.5 font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60" style={{ color: '#04050c' }}>
                {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={17} />}
                {sending ? 'Sending...' : 'Send via WhatsApp'}
              </button>
              <p className="sm:col-span-2 text-center text-xs text-slate-500">
                Your inquiry is saved with us and WhatsApp opens with your message ready at {WHATSAPP_DISPLAY}.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
