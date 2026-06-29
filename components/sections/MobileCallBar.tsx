"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../ui/Icon";
import { site } from "@/lib/site";

export function MobileCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="m-3 flex gap-2 rounded-2xl border border-white/10 bg-night-950 p-2 shadow-lift">
            <a
              href={site.phoneHref}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3 font-bold text-white transition-colors active:bg-white/20"
            >
              <Icon name="Phone" className="h-4 w-4 text-brand-300" /> Call
            </a>
            <a
              href="#quote"
              className="flex flex-[1.4] items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-bold text-white transition-colors active:bg-brand-500"
            >
              <Icon name="Sparkles" className="h-4 w-4" /> Free Quote
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
