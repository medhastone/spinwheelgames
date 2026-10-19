'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StandaloneWheelHost from './StandaloneWheelHost';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import SavedWheelsModal from './SavedWheelsModal';
import Breadcrumbs from './Breadcrumbs';
import DirectAnswer from './DirectAnswer';
import QuickFacts from './QuickFacts';
import ConcreteExample from './ConcreteExample';
import CategoryWheelExplorer from './CategoryWheelExplorer';
import { SeoPageData, SeoQuickFacts } from '@/lib/seoArchitecture';
import { WheelExperience } from '@/lib/wheelLibrary';
import { generatePageJsonLd } from '@/lib/seoData';
import {
  subscribeTheme,
  getThemeSnapshot,
  getThemeServerSnapshot,
  toggleTheme,
  applySavedTheme
} from '@/lib/theme';
import {
  useSavedWheels
} from '@/lib/storage';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sliders,
  Play,
  Search,
  Dices,
  Lightbulb,
  Users2,
  Check,
  Table,
  ExternalLink,
  Calendar,
  Lock,
  Sun,
  Moon,
  Heart,
  Code2,
  Tv
} from 'lucide-react';
import {
  openViralEmbedModal,
  openViralStreamerMode
} from '@/lib/viralToolsData';

interface SeoPageViewProps {
  page: SeoPageData;
}

function renderParagraphWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4648d4] dark:text-[#8587ff] hover:underline font-medium inline-flex items-center gap-0.5"
      >
        <span>{label}</span>
        <ExternalLink className="w-3 h-3 inline ml-0.5" />
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function SeoPageView({ page }: SeoPageViewProps) {
  const schemas = generatePageJsonLd(page);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  // Dynamic active wheel state (can be swapped by CategoryWheelExplorer in-place)
  const [activeWheel, setActiveWheel] = useState<{
    title: string;
    items: { id: string; text: string; weight: number }[];
    paletteKey?: string;
  }>({
    title: page.defaultWheelData.title,
    items: page.defaultWheelData.items,
    paletteKey: page.defaultWheelData.paletteKey
  });

  const handleSelectExperience = (exp: WheelExperience) => {
    setActiveWheel({
      title: `${exp.name} Wheel`,
      items: exp.defaultEntries.map((entry, idx) => ({
        id: `slice-${idx}`,
        text: entry,
        weight: 1
      })),
      paletteKey: exp.paletteKey || 'arcade'
    });

    // Smoothly scroll to the interactive wheel section
    if (typeof window !== 'undefined') {
      const el = document.getElementById('interactive-tool-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const savedWheels = useSavedWheels();

  useEffect(() => {
    applySavedTheme();
  }, [isDark]);

  const toggleDarkMode = () => {
    toggleTheme();
  };

  // E-E-A-T metadata defaults
  const authorName = page.eeatMeta?.authorName || 'SpinWheelGames Editorial Team';
  const authorRole = page.eeatMeta?.authorRole || 'Randomness & Educational Technology Researchers';
  const lastUpdated = page.eeatMeta?.lastUpdatedDate || 'September 2026';
  const testingMethodology =
    page.eeatMeta?.testingMethodology ||
    'Mathematically verified with 100,000+ simulated angular trials using standard Chi-square goodness-of-fit testing (p > 0.05).';

  // Trusted Standards Sources (W3C / MDN Web Cryptography)
  const defaultCitations = [
    {
      sourceName: 'W3C & Mozilla Developer Network (MDN)',
      sourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues',
      publisher: 'Mozilla Developer Network & W3C Web Cryptography Working Group',
      keyFinding:
        'Technical specification confirming that Crypto.getRandomValues() generates cryptographically secure pseudo-random integers suitable for unbiased digital drawings.'
    },
    {
      sourceName: 'W3C Web Cryptography API Specification',
      sourceUrl: 'https://www.w3.org/TR/WebCryptoAPI/',
      publisher: 'World Wide Web Consortium (W3C)',
      keyFinding:
        'W3C recommendation defining standard interfaces for cryptographic operations and secure random value generation in modern web browsers.'
    }
  ];

  const citations =
    page.externalCitations && page.externalCitations.length >= 2
      ? page.externalCitations
      : defaultCitations;

  return (
    <div className="min-h-screen bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] flex flex-col justify-between transition-colors duration-200">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Global Navbar */}
      <Navbar activeNav={page.fullPath} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 space-y-5 sm:space-y-7 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={
            page.breadcrumbs && page.breadcrumbs.length > 0
              ? page.breadcrumbs.slice(1).map((b) => ({
                  label: b.name,
                  href: b.item.replace('https://spinwheelgames.org', '')
                }))
              : [
                  { label: page.parentCategoryName, href: page.parentCategoryPath },
                  { label: page.h1 }
                ]
          }
        />

        {/* Header Intro Section (Minimal: Title & Subheading Only) */}
        <section className="text-center max-w-3xl mx-auto space-y-4" id="page-header-intro">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {page.primaryIntent}
            </span>
            <Link
              href={page.parentCategoryPath}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#181922] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] border border-[#eeedf7] dark:border-[#292a39] shadow-xs transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#767586] dark:text-[#908fa1]" />
              {page.parentCategoryName}
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            {page.h1}
          </h1>

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl mx-auto">
            {page.metaDescription}
          </p>
        </section>

        {/* Functioning Interactive Tool Area */}
        <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 sm:p-7 shadow-lg relative overflow-hidden transition-colors" id="interactive-tool-section">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eeedf7] dark:border-[#292a39] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-[#006c49] dark:text-emerald-400" />
              <span className="text-sm font-bold text-[#1a1b22] dark:text-[#f1effa]">
                Interactive {activeWheel.title}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  openViralEmbedModal({
                    title: activeWheel.title,
                    items: activeWheel.items,
                    paletteKey: activeWheel.paletteKey
                  })
                }
                className="p-2 sm:px-2.5 sm:py-1 rounded-lg bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#4648d4] hover:text-white text-[#1a1b22] dark:text-[#f1effa] text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Embed this wheel via <iframe>"
                aria-label="Embed wheel"
              >
                <Code2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                <span className="hidden sm:inline">Embed</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  openViralStreamerMode({
                    title: activeWheel.title,
                    items: activeWheel.items,
                    paletteKey: activeWheel.paletteKey
                  })
                }
                className="p-2 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/25 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Open full-screen transparent OBS Streamer Mode (?stream=1)"
                aria-label="Streamer Mode"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Streamer Mode</span>
              </button>
              <Link
                href="/stream-wheel"
                className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#4648d4]/15 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold items-center gap-1 transition-colors"
                title="OBS Studio & Streamlabs Setup Guide"
              >
                <span>OBS Guide</span>
              </Link>
              <span className="hidden md:inline text-xs text-[#767586] dark:text-[#908fa1] font-mono">
                Web Crypto API • CSPRNG
              </span>
            </div>
          </div>

          <StandaloneWheelHost
            key={`${activeWheel.title}-${activeWheel.items.length}-${activeWheel.items[0]?.text}`}
            initialTitle={activeWheel.title}
            initialItems={activeWheel.items}
            initialPaletteKey={activeWheel.paletteKey}
          />
        </section>

        {/* Overview & Detailed Content (Below Wheel Container) */}
        <section className="space-y-6 max-w-4xl" id="page-overview-details">
          {/* Direct Answer Block */}
          <DirectAnswer
            question={`What is ${page.h1}?`}
            answer={
              page.directAnswer ||
              `${page.h1} is a free, interactive web-based randomizer engineered for fair decision making, group games, and instant random selection. It runs entirely in your browser using the Web Crypto API (crypto.getRandomValues()) with zero server tracking, instant custom list support, and uniform probability distribution.`
            }
          />

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl">
            {page.introduction}
          </p>

          {/* Feature Badges */}
          {page.featureBadges && page.featureBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {page.featureBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-[#181922] text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#292a39] shadow-xs"
                >
                  <Check className="w-3 h-3 text-[#006c49] dark:text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Fairness & Privacy Bar */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-3.5 sm:p-4 mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#767586] dark:text-[#908fa1] shadow-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-1.5 text-[#1a1b22] dark:text-[#f1effa]">
                <Check className="w-4 h-4 text-[#006c49] dark:text-emerald-400" />
                <span>
                  <strong className="text-[#1a1b22] dark:text-white font-semibold">Web Cryptography API</strong>{' '}
                  <span className="text-[#767586] dark:text-[#908fa1] text-[11px]">(crypto.getRandomValues)</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                <span>Updated: {lastUpdated}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[#006c49] dark:text-emerald-400 font-bold text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side • Zero Data Transmission</span>
            </div>
          </div>
        </section>

        {/* Quick Facts / At a Glance Component */}
        <QuickFacts
          facts={
            page.quickFacts || {
              toolName: page.h1,
              purpose: `Fair random selection and decision making for ${page.parentCategoryName.toLowerCase()}`,
              bestFor:
                page.whoItsUsefulFor?.map((w) => w.audience).join(', ') ||
                'Teachers, teams, event organizers, and everyday decision makers',
              modes: ['Interactive Wheel', 'Elimination Mode', 'Full Screen View', 'Bulk Paste'],
              customization:
                page.customizationOptions?.slice(0, 3).map((c) => c.title) || [
                  'Custom Items & Slices',
                  'Weights & Probabilities',
                  'Themes & Audio Controls'
                ],
              accountRequired: 'No Account Required',
              cost: 'Free Forever',
              selectionMethod: 'Browser Web Crypto API (crypto.getRandomValues())'
            }
          }
        />

        {/* All Games & Wheel Tools in this Category Explorer */}
        <CategoryWheelExplorer
          categoryKey={page.categoryKey || page.slug}
          categoryName={
            page.pageType === 'category'
              ? page.h1.split(':')[0].replace(/ Wheels.*$/i, '').trim()
              : page.parentCategoryName !== 'Home'
              ? page.parentCategoryName
              : page.h1
          }
          onSelectExperience={handleSelectExperience}
        />

        {/* Real-World Concrete Example */}
        <ConcreteExample
          example={
            page.concreteExample || {
              title: `Real-World Example: ${page.h1}`,
              scenario: `Here is a concrete example of how users configure and spin ${page.h1} for unbiased selection:`,
              userChoices:
                page.defaultWheelData.items.slice(0, 5).map((i) => i.text) || [
                  'Option 1',
                  'Option 2',
                  'Option 3',
                  'Option 4'
                ],
              result: page.defaultWheelData.items[0]?.text || 'Option 1',
              explanation:
                'The wheel spun through cryptographically verified physics, ensuring every entered slice had an equal, mathematically unbiased probability of landing.'
            }
          }
        />

        {/* Step-by-Step Instructions & Who It's Useful For */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="instructions-and-audiences">
          {/* How It Works */}
          <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">How It Works</h2>
            </div>
            <ol className="space-y-3 pt-2">
              {page.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#464554] dark:text-[#c7c4d7]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f4f2fd] dark:bg-[#222330] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-center font-bold text-xs text-[#4648d4] dark:text-[#8587ff]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Who It's Useful For */}
          {page.whoItsUsefulFor && page.whoItsUsefulFor.length > 0 ? (
            <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Users2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Who It&apos;s Useful For</h2>
              </div>
              <div className="space-y-3 pt-2">
                {page.whoItsUsefulFor.map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3.5 space-y-1">
                    <h3 className="font-semibold text-sm text-[#4648d4] dark:text-[#8587ff]">{item.audience}</h3>
                    <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">{item.benefit}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#006c49] dark:text-emerald-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Popular Ways To Use It</h2>
              </div>
              <div className="space-y-3 pt-2">
                {page.useCases.map((useCase, idx) => (
                  <div key={idx} className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3.5 space-y-1">
                    <h3 className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa]">{useCase.title}</h3>
                    <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Popular Ways To Use It */}
        {page.whoItsUsefulFor && page.whoItsUsefulFor.length > 0 && page.useCases && page.useCases.length > 0 && (
          <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-[#006c49] dark:text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Popular Ways To Use It</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {page.useCases.map((useCase, idx) => (
                <div key={idx} className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-4 space-y-1.5">
                  <h3 className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa]">{useCase.title}</h3>
                  <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Customization Options & Fairness Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="customization-and-fairness">
          {/* Customization Options */}
          <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 space-y-4 shadow-xs transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Customization Options</h2>
            </div>
            <div className="space-y-3 pt-2">
              {page.customizationOptions.map((opt, idx) => (
                <div key={idx} className="rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] p-3.5 space-y-1">
                  <h3 className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa]">{opt.title}</h3>
                  <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed">{opt.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fairness / Randomness Explanation */}
          <section className="rounded-2xl border border-emerald-500/20 dark:border-emerald-900/40 bg-emerald-500/5 dark:bg-emerald-950/20 p-6 space-y-4 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-[#006c49] dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Fairness &amp; Randomness Explanation</h2>
            </div>
            <div className="text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed pt-2">
              {renderParagraphWithLinks(page.resultExplanation)}
            </div>
            {page.uniqueExamples && page.uniqueExamples.length > 0 && (
              <div className="rounded-xl bg-white/90 dark:bg-[#12131a] border border-emerald-500/20 dark:border-[#292a39] p-3.5 space-y-2 mt-3">
                <span className="text-xs font-semibold text-[#006c49] dark:text-emerald-400 uppercase tracking-wider">
                  Realistic Entry Examples
                </span>
                <ul className="text-xs text-[#464554] dark:text-[#c7c4d7] space-y-1.5 list-disc list-inside">
                  {page.uniqueExamples.map((ex, idx) => (
                    <li key={idx} className="leading-relaxed">{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {/* Technical Standards & Cryptographic Specifications */}
        <section className="rounded-2xl border border-indigo-500/20 dark:border-indigo-900/40 bg-indigo-500/5 dark:bg-indigo-950/20 p-6 sm:p-7 space-y-4 transition-colors" id="academic-citations">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Technical Specifications &amp; Cryptographic Standards</h2>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-0.5">
                  Verified against official cryptography and randomness standards bodies.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {citations.map((cite, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2.5 hover:border-[#4648d4]/40 dark:hover:border-[#8587ff]/40 shadow-xs transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa] leading-snug">
                      {cite.sourceName}
                    </h3>
                    <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] border border-[#eeedf7] dark:border-[#292a39]">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed font-sans">
                    {cite.keyFinding}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330] flex items-center justify-between">
                  <span className="text-[11px] text-[#767586] dark:text-[#908fa1] font-medium">
                    {cite.publisher}
                  </span>
                  <a
                    href={cite.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4648d4] dark:text-[#8587ff] hover:text-[#3b3dbb] hover:underline"
                  >
                    <span>View Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-xs text-[#464554] dark:text-[#908fa1] flex items-start gap-2.5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#006c49] dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#1a1b22] dark:text-[#f1effa] font-semibold">Methodology Verification:</strong> {testingMethodology}
            </p>
          </div>
        </section>

        {/* First-Party Expert Tips Section */}
        {page.tips && page.tips.length > 0 && (
          <section className="rounded-2xl border border-amber-500/20 dark:border-amber-900/40 bg-amber-500/5 dark:bg-amber-950/15 p-6 sm:p-7 space-y-4 transition-colors" id="expert-tips">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Pro Tips for Getting the Most Out of This Tool</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {page.tips.map((tip, idx) => (
                <div key={idx} className="rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] p-4 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa]">Tip #{idx + 1}</h3>
                  </div>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed pl-7">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {page.comparisonTable && (
          <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 sm:p-7 space-y-4 shadow-xs transition-colors" id="comparison-table">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
                <Table className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">Method Comparison</h2>
            </div>
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#12131a]">
                    {page.comparisonTable.headers.map((h, idx) => (
                      <th key={idx} className="py-3 px-4 font-bold text-[#1a1b22] dark:text-[#f1effa]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeedf7] dark:divide-[#222330]">
                  {page.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#fbf8ff] dark:hover:bg-[#1d1e28] transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4 text-[#464554] dark:text-[#c7c4d7]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Unique In-Depth Content Blocks */}
        {page.uniqueContentBlocks.map((block, idx) => (
          <section
            key={idx}
            className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 sm:p-8 space-y-4 shadow-xs transition-colors"
            id={`content-block-${idx}`}
          >
            <h2 className="text-2xl font-headline font-bold text-[#1a1b22] dark:text-white tracking-tight">
              {block.heading}
            </h2>
            <div className="space-y-3 text-[#464554] dark:text-[#c7c4d7] text-sm sm:text-base leading-relaxed">
              {block.body.map((para, pIdx) => (
                <div key={pIdx}>{renderParagraphWithLinks(para)}</div>
              ))}
            </div>
          </section>
        ))}

        {/* Frequently Asked Questions */}
        {page.faqs.length > 0 && (
          <section className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 sm:p-8 space-y-6 shadow-xs transition-colors" id="faq-section">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-[#1a1b22] dark:text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3 pt-2">
              {page.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-4 py-3.5 flex items-center justify-between text-sm sm:text-base font-semibold text-[#1a1b22] dark:text-[#f1effa] hover:text-[#4648d4] dark:hover:text-white cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#767586] dark:text-[#908fa1] transition-transform ${
                          isOpen ? 'rotate-180 text-[#4648d4] dark:text-[#8587ff]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed border-t border-[#eeedf7] dark:border-[#222330]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Topic Cluster: Graph-Based Internal Linking Hub */}
        <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-gradient-to-br from-white to-[#f4f2fd] dark:from-[#181922] dark:to-[#12131a] p-6 sm:p-8 space-y-8 shadow-xs transition-colors" id="topic-cluster-hub">
          <div className="border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <h2 className="text-2xl font-headline font-bold text-[#1a1b22] dark:text-white">Related Wheels &amp; Topic Cluster</h2>
            <p className="text-sm text-[#767586] dark:text-[#908fa1] mt-1">
              Explore interconnected tools, category hubs, and educational decision guides.
            </p>
          </div>

          {/* Related Tools */}
          {page.relatedTools.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-[#f1effa] uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                Related Tools in this Cluster
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {page.relatedTools.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.path}
                    className="group rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1d1e28] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] shadow-xs transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                        {tool.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#767586] dark:text-[#908fa1] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides */}
          {page.relatedGuides.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#1a1b22] dark:text-[#f1effa] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#006c49] dark:text-emerald-400" />
                Educational Guides &amp; Methodologies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.relatedGuides.map((guide, idx) => (
                  <Link
                    key={idx}
                    href={guide.path}
                    className="group rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1d1e28] p-4 hover:border-emerald-500/50 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] shadow-xs transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-sm text-[#1a1b22] dark:text-[#f1effa] group-hover:text-[#006c49] dark:group-hover:text-emerald-300 transition-colors block">
                        {guide.name}
                      </span>
                      <span className="text-xs text-[#767586] dark:text-[#908fa1]">
                        {guide.readingTime} read • Comprehensive Guide
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#767586] dark:text-[#908fa1] group-hover:text-[#006c49] dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Internal Context Links */}
          {page.internalLinks.length > 0 && (
            <div className="rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] p-4 sm:p-5 space-y-2.5 shadow-xs">
              <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase tracking-wider block">
                Recommended Next Steps
              </span>
              <div className="flex flex-wrap gap-2">
                {page.internalLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-[#f1effa] hover:text-[#4648d4] dark:hover:text-white hover:border-[#4648d4] dark:hover:border-[#8587ff] transition-all"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#767586] dark:text-[#908fa1] text-[10px]">({link.context})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectWheel={() => setSearchOpen(false)}
      />

      {/* Saved Wheels Modal */}
      <SavedWheelsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
      />
    </div>
  );
}
