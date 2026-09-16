import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { waLink } from '../lib/site';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
};

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch((e) => console.error('projects fetch failed', e))
      .finally(() => setLoading(false));
  }, []);

  const cats = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="Our work"
          title={<>Fresh work, <span className="text-gradient">fresh energy</span></>}
          sub="A peek at the websites, brand kits and video openers we have crafted for brands like yours."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === c
                  ? 'bg-gradient-to-r from-neon to-grape text-[#04050c]'
                  : 'glass text-slate-300 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-300 gap-2">
            <Loader2 className="animate-spin" size={22} /> Loading our work...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass rounded-3xl overflow-hidden card-hover group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04050c] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass-strong rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-neon">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl sm:text-2xl font-bold">Like what you see? Your brand could be next.</div>
            <div className="text-slate-400 text-sm mt-1">Send us your idea on WhatsApp — we reply within a few hours.</div>
          </div>
          <a href={waLink('Hi Pixel Teenz! I loved your portfolio. I have a project idea to discuss.')} target="_blank" rel="noreferrer" className="btn-glow inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold whitespace-nowrap" style={{ color: '#04050c' }}>
            Start my project <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
