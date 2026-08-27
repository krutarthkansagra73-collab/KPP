import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';

export const FutureVersionUs: React.FC = () => {
  const { config } = useMemory();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E5E2D9] text-center">
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 12 • The Future
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          The Future Version Of Us
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E2D9] shadow-xl space-y-6 text-base sm:text-lg text-[#5A5A40] max-w-2xl mx-auto"
      >
        <p className="font-light text-[#7C7A68]">
          One day…
        </p>

        <p className="text-[#2D2D2A]">
          We’ll look back at these photographs and laugh at how young we were.
        </p>

        <div className="space-y-2 text-[#7C7A68] text-sm sm:text-base italic">
          <p>We’ll remember the stupid things.</p>
          <p>The family functions.</p>
          <p>The arguments over snacks and remotes.</p>
          <p>The random photographs.</p>
          <p>The days when we thought we had everything figured out.</p>
        </div>

        <p className="text-[#B85D43] font-serif-title text-xl sm:text-2xl font-medium pt-2">
          And hopefully… We’ll still be doing this.
        </p>

        <div className="pt-2">
          <p className="font-serif-title text-2xl sm:text-3xl text-[#2D2D2A] font-bold">
            Three people. Older.
          </p>
          <p className="font-handwriting text-3xl sm:text-4xl text-[#B85D43]">
            Hopefully wiser. 😂 But still us.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
