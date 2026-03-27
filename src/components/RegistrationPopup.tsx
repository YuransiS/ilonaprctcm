"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, CheckCircle2 } from "lucide-react";

interface RegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  telegramLink?: string;
}

export default function RegistrationPopup({ isOpen, onClose, telegramLink = "#" }: RegistrationPopupProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset state on close
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", phone: "" });
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Redirect to Telegram after success animation
        setTimeout(() => {
          window.location.href = telegramLink;
        }, 2000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Помилка при реєстрації. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-cream rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>

            <div className="p-8 md:p-14">
              {!isSuccess ? (
                <>
                  <header className="mb-10 text-center">
                    <h2 className="heading-serif text-3xl md:text-4xl text-charcoal mb-4">
                      Забронювати місце
                    </h2>
                    <p className="text-charcoal-light font-light">
                      Залиште ваші дані, щоб отримати доступ до ефіру та подарунки
                    </p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gold ml-1">
                        Ваше ім'я
                      </label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                        <input
                          required
                          type="text"
                          placeholder="Ілона"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/50 border border-gold/10 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-gold focus:bg-white transition-all text-charcoal"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gold ml-1">
                        Ваш телефон
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                        <input
                          required
                          type="tel"
                          placeholder="+380"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/50 border border-gold/10 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-gold focus:bg-white transition-all text-charcoal"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-primary w-full py-6 mt-4 relative overflow-hidden group shadow-xl shadow-gold/20"
                    >
                      <span className={isSubmitting ? "opacity-0" : ""}>
                        {isSubmitting ? "Надсилаємо..." : "Отримати доступ"}
                      </span>
                      {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-charcoal-light/50 font-light mt-6">
                      Натискаючи на кнопку, ви погоджуєтесь з політикою конфіденційності
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="heading-serif text-3xl text-charcoal mb-4">
                    Дякуємо, місце заброньовано!
                  </h2>
                  <p className="text-charcoal-light font-light mb-10">
                    Наразі ми перенаправимо вас до нашого Telegram-каналу...
                  </p>
                  <div className="w-12 h-px bg-gold/20 animate-pulse" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
