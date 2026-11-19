import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export interface RelatedWheelLink {
  name: string;
  href: string;
  anchorText: string;
  description: string;
  tag?: string;
}

export interface RelatedGuideLink {
  label: string;
  href: string;
  readingTime?: string;
}

interface RelatedWheelsSectionProps {
  title?: string;
  subtitle?: string;
  wheels: RelatedWheelLink[];
  guides?: RelatedGuideLink[];
  maxWidthClass?: string;
}

export default function RelatedWheelsSection({
  title = 'Related Wheels',
  subtitle = 'Keep the momentum going with closely related decision, party, and random picker tools.',
  wheels,
  guides,
  maxWidthClass = 'max-w-7xl'
}: RelatedWheelsSectionProps) {
  if (!wheels || wheels.length === 0) return null;

  return (
    <section
      className={`w-full ${maxWidthClass} mx-auto px-3.5 sm:px-6 lg:px-8`}
      aria-labelledby="related-wheels-heading"
    >
      <div className="rounded-3xl border border-[#eeedf7] dark:border-[#222330] bg-gradient-to-br from-white to-[#f4f2fd] dark:from-[#151620] dark:to-[#10111a] p-5 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#eeedf7] dark:border-[#222330] pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Keep Spinning</span>
            </span>
            <h2
              id="related-wheels-heading"
              className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5"
            >
              {title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#464554] dark:text-[#908fa1] max-w-md">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {wheels.slice(0, 5).map((wheel) => (
            <Link
              key={wheel.href}
              href={wheel.href}
              className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/60 dark:hover:border-[#8587ff]/60 hover:bg-[#faf8ff] dark:hover:bg-[#1e202d] shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                {wheel.tag && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    {wheel.tag}
                  </span>
                )}
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors leading-snug">
                  {wheel.anchorText}
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed">
                  {wheel.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7]/70 dark:border-[#222330] text-xs font-bold text-[#4648d4] dark:text-[#8587ff]">
                <span>Open {wheel.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {guides && guides.length > 0 && (
          <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] inline-flex items-center gap-1.5 mr-1">
              <BookOpen className="w-3.5 h-3.5 text-[#006c49] dark:text-emerald-400" />
              <span>Helpful Guides:</span>
            </span>
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-[#f1effa] hover:border-[#4648d4] dark:hover:border-[#8587ff] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
              >
                <span>{guide.label}</span>
                {guide.readingTime && (
                  <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">
                    ({guide.readingTime})
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
