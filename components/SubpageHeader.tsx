'use client';

import React from 'react';
import Navbar from './Navbar';

export default function SubpageHeader({ activePage }: { activePage?: string }) {
  return <Navbar activeNav={activePage} />;
}

