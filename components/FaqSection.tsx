import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQS_DATA = [
  {
    question: 'What is SpinWheelGames?',
    answer:
      'SpinWheelGames is an online decision engine and random picker platform. It helps you pick names, choose food, split teams, make decisions, play wheel games, and run giveaways for free.'
  },
  {
    question: 'Is the wheel free to use?',
    answer:
      'Yes, 100% free with no forced registration, premium paywalls, or hidden limits on spins.'
  },
  {
    question: 'Can I create my own wheel?',
    answer:
      'Yes. You can enter custom names, choices, or items, customize slice colors, assign weights, enable elimination mode, and save or share your wheel link.'
  },
  {
    question: 'Can I pick a random name?',
    answer:
      'Yes. Use our Wheel of Names or Random Name Picker tools to draw random names for raffles, classroom calling, or contest winners.'
  },
  {
    question: 'Can I remove a winner after spinning?',
    answer:
      'Yes. You can enable Elimination mode or click "Hide/Remove Winner" on the result modal to remove selected items for subsequent spins.'
  },
  {
    question: 'Can I share a wheel?',
    answer:
      'Yes. Click "Share Link" to generate a unique shareable URL that preserves your custom options, colors, and settings.'
  },
  {
    question: 'How are random results selected?',
    answer:
      'SpinWheelGames uses your browser’s built-in Web Crypto API (crypto.getRandomValues) to select unbiased random results locally on your device.'
  },
  {
    question: 'Can I use the wheel in a classroom?',
    answer:
      'Yes. It is widely used by educators for cold-calling students, assigning groups, picking presentation orders, and running review activities.'
  }
];

interface FaqSectionProps {
  title?: string;
  description?: string;
  faqs?: { question: string; answer: string }[];
}

export default function FaqSection({ title = "Frequently Asked Questions", description = "Everything you need to know about entropy, provable fairness, custom odds, and embeds.", faqs = FAQS_DATA }: FaqSectionProps) {
  return (
    <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-y border-[#eeedf7] dark:border-[#222330]" id="faqs">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h2 className="font-headline text-[26px] sm:text-[34px] font-bold text-[#1a1b22] dark:text-white">
            {title}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#464554] dark:text-[#c7c4d7] mt-1">
            Everything you need to know about entropy, provable fairness, custom odds, and embeds.
          </p>
        </div>

        <div className="flex flex-col gap-3.5" id="faq-container">
          {faqs.map((faq, index) => (
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
