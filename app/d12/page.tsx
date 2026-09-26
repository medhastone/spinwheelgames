import { Metadata } from 'next';
import DedicatedDiePageComponent from '@/components/dice/DedicatedDiePageComponent';
import { DIE_PAGE_CONFIGS } from '@/components/dice/diePageConfigs';
import DiceNavHeader from '@/components/navigation/DiceNavHeader';
import DiceFooter from '@/components/navigation/DiceFooter';

export const metadata: Metadata = {
  title: DIE_PAGE_CONFIGS.d12.metaTitle,
  description: DIE_PAGE_CONFIGS.d12.metaDescription,
  keywords: DIE_PAGE_CONFIGS.d12.primaryKeywords,
  alternates: {
    canonical: 'https://spinwheelgames.org/d12'
  },
  openGraph: {
    title: DIE_PAGE_CONFIGS.d12.metaTitle,
    description: DIE_PAGE_CONFIGS.d12.metaDescription,
    url: 'https://spinwheelgames.org/d12',
    type: 'website'
  }
};

export default function D12Page() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <DiceNavHeader />
      <DedicatedDiePageComponent config={DIE_PAGE_CONFIGS.d12} />
      <DiceFooter />
    </main>
  );
}
