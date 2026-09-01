"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Typewriter } from "@/components/typewriter";
import { MagneticButton } from "@/components/magnetic-button";
import { FaceMorph } from "@/components/face-morph";
import { RevealGlass } from "@/components/reveal-glass";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="flex items-center justify-center px-6 min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl text-center glass glow-accent rounded-3xl p-10 md:p-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 min-h-[1.2em]"
          >
            <Typewriter text="Salom, men Samandar 👋" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted text-lg mb-10"
          >
            IT talabasi, full-stack dasturchi va 3D dizayner. Python, Flutter,
            3ds Max va AutoCAD orqali g'oyalarni haqiqatga aylantiraman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <MagneticButton
              href="/projects"
              className="group flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Loyihalarni ko'rish
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="/cv.pdf"
              className="flex items-center gap-2 border border-border px-6 py-3 rounded-full font-medium hover:bg-card transition-colors"
            >
              <Download size={16} /> CV yuklab olish
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <FaceMorph />

      <section className="px-6 py-24 max-w-3xl mx-auto">
        <RevealGlass>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Men haqimda
          </h2>
          <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
            {`2021-yilda IT sohasiga birinchi qadam qo'yganimda, ekranga chiqqan oddiy print("Hello World") meni hamon esimda qolgan hayajonga to'ldirgan edi. O'shandan beri yo'lim to'xtovsiz davom etmoqda — ustozlarim bo'lsa-da, muammolarni o'zim yechish va o'zim o'rganishga bo'lgan ishtiyoqim meni har doim oldinga yetaklagan.

Bugun Python, Flutter, Java, C++, C# kabi dasturlash tillari bilan bir qatorda, 3ds Max va AutoCAD'da ham professional darajada ishlayman — bu ikkalasi men uchun bir-birini to'ldiradi: kod yozish menga amaliy xulosalar va o'sish beradi, 3D dizayn esa ilhom manbaim va tasavvurimni jonlantiruvchi vositam.

Bog'chalarni raqamlashtirish loyihamdan boshlab, hozirgi portfolio saytimgacha — har bir loyiha meni yangi bosqichga olib chiqadi. Yo'lda muvaffaqiyatsizliklar ham bo'ldi — AgroMarket loyihamni rejasiz boshlaganimda, aniq reja va bosqichma-bosqich yondashuvning qanchalik muhimligini chuqur his qildim.

Kelgusi 1-2 yil ichida o'z jamoam bilan 3-4 ta shaxsiy startap loyihasini muvaffaqiyatli yakunlashni maqsad qilganman — ayniqsa AgriTech yo'nalishida, chunki bu Samarqand agroinnovatsiyalar va tadqiqotlar institutidagi ta'limimga chambarchas bog'liq. Men bilan ishlagan har bir odam bir-birining fikrini hisobga olib, birga rivojlanish tajribasini his qilishini xohlayman.

Agar bitta narsani eslab qolishingizni xohlasam — bu shu: men katta tajribaga ega bo'lib, yaxshi natijalar qildim, va hali ham o'sishda davom etyapman.`}
          </p>
        </RevealGlass>
      </section>
    </main>
  );
}
