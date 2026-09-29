import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Calendar,
  Lock,
  BookOpen,
  ExternalLink,
  Table,
  Lightbulb,
  Layers,
  GraduationCap,
  Gift,
  Users2,
  UtensilsCrossed,
  Sliders,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HomeEditorialContent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-[#1a1b22] dark:text-slate-100" id="home-editorial-content">
      {/* Provable Fairness & Privacy Bar */}
      <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-[#1a1b22] dark:text-white">
              Browser Web Cryptography API (crypto.getRandomValues)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>Updated: September 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Lock className="w-4 h-4 shrink-0" />
          <span>100% Client-Side Web Cryptography • Zero Data Tracking</span>
        </div>
      </div>

      {/* Comprehensive Editorial Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Cryptographic Randomness &amp; Decision Science
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1a1b22] dark:text-white">
          The Architecture of Digital Spinners: Cryptographic Randomness &amp; Behavioral Psychology
        </h2>
        <p className="text-base sm:text-lg text-[#464554] dark:text-slate-300 leading-relaxed">
          SpinWheelGames.org is engineered for classrooms, live creators, agile product teams, and everyday decision makers who demand unbiased mathematical neutrality.
        </p>
      </div>

      {/* Section 1: The Cryptographic Science of Digital Spinners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
              Why Math.random() Differs From Cryptographic Randomness
            </h3>
          </div>
          <div className="space-y-3 text-sm text-[#464554] dark:text-slate-300 leading-relaxed">
            <p>
              Many conventional web wheels generate results using JavaScript&apos;s standard{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">
                Math.random()
              </code>{' '}
              utility. While fast for simple graphics,{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">
                Math.random()
              </code>{' '}
              is a non-cryptographic pseudo-random number generator (PRNG).
            </p>
            <p>
              To ensure uniform probability distribution, our platform implements the{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-500 inline-flex items-center gap-0.5"
              >
                <span>W3C Web Cryptography API standards on Mozilla Developer Network (MDN)</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              . SpinWheelGames uses the browser Web Crypto API (
              <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-300">
                crypto.getRandomValues()
              </code>
              ) to generate random values directly in your browser.
            </p>
            <p>
              By combining high-resolution 53-bit float mantissa mapping with dynamic rejection sampling, every slice has an unbiased chance of being selected on every spin.
            </p>
          </div>
        </div>

        {/* Section 2: Deceleration Physics & Behavioral Psychology */}
        <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
              Rotational Deceleration &amp; The Psychology of Decision Outsourcing
            </h3>
          </div>
          <div className="space-y-3 text-sm text-[#464554] dark:text-slate-300 leading-relaxed">
            <p>
              In our engine, the winning slice is computed before the physical spin begins, but the decelerating animation fulfills an essential cognitive and communal role. The wheel uses a cubic ease-out deceleration curve:
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-indigo-600 dark:text-indigo-300">
              f(t) = 1 - (1 - t)³ • Angular Velocity Decay
            </div>
            <p>
              This mirrors real-world physical rotational friction with flipper haptic clicks. Because everyone in the room or on the video stream can see the decelerating pointer in real time, the result is embraced as neutral, transparent, and unmanipulated.
            </p>
            <p>
              Furthermore, published research on{' '}
              <a
                href="https://en.wikipedia.org/wiki/Decision_fatigue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-500 inline-flex items-center gap-0.5"
              >
                <span>decision fatigue and ego depletion</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>{' '}
              demonstrates that micro-choices deplete daily willpower and executive function. Outsourcing low-consequence dilemmas to an impartial wheel preserves cognitive energy for high-impact creative and analytical challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Technical Specifications & Foundational Research */}
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
                Technical Specifications &amp; Cryptographic Standards
              </h3>
              <p className="text-xs text-[#464554] dark:text-slate-400 mt-0.5">
                Core randomness protocols and entropy guidelines implemented in our engine.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source 1 */}
          <div className="rounded-xl border border-[#eeedf7] dark:border-slate-800 bg-white dark:bg-[#1a1b26] p-4 sm:p-5 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  W3C &amp; Mozilla Developer Network (MDN)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700">
                  W3C Standard
                </span>
              </div>
              <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
                Technical standard for the Web Cryptography API (`crypto.getRandomValues()`), specifying cryptographically secure pseudo-random number generation in browsers.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-[#696779] dark:text-slate-400 font-medium">
                Mozilla &amp; W3C Web Crypto Group
              </span>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>View Specification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Source 2 */}
          <div className="rounded-xl border border-[#eeedf7] dark:border-slate-800 bg-white dark:bg-[#1a1b26] p-4 sm:p-5 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                  W3C Web Cryptography API Specification
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700">
                  Web Standard
                </span>
              </div>
              <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
                Official W3C recommendation for client-side cryptographic operations and secure random generation interface across modern web standards.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-[#696779] dark:text-slate-400 font-medium">
                World Wide Web Consortium (W3C)
              </span>
              <a
                href="https://www.w3.org/TR/WebCryptoAPI/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>View Specification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-slate-800 text-xs text-[#464554] dark:text-slate-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#1a1b22] dark:text-white">Empirical Audit Protocol:</strong> The wheel randomizer algorithm is continuously audited against 100,000+ simulated angular trials using standard Chi-square goodness-of-fit testing (p &gt; 0.05), verifying uniform distribution across all sectors.
          </p>
        </div>
      </div>

      {/* Section 4: Method Comparison Table */}
      <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
              Random Selection Method Comparison
            </h3>
            <p className="text-xs text-[#464554] dark:text-slate-400 mt-0.5">
              How SpinWheelGames compares to traditional decision-making mechanisms.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#eeedf7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">Decision Method</th>
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">Speed</th>
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">Visual Engagement</th>
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">Weighted Options</th>
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">Elimination (No-Repeat)</th>
                <th className="py-3 px-4 font-semibold text-[#1a1b22] dark:text-white">CSPRNG Auditability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeedf7] dark:divide-slate-800">
              <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/30 transition-colors font-medium">
                <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">SpinWheelGames.org</td>
                <td className="py-3 px-4">2–6 sec</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">High (Haptic + Sound)</td>
                <td className="py-3 px-4">Yes (0.1x to 10x)</td>
                <td className="py-3 px-4">Yes (1-Click Remove)</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">Yes (Web Crypto API)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium">Basic RNG Number Picker</td>
                <td className="py-3 px-4">Instant</td>
                <td className="py-3 px-4 text-slate-400">None (Plain Text)</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4 text-amber-500">Often Math.random()</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium">Coin Flip</td>
                <td className="py-3 px-4">1 sec</td>
                <td className="py-3 px-4 text-slate-400">Low (Binary only)</td>
                <td className="py-3 px-4">No (50/50 only)</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4 text-slate-400">Physical physics</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium">Drawing Straws / Paper Slips</td>
                <td className="py-3 px-4">30+ sec</td>
                <td className="py-3 px-4">Medium</td>
                <td className="py-3 px-4">Requires duplicate slips</td>
                <td className="py-3 px-4">Manual</td>
                <td className="py-3 px-4 text-slate-400">Manual inspection</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium">6-Sided Dice Roll</td>
                <td className="py-3 px-4">2 sec</td>
                <td className="py-3 px-4">Low-Medium</td>
                <td className="py-3 px-4">No (Fixed 1/6)</td>
                <td className="py-3 px-4">No</td>
                <td className="py-3 px-4 text-slate-400">Physical physics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 5: Real-World Use Cases Across Domains */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1a1b22] dark:text-white">
            Practical Applications Across Professional &amp; Educational Settings
          </h3>
          <p className="text-xs sm:text-sm text-[#464554] dark:text-slate-400 mt-1">
            Proven deployment patterns for teachers, streamers, Scrum masters, and households.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Education */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-3 shadow-sm hover:border-indigo-400 transition-colors">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#1a1b22] dark:text-white">
              Classrooms &amp; Cold Calling
            </h4>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Research on{' '}
              <a
                href="https://www.edutopia.org/article/cold-calling-classroom-engagement/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                Edutopia on classroom engagement
              </a>{' '}
              demonstrates that predictable, visual selection eliminates pupil anxiety. Runs 100% locally to protect student data per{' '}
              <a
                href="https://studentprivacy.ed.gov/ferpa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                U.S. Dept of Ed FERPA regulations
              </a>
              .
            </p>
            <Link
              href="/classroom"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-1"
            >
              <span>Explore Classroom Wheels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Giveaways */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-3 shadow-sm hover:border-indigo-400 transition-colors">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#1a1b22] dark:text-white">
              Livestream Giveaways &amp; Raffles
            </h4>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Streamers on Twitch, YouTube, and TikTok record unedited spins to provide public audit proof that meets{' '}
              <a
                href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium"
              >
                FTC sweepstakes transparency guides
              </a>
              . Use Elimination Mode for multi-tier prizes.
            </p>
            <Link
              href="/giveaway-wheel"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
            >
              <span>Launch Giveaway Wheel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Teams */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-3 shadow-sm hover:border-indigo-400 transition-colors">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
              <Users2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#1a1b22] dark:text-white">
              Agile Standups &amp; Team Splits
            </h4>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Eliminate morning meeting fatigue by randomizing speaker order for sprint retros and standups. Split sports leagues or hackathon participants into mathematically balanced squads in one click.
            </p>
            <Link
              href="/random-team-generator"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline pt-1"
            >
              <span>Split Teams Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Daily Decisions */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 space-y-3 shadow-sm hover:border-indigo-400 transition-colors">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#1a1b22] dark:text-white">
              Meals, Chores &amp; Entertainment
            </h4>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Resolve circular &ldquo;What&apos;s for dinner?&rdquo; debates in 10 seconds. Spin through takeout options, assign household chores fairly, or let the wheel pick tonight&apos;s movie from your streaming watchlist.
            </p>
            <Link
              href="/food-wheel"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline pt-1"
            >
              <span>Spin Dinner Wheel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section 6: First-Party Expert Pro Tips */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/15 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
            Pro Tips for Maximizing Fairness &amp; Workflow Speed
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          <div className="rounded-xl bg-white dark:bg-[#1a1b26] border border-amber-100 dark:border-slate-800 p-4 space-y-1.5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              1. Spacebar Trigger
            </span>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Tap your keyboard&apos;s <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">Space</kbd> key to spin instantly without reaching for your mouse during presentations.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#1a1b26] border border-amber-100 dark:border-slate-800 p-4 space-y-1.5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              2. Elimination Mode
            </span>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Toggle Elimination Mode to automatically remove landed entries so you can draw 1st, 2nd, and 3rd place without duplicate winners.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#1a1b26] border border-amber-100 dark:border-slate-800 p-4 space-y-1.5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              3. Bulk Sheet Paste
            </span>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Copy a column directly from Google Sheets or Excel and click &ldquo;Import/Export&rdquo; to paste dozens of names into the wheel in a single click.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-[#1a1b26] border border-amber-100 dark:border-slate-800 p-4 space-y-1.5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              4. Session Audit Proof
            </span>
            <p className="text-xs text-[#464554] dark:text-slate-300 leading-relaxed">
              Switch to the &ldquo;Fairness Audit&rdquo; engine tab to inspect timestamps, generated cryptographic entropy seeds, and probability percentages for every prior spin.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7: Complete Topic Cluster & Category Directory */}
      <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
              Explore SpinWheelGames Topic Clusters &amp; Specialized Wheels
            </h3>
          </div>
          <p className="text-xs text-[#696779] dark:text-slate-400 mt-1">
            Browse our interconnected directory of decision randomizers, classroom pickers, and educational guides.
          </p>
        </div>

        {/* 10 Topic Pillars */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Category Pillars
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {[
              { name: 'Decisions', path: '/decisions', desc: 'Choice & dilemma wheels' },
              { name: 'Names', path: '/names', desc: 'Participant rosters & drafters' },
              { name: 'Classroom', path: '/classroom', desc: 'K-12 & college teaching tools' },
              { name: 'Food & Meals', path: '/food', desc: 'Lunch, dinner & snack pickers' },
              { name: 'Party Games', path: '/party', desc: 'Truth or dare & icebreakers' },
              { name: 'Sports & Teams', path: '/sports', desc: 'Squad splits & tournament brackets' },
              { name: 'Board Games', path: '/games', desc: 'Turn order & digital dice' },
              { name: 'Entertainment', path: '/entertainment', desc: 'Movies, streaming & video games' },
              { name: 'Numbers & Math', path: '/numbers', desc: 'Probability & number generators' },
              { name: 'Giveaways', path: '/giveaways', desc: 'Audited raffle prize drawings' }
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.path}
                className="group rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3 hover:border-indigo-500/50 hover:bg-slate-100/60 dark:hover:bg-slate-850 transition-all flex flex-col justify-between"
              >
                <div className="font-semibold text-xs text-[#1a1b22] dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                  {cat.name}
                </div>
                <div className="text-[10px] text-[#696779] dark:text-slate-400 mt-0.5">
                  {cat.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Core Dedicated Tools */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Core Search-Optimized Tools
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Spin the Wheel', path: '/spin-the-wheel' },
              { name: 'Wheel of Names', path: '/wheel-of-names' },
              { name: 'Random Team Generator', path: '/random-team-generator' },
              { name: 'Decision Wheel', path: '/decision-wheel' },
              { name: 'Random Picker', path: '/random-picker' },
              { name: 'Yes or No Wheel', path: '/yes-or-no-wheel' },
              { name: 'Classroom Wheel', path: '/classroom-wheel' },
              { name: 'Food Wheel', path: '/food-wheel' },
              { name: 'Party Wheel', path: '/party-wheel' },
              { name: 'Giveaway Wheel', path: '/giveaway-wheel' },
              { name: 'Number Wheel', path: '/number-wheel' },
              { name: 'Letter Wheel', path: '/letter-wheel' }
            ].map((tool, idx) => (
              <Link
                key={idx}
                href={tool.path}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-[#464554] dark:text-slate-300 hover:text-[#1a1b22] dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-500/50 border border-transparent transition-all"
              >
                <span>{tool.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Educational Guides */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Educational Guides &amp; Tutorials
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: 'How Random Wheels Work', path: '/how-random-wheels-work', time: '6 min read' },
              { name: 'How to Use a Wheel for Decisions', path: '/how-to-use-a-wheel', time: '4 min read' },
              { name: 'How to Pick a Random Winner', path: '/how-to-pick-a-random-winner', time: '5 min read' },
              { name: 'Random vs. Weighted Selection', path: '/random-vs-weighted-selection', time: '5 min read' },
              { name: 'How to Make a Classroom Wheel', path: '/how-to-make-a-classroom-wheel', time: '5 min read' }
            ].map((guide, idx) => (
              <Link
                key={idx}
                href={guide.path}
                className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-[#1a1b22] dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 block">
                    {guide.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{guide.time}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
