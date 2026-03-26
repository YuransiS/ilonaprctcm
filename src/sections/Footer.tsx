"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-20 md:py-32 bg-charcoal text-white relative overflow-hidden" id="footer">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(196,149,106,0.1),transparent_70%)] pointer-events-none" />

      <div className="container-custom relative z-10 flex flex-col items-center gap-16 md:gap-24">
        
        {/* Branding & Socials Container */}
        <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-start text-center md:text-left gap-16">
          <div className="flex flex-col gap-8 flex-1">
            <h3 className="heading-serif text-3xl md:text-4xl text-white">
              ХОЧЕШ ВІД ЧОЛОВІКА БІЛЬШЕ?
            </h3>
            <p className="max-w-md text-lg md:text-xl font-light opacity-50 text-white leading-relaxed">
              Місія проекту — допомогти жінкам створювати здорові та щасливі стосунки, що базуються на любові та взаємоповазі.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-12 md:gap-24 flex-1">
             <div className="flex flex-col items-center md:items-start gap-6">
                <span className="text-xs tracking-[0.4em] uppercase text-gold font-bold">Навігація</span>
                <nav className="flex flex-col items-center md:items-start gap-4">
                  <a href="#hero" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Про нас</a>
                  <a href="#what-to-expect" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Програма</a>
                  <a href="#faq" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">FAQ</a>
                </nav>
             </div>

             <div className="flex flex-col items-center md:items-start gap-6">
                <span className="text-xs tracking-[0.4em] uppercase text-gold font-bold">Соціальні мережі</span>
                <nav className="flex flex-col items-center md:items-start gap-4">
                  <a href="#" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Instagram</a>
                  <a href="#" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">TikTok</a>
                  <a href="#" className="text-sm md:text-base opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Telegram</a>
                </nav>
             </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/5 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-[10px] md:text-xs tracking-[0.2em] font-normal opacity-30 uppercase">
             <span>© {currentYear} ILONA PRCTCM</span>
             <a href="#" className="hover:text-gold transition-colors">Політика конфіденційності</a>
             <a href="#" className="hover:text-gold transition-colors">Договір оферти</a>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold opacity-20 uppercase">DESIGNED BY</span>
            <span className="text-xs md:text-sm font-serif italic text-gold font-bold">B&W Prod.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
