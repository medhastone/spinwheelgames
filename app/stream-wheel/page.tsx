import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import {
  Tv,
  Radio,
  Keyboard,
  Volume2,
  Sliders,
  ShieldCheck,
  Dices,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { createPageMetadata } from '@/lib/pageMetadata';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';

// Title is 55 characters (< 60 chars requirement)
const PAGE_TITLE = 'OBS Streamer Mode Wheel & Dice Overlay | SpinWheelGames';
const PAGE_DESCRIPTION =
  'Add a transparent spin wheel, giveaway winner picker, or 3D/2D dice roller overlay to OBS Studio and Streamlabs via Browser Source (?stream=1) with live remote control.';

export const metadata: Metadata = createPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/stream-wheel',
  keywords: [
    'stream wheel overlay',
    'obs spin wheel browser source',
    'transparent wheel overlay obs',
    'streamlabs giveaway wheel',
    'obs dice roller overlay',
    'streamer mode wheel of names',
    'twitch giveaway wheel overlay'
  ]
});

const SUPPORTED_PARAMS = [
  {
    param: '?stream=1',
    values: '1',
    defaultVal: 'Off',
    description:
      'Activates Streamer Mode: hides all page chrome (header, nav, footer, SEO text, FAQs) and sets html/body background to 100% transparent alpha.'
  },
  {
    param: '?id=<session>',
    values: 'Alphanumeric token',
    defaultVal: 'Auto-generated',
    description:
      'Pairs the OBS Browser Source with the live /stream-control?id=<session> remote control deck for cross-tab and cross-device triggers.'
  },
  {
    param: '?entries=A,B,C',
    values: 'Comma or | list',
    defaultVal: 'Tool default',
    description:
      'Preloads up to 200 custom wheel entries (max 80 characters per label, strictly sanitized against HTML/XSS) directly from the URL.'
  },
  {
    param: '?size=sm|md|lg',
    values: 'sm, md, lg',
    defaultVal: 'md',
    description:
      'Scales the wheel or dice canvas and result typography for corner webcam overlays (sm), standard scenes (md), or full-screen 1080p reveals (lg).'
  },
  {
    param: '?theme=light|dark',
    values: 'light, dark',
    defaultVal: 'dark',
    description:
      'Switches the winner banner, history card, and dice badges between high-contrast Dark Neon and Light Crisp themes.'
  },
  {
    param: '?labels=outline',
    values: 'outline, normal',
    defaultVal: 'outline',
    description:
      'Adds a high-contrast black stroke outline and drop shadow around slice labels and result text so every label reads cleanly over bright gameplay.'
  },
  {
    param: '?sound=0|1',
    values: '0, 1',
    defaultVal: '1 (Moderate)',
    description:
      'Controls Web Audio tick and fanfare synthesis routed through the OBS Browser Source audio mixer. Set ?sound=0 for silent overlays.'
  },
  {
    param: '?removewinner=1',
    values: '0, 1',
    defaultVal: '0',
    description:
      'Automatically eliminates each winning slice after a spin completes so giveaway and raffle draws never repeat a previous winner.'
  },
  {
    param: '?winnerseconds=5',
    values: '0–60 (seconds)',
    defaultVal: '5',
    description:
      'Number of seconds the large winner or dice total banner stays visible before auto-clearing. Set ?winnerseconds=0 to keep until manually reset.'
  },
  {
    param: '?history=1',
    values: '0, 1',
    defaultVal: '0',
    description:
      'Displays a compact on-screen history card in the top-left corner listing the most recent winners or dice roll totals.'
  },
  {
    param: '?autospin=1',
    values: '0, 1',
    defaultVal: '0',
    description:
      'Automatically triggers one wheel spin or dice roll 450ms after the browser source loads—ideal for OBS scene-switch stingers and automated alerts.'
  },
  {
    param: '?quality=low',
    values: 'high, low',
    defaultVal: 'high (3D)',
    description:
      'For dice tools (/dice/d20, /dice/d6, /roll-4d6): switches from the 3D WebGL physics engine to a lightweight 2D vector dice mode for ultra-low CPU usage.'
  },
  {
    param: '?fps=30|60',
    values: '30, 60',
    defaultVal: '30',
    description:
      'Caps the active animation loop frame rate during spins and dice rolls (30 FPS default to protect game encoding). Pauses completely at 0 FPS when idle.'
  }
];

const STREAM_FAQS = [
  {
    question: 'Why is my OBS Browser Source showing a black or white background?',
    answer:
      'Make sure your URL includes ?stream=1 (for example, https://spinwheelgames.org/comment-picker?stream=1). When stream=1 is present, SpinWheelGames automatically applies background: transparent !important to the HTML and body elements before the first frame paints. In OBS Browser Source properties, leave the Custom CSS field at its default transparent body rule.'
  },
  {
    question: 'Why do keyboard hotkeys (Space, R, N) stop working when I click back into my game?',
    answer:
      'OBS Studio and Streamlabs Browser Sources only receive direct keyboard events while the OBS "Interact" window is actively focused. To trigger spins, remove winners, or edit entries while playing a game, open the companion Remote Control Deck (/stream-control?id=<session>) in a regular browser tab or on your phone.'
  },
  {
    question: 'How do I hear or mute the wheel spin sound in OBS Studio?',
    answer:
      'Open the Browser Source properties in OBS and check "Control audio via OBS". A dedicated audio slider for your wheel or dice overlay will appear in the OBS Audio Mixer. Set Audio Monitoring to "Monitor and Output" if you want to hear the ticks in your own headphones as well as on stream, or append ?sound=0 to mute audio completely.'
  },
  {
    question: 'Does Streamer Mode consume CPU or GPU when the wheel or dice are not spinning?',
    answer:
      'No. In Streamer Mode, all animation loops (requestAnimationFrame) are strictly event-driven and terminate immediately once a wheel spin or dice roll settles. When idle, the overlay uses 0% CPU/GPU and runs zero background timers.'
  }
];

export default function StreamWheelGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        name: 'How to Set Up a Transparent Spin Wheel or Dice Overlay in OBS Studio',
        description: PAGE_DESCRIPTION,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Add a Browser Source in OBS',
            text: 'In OBS Studio or Streamlabs Desktop, click Sources > + > Browser and create a new source.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Paste the Streamer Mode URL (?stream=1)',
            text: 'Copy any SpinWheelGames tool URL with ?stream=1&id=<session> and paste it into the URL field.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Resolution to 1920x1080 and Enable OBS Audio Control',
            text: 'Set Width to 1920 and Height to 1080 (or 900x900) and check Control audio via OBS.'
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Trigger Spins via Hotkeys or /stream-control',
            text: 'Use Space/Enter to spin, R to reset, and N to remove the last winner, or open /stream-control in a browser tab for live remote triggers.'
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'OBS Streamer Mode Guide',
            item: `${SITE_CONFIG.baseUrl}/stream-wheel`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SubpageHeader
        activePage="/stream-wheel"
        breadcrumbs={[{ label: 'OBS Streamer Mode Guide' }]}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 lg:pt-22 pb-16 space-y-12">
        {/* Hero Section (Single H1) */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>OBS Studio • Streamlabs • Twitch Studio Browser Source</span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl font-black tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            OBS Streamer Mode: Transparent Wheel &amp; 3D Dice Overlays
          </h1>

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] max-w-3xl leading-relaxed">
            Turn any SpinWheelGames random picker, giveaway winner wheel, or polyhedral RPG dice roller into a clean, chroma-free transparent browser source overlay in OBS Studio and Streamlabs by adding{' '}
            <code className="px-2 py-0.5 rounded bg-[#eeedf7] dark:bg-[#222330] font-mono text-sm font-bold text-[#4648d4] dark:text-[#8587ff]">
              ?stream=1
            </code>{' '}
            to the URL.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/stream-control"
              className="px-5 py-3 rounded-2xl bg-[#4648d4] hover:bg-[#585ae6] text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Open Live Remote Control Deck (/stream-control)</span>
            </Link>

            <Link
              href="/comment-picker?stream=1&labels=outline"
              className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-all"
            >
              <Tv className="w-4 h-4" />
              <span>Demo Giveaway Wheel Overlay (?stream=1)</span>
            </Link>

            <Link
              href="/dice/d20?stream=1&labels=outline"
              className="px-4 py-3 rounded-2xl bg-white dark:bg-[#1b1c28] hover:bg-slate-50 dark:hover:bg-[#242636] border border-[#dcd9ec] dark:border-[#2e3044] text-[#1a1b22] dark:text-white font-bold text-sm inline-flex items-center gap-2 transition-all"
            >
              <Dices className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Demo d20 Dice Overlay (?stream=1)</span>
            </Link>
          </div>
        </section>

        {/* What Is Streamer Mode */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-4 shadow-xs">
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white">
            What Is Streamer Mode (?stream=1)?
          </h2>
          <p className="text-sm sm:text-base text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            Standard web pages include navigation bars, footers, educational guides, and opaque backgrounds that clutter a live broadcast if captured directly. When you append{' '}
            <code className="font-mono font-bold text-[#4648d4] dark:text-[#8587ff]">?stream=1</code> to any tool on SpinWheelGames.org, the engine switches into a dedicated broadcast overlay architecture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131c] border border-[#e3e1ec] dark:border-[#26283a] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Chrome &amp; True Alpha</span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Hides the header, navbar, footer, dice navigation hub, FAQs, and SEO text before the first frame renders. Only the wheel or dice stage and winner banner appear over a 100% transparent background.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131c] border border-[#e3e1ec] dark:border-[#26283a] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
                <Radio className="w-4 h-4" />
                <span>Remote Control &amp; Hotkeys</span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Trigger spins and dice rolls via keyboard hotkeys (<kbd className="font-mono">Space</kbd>, <kbd className="font-mono">R</kbd>, <kbd className="font-mono">N</kbd>), the paired{' '}
                <Link href="/stream-control" className="underline font-bold">
                  /stream-control
                </Link>{' '}
                browser tab, or Twitch/YouTube chat bot webhooks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131c] border border-[#e3e1ec] dark:border-[#26283a] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Cpu className="w-4 h-4" />
                <span>OBS CPU Protection</span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Caps active spin and 3D physics rendering at 30 FPS by default (60 FPS optional), limits devicePixelRatio, and pauses rendering completely (0% CPU) whenever the wheel or dice are idle.
              </p>
            </div>
          </div>
        </section>

        {/* 4-Step OBS Studio & Streamlabs Setup */}
        <section className="space-y-4">
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white">
            4-Step OBS Studio Setup Instructions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#4648d4] text-white font-headline font-black text-sm">
                1
              </span>
              <h3 className="font-headline text-base font-extrabold text-[#1a1b22] dark:text-white">
                Add Browser Source
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                In OBS Studio, go to the <strong>Sources</strong> dock, click the <strong>+</strong> button, choose <strong>Browser</strong>, and name your source (e.g., <em>Giveaway Wheel Overlay</em>).
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#4648d4] text-white font-headline font-black text-sm">
                2
              </span>
              <h3 className="font-headline text-base font-extrabold text-[#1a1b22] dark:text-white">
                Paste Streamer URL
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Click the <strong>Streamer mode / OBS</strong> button on any SpinWheelGames tool, copy the generated <code className="font-mono">?stream=1&amp;id=...</code> URL, and paste it into the OBS URL field.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#4648d4] text-white font-headline font-black text-sm">
                3
              </span>
              <h3 className="font-headline text-base font-extrabold text-[#1a1b22] dark:text-white">
                Set Size &amp; OBS Audio
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Set Width to <strong>1920</strong> and Height to <strong>1080</strong> (or <strong>900×900</strong> for corner widgets). Check <strong>Control audio via OBS</strong> to manage sound in your OBS Audio Mixer.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#4648d4] text-white font-headline font-black text-sm">
                4
              </span>
              <h3 className="font-headline text-base font-extrabold text-[#1a1b22] dark:text-white">
                Spin via Remote or Key
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Open{' '}
                <Link href="/stream-control" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
                  /stream-control
                </Link>{' '}
                in your normal browser to trigger spins and edit names live, or right-click the source in OBS and select <strong>Interact</strong>.
              </p>
            </div>
          </div>

          {/* Streamlabs Desktop & Twitch Studio Notes */}
          <div className="p-5 rounded-2xl bg-[#f4f2fd] dark:bg-[#161722] border border-[#e3e1ec] dark:border-[#252636] text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            <strong className="text-[#1a1b22] dark:text-white">Streamlabs Desktop &amp; Twitch Studio Notes:</strong>{' '}
            In Streamlabs Desktop, click <strong>Sources → + → Browser Source → Add Source</strong>, paste your <code className="font-mono">?stream=1</code> URL, and enable <em>Control Audio via Streamlabs Desktop</em>. If your streaming PC is running a GPU-intensive game alongside a 3D tabletop stream, append <code className="font-mono">?stream=1&amp;quality=low</code> on dice pages to switch to the ultra-lightweight 2D vector dice renderer.
          </div>
        </section>

        {/* Hotkeys & Remote Control Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-3">
            <h2 className="font-headline text-lg sm:text-xl font-extrabold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Keyboard &amp; OBS Interact Hotkeys</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              When the overlay window or OBS <em>Interact</em> dialog has focus, these single-key shortcuts operate the wheel and dice rollers immediately:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pt-1">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131c]">
                <span className="font-bold">Spin Wheel / Roll Dice</span>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-xs font-extrabold">
                  Space / Enter
                </kbd>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131c]">
                <span className="font-bold">Remove Last Winner (No Repeats)</span>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-xs font-extrabold">
                  N
                </kbd>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131c]">
                <span className="font-bold">Reset Entries &amp; Clear Banner</span>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-xs font-extrabold">
                  R
                </kbd>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131c]">
                <span className="font-bold">Mute / Unmute Overlay Audio</span>
                <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-xs font-extrabold">
                  M
                </kbd>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-3">
            <h2 className="font-headline text-lg sm:text-xl font-extrabold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-500" />
              <span>Real-Time Remote Control (/stream-control)</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Because OBS Studio runs Browser Sources inside an isolated Chromium Embedded Framework (CEF) process, keyboard presses while you are playing a full-screen game will not reach the browser source unless you open OBS Interact.
            </p>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Our companion{' '}
              <Link href="/stream-control" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
                Remote Control Deck (/stream-control?id=&lt;session&gt;)
              </Link>{' '}
              solves this completely: open it on a second monitor, tablet, or smartphone to trigger spins, eliminate winners, and push updated participant lists to your OBS overlay in real time. Session IDs are cryptographically random and require zero login or personal data.
            </p>
            <div className="pt-2">
              <Link
                href="/stream-control"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#585ae6] text-white text-xs font-bold shadow-sm"
              >
                <span>Launch Remote Control Deck</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Supported URL Parameters Table */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Supported Streamer Mode URL Parameters</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
              Combine any of these query parameters on wheel or dice URLs to customize your OBS overlay behavior:
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#eeedf7] dark:border-[#252636] bg-white dark:bg-[#181922] shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#eeedf7] dark:border-[#252636] bg-[#f4f2fd] dark:bg-[#12131c]">
                  <th className="py-3.5 px-4 font-extrabold text-[#1a1b22] dark:text-white">Parameter</th>
                  <th className="py-3.5 px-4 font-extrabold text-[#1a1b22] dark:text-white">Allowed Values</th>
                  <th className="py-3.5 px-4 font-extrabold text-[#1a1b22] dark:text-white">Default</th>
                  <th className="py-3.5 px-4 font-extrabold text-[#1a1b22] dark:text-white">Behavior &amp; Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeedf7] dark:divide-[#252636]">
                {SUPPORTED_PARAMS.map((row) => (
                  <tr key={row.param} className="hover:bg-[#fbf8ff] dark:hover:bg-[#1d1e2b]">
                    <td className="py-3 px-4 font-mono font-bold text-[#4648d4] dark:text-[#8587ff] whitespace-nowrap">
                      {row.param}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#464554] dark:text-[#c7c4d7] whitespace-nowrap">
                      {row.values}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      {row.defaultVal}
                    </td>
                    <td className="py-3 px-4 text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Troubleshooting Guide */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] space-y-4">
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Troubleshooting OBS &amp; Streamlabs Overlays</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131c] border border-[#eeedf7] dark:border-[#252636] space-y-1.5">
              <h3 className="font-headline text-sm font-extrabold text-[#1a1b22] dark:text-white">
                1. Black or Opaque Background
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Verify that <code className="font-mono font-bold">?stream=1</code> is included in the Browser Source URL and that you have not applied a Color Key filter or custom background fill in OBS. On dice pages, Streamer Mode automatically replaces the wooden dice tray with a transparent shadow-catcher plane.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131c] border border-[#eeedf7] dark:border-[#252636] space-y-1.5">
              <h3 className="font-headline text-sm font-extrabold text-[#1a1b22] dark:text-white">
                2. No Sound in Stream Audio
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Ensure <strong>Control audio via OBS</strong> is checked in the Browser Source properties and that the URL does not contain <code className="font-mono">?sound=0</code>. In OBS Advanced Audio Properties, set Audio Monitoring to <em>Monitor and Output</em> so both you and your viewers hear the wheel ticks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131c] border border-[#eeedf7] dark:border-[#252636] space-y-1.5">
              <h3 className="font-headline text-sm font-extrabold text-[#1a1b22] dark:text-white">
                3. Hotkey Not Working Mid-Game
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                OBS Browser Sources ignore global OS keystrokes when unfocused. Keep{' '}
                <Link href="/stream-control" className="underline font-bold">
                  /stream-control?id=&lt;session&gt;
                </Link>{' '}
                open on your phone or second monitor—tapping <strong>SPIN / ROLL OVERLAY</strong> triggers the OBS browser source over the network in real time.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Links to Supported Wheel, Winner Picker & Dice Tools */}
        <section className="space-y-4">
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Launch Stream-Ready Wheel &amp; Dice Tools</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Comment & Giveaway Winner Picker',
                desc: 'Fair raffle & social giveaway draw wheel with Web Crypto RNG and auto-remove winner.',
                toolHref: '/comment-picker',
                streamHref: '/comment-picker?stream=1&removewinner=1&history=1&labels=outline'
              },
              {
                title: 'Wheel of Names Random Picker',
                desc: 'Classic customizable name spinner for viewer subathons, marbles, and squad picks.',
                toolHref: '/wheel-of-names',
                streamHref: '/wheel-of-names?stream=1&labels=outline'
              },
              {
                title: '3D d20 Icosahedron Dice Roller',
                desc: 'Roll a 20-sided tabletop RPG die over a transparent alpha shadow-catcher stage.',
                toolHref: '/dice/d20',
                streamHref: '/dice/d20?stream=1&labels=outline'
              },
              {
                title: '3D d6 Standard Cube Dice Roller',
                desc: 'Roll 6-sided board game dice in 3D WebGL or lightweight 2D vector streamer mode.',
                toolHref: '/dice/d6',
                streamHref: '/dice/d6?stream=1&labels=outline'
              },
              {
                title: 'Roll 4d6 Drop Lowest Stat Roller',
                desc: 'Live D&D 5e character creation stat roller showing kept dice, dropped lowest die, and sum.',
                toolHref: '/roll-4d6',
                streamHref: '/roll-4d6?stream=1&labels=outline'
              },
              {
                title: 'Food & Game Decision Wheels',
                desc: 'Let your chat or squad decide what game to play or what food to order on stream.',
                toolHref: '/random-game-picker',
                streamHref: '/random-game-picker?stream=1&labels=outline'
              }
            ].map((card) => (
              <div
                key={card.toolHref}
                className="p-5 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#252636] flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5">
                  <h3 className="font-headline text-base font-extrabold text-[#1a1b22] dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link
                    href={card.toolHref}
                    className="px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#4648d4] hover:text-white text-xs font-bold text-[#1a1b22] dark:text-white transition-colors"
                  >
                    Open Tool Page
                  </Link>
                  <Link
                    href={card.streamHref}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <Tv className="w-3 h-3" />
                    <span>Launch ?stream=1</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection title="Streamer Mode & OBS Overlay FAQs" faqs={STREAM_FAQS} />
      </main>

      <Footer />
    </div>
  );
}
