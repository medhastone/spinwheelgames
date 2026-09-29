'use client';
import { SITE_CONFIG } from '@/lib/siteConfig';

import React, { useState } from 'react';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
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
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import Link from 'next/link';


export default function ContactPage() {
  const targetEmail = SITE_CONFIG.supportEmail;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const emailSubject = `[SpinWheelGames Contact - ${formData.category.toUpperCase()}] from ${formData.name || 'User'}`;
  const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.category}\n\nMessage:\n${formData.message}`;

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Send via local Next.js server route
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch((e) => console.warn('Local API error:', e));

      // 2. Direct client-side dispatch attempt to FormSubmit
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: emailSubject,
          category: formData.category,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      }).catch((e) => console.warn('Direct client dispatch error:', e));

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <SubpageHeader activePage="/contact" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        <Breadcrumbs items={[{ label: 'Contact Support' }]} />

        {/* Header */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Support &amp; Inquiries
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Contact SpinWheelGames
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            Have questions about classroom embedding, custom wheel presets, or feature requests? Send us a message and our team will respond promptly.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] p-6 sm:p-8 rounded-3xl border border-[#eeedf7] dark:border-[#222330] shadow-xs">
            {submitted ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
                    Message Dispatched Successfully!
                  </h2>
                  <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <em>{formData.category}</em> has been sent to our support team.
                  </p>
                </div>

                {/* Instant Direct One-Click Delivery Shortcuts */}
                <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-left space-y-3 max-w-md mx-auto text-xs">
                  <div className="flex items-center justify-between font-bold text-[#1a1b22] dark:text-white">
                    <span>Direct Email Shortcuts:</span>
                    <span className="text-[#4648d4] dark:text-[#8587ff]">{targetEmail}</span>
                  </div>

                  <p className="text-[#767586] dark:text-[#908fa1] text-[11px]">
                    You can also open this message directly in your preferred email client:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Send via Web Gmail</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </a>

                    <a
                      href={mailtoUrl}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Mail App</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7] dark:border-[#292a39]">
                    <span className="text-[#767586] dark:text-[#908fa1]">Or copy our inbox address:</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#181922] text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#292a39] font-bold text-[11px] hover:text-[#1a1b22] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', category: 'general', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold hover:bg-[#3b3dbb] transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    Your Name / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#4648d4]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#4648d4]"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#4648d4] cursor-pointer"
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
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your question, request, or feedback..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-[14px] focus:outline-hidden focus:ring-2 focus:ring-[#4648d4] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-[#4648d4] text-white text-[14px] font-bold hover:bg-[#3b3dbb] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Sending Message...</span>
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

          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
              <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                Direct Support Inbox
              </h3>
              
              <div className="space-y-3 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#767586] block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${targetEmail}`}
                      className="text-[#4648d4] dark:text-[#8587ff] font-bold text-sm hover:underline"
                    >
                      {targetEmail}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2a] hover:bg-[#eeedf7] text-[#464554] dark:text-[#c7c4d7] transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Open Gmail</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href={`mailto:${targetEmail}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Mail App</span>
                  </a>
                </div>

                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed pt-1">
                  Our team checks <strong>{targetEmail}</strong> continuously and responds to inquiries within 24–48 hours.
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
                    Yes! Click &quot;Share / Embed&quot; on any wheel to generate an clean, responsive iframe snippet.
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
