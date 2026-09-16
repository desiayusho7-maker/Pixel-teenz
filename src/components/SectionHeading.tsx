import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  kicker: string;
  title: ReactNode;
  sub?: string;
};

export default function SectionHeading({ kicker, title, sub }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-neon">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon to-candy animate-pulse" />
        {kicker}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-5 leading-tight">
        {title}
      </h2>
      {sub && <p className="text-slate-300/80 mt-4 text-base sm:text-lg">{sub}</p>}
    </motion.div>
  );
}
