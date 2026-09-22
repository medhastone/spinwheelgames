import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQS_DATA = [
  {
    question: 'Is this wheel truly random and fair for giveaways and prize draws?',
    answer:
      'Yes, 100%. SpinWheelGames.org utilizes the Web Cryptography API (crypto.getRandomValues), the highest standard of hardware and thermal pseudo-randomness available in modern browsers. It generates cryptographically secure entropy, rendering results mathematically impossible to predict, skew, or bias.'
  },
  {
    question: 'How many items or names can I put on one wheel?',
    answer:
      'You can add anywhere from 2 up to 500 options on a single wheel! When you exceed 50 items, our canvas engine dynamically adjusts slice widths, radial text scaling, and micro-tick markers to maintain a steady 60 FPS animation without browser lag.'
  },
  {
    question: 'Can I save custom wheels and share them via link with others?',
    answer:
      'Absolutely! When you click "Share / Embed", your wheel options, custom color themes, and duration settings are encoded directly into a shareable URL hash. No account creation or external database is required—the link itself faithfully reconstructs your wheel configuration.'
  },
  {
    question: 'Can I embed this wheel on my classroom site, blog, or LMS?',
    answer:
      'Yes! You can use our responsive, ad-free iframe snippet that automatically adjusts to mobile, tablet, and desktop screens with zero third-party tracking scripts or cookie walls.'
  },
  {
    question: 'Can I weight different options with custom odds or probabilities?',
    answer:
      'Yes! With Weighted Mode enabled, you can assign custom integer or decimal weights to any slice. The wheel mathematically scales slice angles and probability distributions proportional to the sum of all slice weights.'
  },
  {
    question: 'Does this work offline without an active internet connection?',
    answer:
      'Yes! All calculations, audio synthesis, CSPRNG algorithms, and rendering happen locally on your device. Once loaded, you can spin offline without any external API calls.'
  }
];

export default function FaqSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-y border-[#eeedf7] dark:border-[#222330]" id="faqs">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h2 className="font-headline text-[26px] sm:text-[34px] font-bold text-[#1a1b22] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#464554] dark:text-[#c7c4d7] mt-1">
            Everything you need to know about entropy, provable fairness, custom odds, and embeds.
          </p>
        </div>

        <div className="flex flex-col gap-3.5" id="faq-container">
          {FAQS_DATA.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl bg-white dark:bg-[#1d1e28] p-5 shadow-xs border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4]/40 transition-all cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4 font-headline text-[15px] sm:text-[17px] font-bold text-[#1a1b22] dark:text-white list-none select-none">
                <span>{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff] transition-transform duration-200 shrink-0 group-open:rotate-180" />
              </summary>
              <div className="mt-3.5 text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed pt-3 border-t border-[#eeedf7] dark:border-[#292a39]">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
