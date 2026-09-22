'use client';

import React, { useState, useCallback } from 'react';
import WheelWorkspace from './WheelWorkspace';
import WinnerModal from './WinnerModal';
import BulkPasteModal from './BulkPasteModal';
import { WheelItem, WheelMode, SpinLogItem, SoundSettings } from '@/lib/types';
import { COLOR_PALETTES } from '@/lib/presets';
import { selectWeightedWinner } from '@/lib/random';
import { loadPreferences, savePreferences, loadSoundSettings, saveSoundSettings } from '@/lib/storage';

interface StandaloneWheelHostProps {
  initialTitle: string;
  initialItems: { id: string; text: string; weight: number }[];
  initialPaletteKey?: string;
}

export default function StandaloneWheelHost({
  initialTitle,
  initialItems,
  initialPaletteKey = 'arcade'
}: StandaloneWheelHostProps) {
  const [wheelTitle, setWheelTitle] = useState(initialTitle);
  const [items, setItems] = useState<WheelItem[]>(() =>
    initialItems.map((item, idx) => ({
      id: item.id || `item-${idx}`,
      text: item.text,
      weight: item.weight || 1
    }))
  );

  const [activePaletteKey, setActivePaletteKey] = useState(initialPaletteKey);
  const [palette, setPalette] = useState<string[]>(
    COLOR_PALETTES[initialPaletteKey]?.colors || COLOR_PALETTES.arcade.colors
  );

  const [spinDuration, setSpinDuration] = useState(() => loadPreferences().duration || 5);
  const [currentMode, setCurrentMode] = useState<WheelMode>(() => loadPreferences().mode || 'standard');
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => loadSoundSettings());

  const [isSpinning, setIsSpinning] = useState(false);
  const [preSelectedWinner, setPreSelectedWinner] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);

  const [spinLogs, setSpinLogs] = useState<SpinLogItem[]>([]);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winnerItem, setWinnerItem] = useState<WheelItem | null>(null);
  const [lastSpinNumber, setLastSpinNumber] = useState(1);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);

  const handleUpdateSoundSettings = (newSettings: SoundSettings) => {
    setSoundSettings(newSettings);
    saveSoundSettings(newSettings);
  };

  const handleUpdateDuration = (dur: number) => {
    setSpinDuration(dur);
    savePreferences({ duration: dur });
  };

  const handleSelectMode = (mode: WheelMode) => {
    setCurrentMode(mode);
    savePreferences({ mode });
  };

  const handleSelectPalette = (key: string) => {
    if (COLOR_PALETTES[key]) {
      setActivePaletteKey(key);
      setPalette(COLOR_PALETTES[key].colors);
    }
  };

  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    const selection = selectWeightedWinner(items);
    setPreSelectedWinner(selection);
    setIsSpinning(true);
    setWinnerModalOpen(false);
  }, [isSpinning, items]);

  const handleSpinEnd = useCallback(
    (winner: WheelItem) => {
      setIsSpinning(false);
      setWinnerItem(winner);

      const nextSpinNum = spinLogs.length + 1;
      setLastSpinNumber(nextSpinNum);

      if (preSelectedWinner) {
        const newLog: SpinLogItem = {
          id: `log-${Date.now()}`,
          spinNumber: nextSpinNum,
          time: new Date().toLocaleTimeString(),
          itemText: winner.text,
          seed: preSelectedWinner.seed,
          oddsPercent: preSelectedWinner.oddsPercent
        };
        setSpinLogs((prev) => [newLog, ...prev]);
      }

      setWinnerModalOpen(true);
    },
    [preSelectedWinner, spinLogs.length]
  );

  const handleRemoveWinner = (toRemove: WheelItem) => {
    setItems((prev) => prev.filter((item) => item.id !== toRemove.id));
    setWinnerModalOpen(false);
  };

  const handleResetWheel = () => {
    setItems(
      initialItems.map((item, idx) => ({
        id: item.id || `item-${idx}`,
        text: item.text,
        weight: item.weight || 1
      }))
    );
    setWheelTitle(initialTitle);
  };

  const handleApplyBulkItems = (importedItems: WheelItem[]) => {
    setItems(importedItems);
    setBulkImportOpen(false);
  };

  return (
    <div className="w-full" id="wheel-host-container">
      <WheelWorkspace
        wheelTitle={wheelTitle}
        items={items}
        palette={palette}
        activePaletteKey={activePaletteKey}
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        spinDuration={spinDuration}
        soundSettings={soundSettings}
        spinLogs={spinLogs}
        isSpinning={isSpinning}
        preSelectedWinner={preSelectedWinner}
        onUpdateItems={setItems}
        onSelectPalette={handleSelectPalette}
        onChangeDuration={handleUpdateDuration}
        onChangeSoundSettings={handleUpdateSoundSettings}
        onTriggerSpin={handleTriggerSpin}
        onSpinStart={() => setIsSpinning(true)}
        onSpinEnd={handleSpinEnd}
        onOpenBulkImport={() => setBulkImportOpen(true)}
        onResetWheel={handleResetWheel}
      />

      <WinnerModal
        isOpen={winnerModalOpen}
        winner={winnerItem}
        oddsPercent={preSelectedWinner?.oddsPercent || '12.5'}
        seed={preSelectedWinner?.seed || '0x94F2B01E'}
        spinNumber={lastSpinNumber}
        currentMode={currentMode}
        soundEnabled={soundSettings.enabled}
        soundPack={soundSettings.pack}
        volume={soundSettings.volume}
        ttsEnabled={soundSettings.ttsEnabled}
        onClose={() => setWinnerModalOpen(false)}
        onSpinAgain={() => {
          setWinnerModalOpen(false);
          setTimeout(() => handleTriggerSpin(), 150);
        }}
        onRemoveWinner={handleRemoveWinner}
      />

      <BulkPasteModal
        isOpen={bulkImportOpen}
        onClose={() => setBulkImportOpen(false)}
        onApplyItems={handleApplyBulkItems}
      />
    </div>
  );
}
