import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, GraduationCap, Heart, Instagram, Loader2, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { FOUNDER_NAME, FOUNDER_AGE, FOUNDER_INSTAGRAM, INSTAGRAM_URL } from '../lib/site';

type Member = {
  id: number;
  name: string;
  role: string;
  age: number;
  bio: string;
  instagram: string | null;
  skills: string[];
};

const FACTS = [
  { icon: Cake, text: `${FOUNDER_AGE} years old and already shipping for real brands` },
  { icon: GraduationCap, text: 'Student by day, designer & editor by night' },
  { icon: Heart, text: 'Started Pixel Teenz to make big design affordable' },
];

export default function Founder() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then((r) => r.json())
      .then((d) => setTeam(Array.isArray(d) ? d : []))
      .catch((e) => console.error('team fetch failed', e))
      .finally(() => setLoading(false));
  }, []);

  const founder = team.find((m) => m.role.toLowerCase().includes('founder')) || team[0];
  const crew = team.filter((m) => m !== founder);
  const nameParts = FOUNDER_NAME.split(' ');

  return (
    <section id="founder" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="Meet the teens"
          title={<>Young team, <span className="text-gradient">serious skills</span></>}
          sub="We are students who live on the internet — so we know exactly what makes brands stop the scroll."
        />

        {loading ? (
          <div className="flex items-center justify-center py-14 text-slate-300 gap-2">
            <Loader2 className="animate-spin" size={22} /> Loading the crew...
          </div>
        ) : (
          <>
            {founder && (
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="glass rounded-[2rem] p-7 sm:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-center relative overflow-hidden"
              >
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-neon to-grape opacity-20 blur-3xl" />
                <div className="relative mx-auto md:mx-0">
                  <div className="h-44 w-44 sm:h-52 sm:w-52 rounded-[2rem] bg-gradient-to-br from-neon via-grape to-candy p-[3px] shadow-[0_16px_60px_-16px_rgba(34,211,238,0.6)]">
                    <div className="h-full w-full rounded-[calc(2rem-3px)] bg-[#0b0e1a] flex flex-col items-center justify-center">
                      <span className="font-display text-6xl font-bold text-gradient">A</span>
                      <span className="text-xs text-slate-400 mt-1 tracking-widest uppercase">Founder</span>
                    </div>
                  </div>
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-neon to-grape px-4 py-1 text-xs font-bold inline-flex items-center gap-1" style={{ color: '#04050c' }}>
                    <Sparkles size={12} /> Age {FOUNDER_AGE}
                  </span>
                </div>
                <div className="relative text-center md:text-left">
                  <div className="font-display text-3xl sm:text-4xl font-bold">
                    {nameParts[0]} <span className="text-gradient">{nameParts[1] || ''}</span>
                  </div>
                  <div className="text-neon font-semibold mt-1">{founder.role}</div>
                  <p className="text-slate-300/90 mt-4 leading-relaxed max-w-2xl">{founder.bio}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-4">
                    {founder.skills.map((s) => (
                      <span key={s} className="text-xs rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5 text-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 transition shadow-lg">
                      <Instagram size={18} /> @{FOUNDER_INSTAGRAM}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {FACTS.map((f, i) => (
                <motion.div key={f.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-5 flex items-start gap-3">
                  <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-grape to-candy flex items-center justify-center shrink-0">
                    <f.icon size={19} className="text-white" />
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>

            {crew.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {crew.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-3xl p-6 card-hover">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neon to-grape flex items-center justify-center font-display text-2xl font-bold" style={{ color: '#04050c' }}>
                      {m.name.charAt(0)}
                    </div>
                    <div className="font-display text-xl font-bold mt-4">
                      {m.name} <span className="text-sm font-medium text-slate-400">• {m.age}</span>
                    </div>
                    <div className="text-neon text-sm font-semibold">{m.role}</div>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{m.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {m.skills.map((s) => (
                        <span key={s} className="text-[11px] rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
