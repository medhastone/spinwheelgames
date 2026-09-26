import { Metadata } from 'next';
import DedicatedDiePageComponent from '@/components/dice/DedicatedDiePageComponent';
import { DIE_PAGE_CONFIGS } from '@/components/dice/diePageConfigs';
import DiceNavHeader from '@/components/navigation/DiceNavHeader';
import DiceFooter from '@/components/navigation/DiceFooter';

export const metadata: Metadata = {
  title: DIE_PAGE_CONFIGS.d100.metaTitle,
  description: DIE_PAGE_CONFIGS.d100.metaDescription,
  keywords: DIE_PAGE_CONFIGS.d100.primaryKeywords,
  alternates: {
    canonical: 'https://spinwheelgames.org/d100'
  },
  openGraph: {
    title: DIE_PAGE_CONFIGS.d100.metaTitle,
    description: DIE_PAGE_CONFIGS.d100.metaDescription,
    url: 'https://spinwheelgames.org/d100',
    type: 'website'
  }
};

export default function D100Page() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <DiceNavHeader />
      <DedicatedDiePageComponent config={DIE_PAGE_CONFIGS.d100} />
      <DiceFooter />
    </main>
  );
}
