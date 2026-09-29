'use client';

import React from 'react';
import Navbar from './Navbar';

export default function SubpageHeader({ activePage, breadcrumbs }: { activePage?: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return <Navbar activeNav={activePage} />;
}

