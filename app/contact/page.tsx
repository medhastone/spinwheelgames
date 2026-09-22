'use client';

import React, { useState } from 'react';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import {
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Code,
  School,
  Gift,
  Send,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <SubpageHeader activePage="/contact" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Support &amp; Inquiries
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Contact SpinWheelGames Support
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            Have a question about classroom embedding, custom wheel algorithms, cryptographic fairness, or feature requests? We’re here to help.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] p-6 sm:p-8 rounded-3xl border border-[#eeedf7] dark:border-[#222330] shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
                  Message Received!
                </h2>
                <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Our engineering and community support team responds to inquiries within 24 to 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', category: 'general', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold hover:bg-[#3b3dbb] transition-all cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Professor Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@institution.edu"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-category" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
                  >
                    <option value="general">General Feedback</option>
                    <option value="classroom">Classroom &amp; Education Integration</option>
                    <option value="feature">Feature Request or New Wheel Preset</option>
                    <option value="fairness">Cryptographic Audit &amp; Randomness Question</option>
                    <option value="bug">Bug Report / Canvas Issue</option>
                    <option value="press">Press &amp; Attribution</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your question, request, or feedback..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4648d4] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-[#4648d4] text-white text-[14px] font-bold hover:bg-[#3b3dbb] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQ / Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
              <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                Direct Communication
              </h3>
              <div className="space-y-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
                <p>
                  <strong>General Support:</strong> support@spinwheelgames.org
                </p>
                <p>
                  <strong>Privacy &amp; Compliance:</strong> privacy@spinwheelgames.org
                </p>
                <p>
                  <strong>Security &amp; RNG Auditing:</strong> security@spinwheelgames.org
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
              <h3 className="font-headline text-[16px] font-bold text-[#1a1b22] dark:text-white">
                Frequently Answered Questions
              </h3>
              <div className="space-y-3 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
                <div>
                  <div className="font-bold text-[#1a1b22] dark:text-white">Can I embed this wheel on my site?</div>
                  <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                    Yes! Click &quot;Share / Embed&quot; on any wheel to generate an ad-free, responsive iframe snippet.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-[#1a1b22] dark:text-white">Are student names stored on servers?</div>
                  <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                    No. All rosters and wheel data remain strictly in local browser memory.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330]">
                <Link
                  href="/fairness"
                  className="text-xs font-semibold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
                >
                  <span>Learn about our randomness audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
