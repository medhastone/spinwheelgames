import React from 'react';
import { Metadata } from 'next';
import FairnessPage from '../fairness/page';

export const metadata: Metadata = {
  title: 'How Random Selection Works – Fair Randomness | SpinWheelGames',
  description:
    'Learn how SpinWheelGames uses your browser Web Crypto API (CSPRNG) for unbiased random wheel selections and weighted odds.',
  alternates: {
    canonical: 'https://spinwheelgames.org/fair-randomness'
  }
};

export default function FairRandomnessRoute() {
  return <FairnessPage />;
}
