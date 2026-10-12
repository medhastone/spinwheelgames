'use client';

import React, { useState, useMemo } from 'react';
import { WheelItem, TournamentMatch, ResultCardData } from '@/lib/types';
import { TOURNAMENT_PRESET_ITEMS } from '@/lib/presets';
import { selectWeightedWinner } from '@/lib/random';
import { recordTournamentWin, loadUserStats } from '@/lib/storage';
import WheelCanvas from './WheelCanvas';
import confetti from '@/lib/confetti';
import { Trophy, RotateCcw, Check, Crown, X, Swords, Share2 } from 'lucide-react';
import ResultCardModal from './ResultCardModal';

interface TournamentEngineProps {
  initialItems?: WheelItem[];
  soundEnabled: boolean;
  soundPack: string;
  volume: number;
}

export default function TournamentEngine({
  initialItems = TOURNAMENT_PRESET_ITEMS,
  soundEnabled,
  soundPack,
  volume
}: TournamentEngineProps) {
  // Ensure we have an even power-of-two number of contestants (8 or 16)
  const contestants = useMemo(() => {
    let list = [...initialItems];
    if (list.length < 8) {
      list = [...TOURNAMENT_PRESET_ITEMS];
    }
    // Take first 8 contestants for tight, responsive UI
    return list.slice(0, 8);
  }, [initialItems]);

  // Generate initial Round 1 matches (4 matches for 8 items)
  const generateInitialMatches = (): {
    round1: TournamentMatch[];
    semis: TournamentMatch[];
    final: TournamentMatch;
  } => {
    const r1: TournamentMatch[] = [
      { id: 'm1', round: 1, matchIndex: 0, itemA: contestants[0], itemB: contestants[1], winner: null },
      { id: 'm2', round: 1, matchIndex: 1, itemA: contestants[2], itemB: contestants[3], winner: null },
      { id: 'm3', round: 1, matchIndex: 2, itemA: contestants[4], itemB: contestants[5], winner: null },
      { id: 'm4', round: 1, matchIndex: 3, itemA: contestants[6], itemB: contestants[7], winner: null }
    ];

    const semis: TournamentMatch[] = [
      { id: 's1', round: 2, matchIndex: 0, itemA: null, itemB: null, winner: null },
      { id: 's2', round: 2, matchIndex: 1, itemA: null, itemB: null, winner: null }
    ];

    const final: TournamentMatch = {
      id: 'f1',
      round: 3,
      matchIndex: 0,
      itemA: null,
      itemB: null,
      winner: null
    };

    return { round1: r1, semis, final };
  };

  const [matches, setMatches] = useState(generateInitialMatches);
  const [activeDuel, setActiveDuel] = useState<TournamentMatch | null>(null);
  const [duelSpinning, setDuelSpinning] = useState(false);
  const [duelPreselected, setDuelPreselected] = useState<ReturnType<typeof selectWeightedWinner> | null>(null);
  const [champion, setChampion] = useState<WheelItem | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const startDuel = (match: TournamentMatch) => {
    if (!match.itemA || !match.itemB || match.winner) return;
    setActiveDuel(match);
  };

  const handleSpinDuel = () => {
    if (!activeDuel || !activeDuel.itemA || !activeDuel.itemB || duelSpinning) return;
    const duelItems: WheelItem[] = [
      { ...activeDuel.itemA, weight: 1, color: '#4648d4' },
      { ...activeDuel.itemB, weight: 1, color: '#dc2c4f' }
    ];
    const selection = selectWeightedWinner(duelItems);
    setDuelPreselected(selection);
    setDuelSpinning(true);
  };

  const onDuelEnd = (wonItem: WheelItem) => {
    if (!activeDuel) return;
    setDuelSpinning(false);

    // Identify which contestant won
    const winnerContestant =
      activeDuel.itemA?.text === wonItem.text ? activeDuel.itemA : activeDuel.itemB;

    if (!winnerContestant) return;

    if (activeDuel.round === 1) {
      // Update Round 1
      const updatedR1 = matches.round1.map((m) =>
        m.id === activeDuel.id ? { ...m, winner: winnerContestant } : m
      );

      // Advance to Semifinals
      const updatedSemis = [...matches.semis];
      if (activeDuel.matchIndex === 0) updatedSemis[0].itemA = winnerContestant;
      if (activeDuel.matchIndex === 1) updatedSemis[0].itemB = winnerContestant;
      if (activeDuel.matchIndex === 2) updatedSemis[1].itemA = winnerContestant;
      if (activeDuel.matchIndex === 3) updatedSemis[1].itemB = winnerContestant;

      setMatches({ ...matches, round1: updatedR1, semis: updatedSemis });
    } else if (activeDuel.round === 2) {
      // Update Semis
      const updatedSemis = matches.semis.map((m) =>
        m.id === activeDuel.id ? { ...m, winner: winnerContestant } : m
      );

      // Advance to Final
      const updatedFinal = { ...matches.final };
      if (activeDuel.matchIndex === 0) updatedFinal.itemA = winnerContestant;
      if (activeDuel.matchIndex === 1) updatedFinal.itemB = winnerContestant;

      setMatches({ ...matches, semis: updatedSemis, final: updatedFinal });
    } else if (activeDuel.round === 3) {
      // Final won! Champion crowned!
      const updatedFinal = { ...matches.final, winner: winnerContestant };
      setMatches({ ...matches, final: updatedFinal });
      setChampion(winnerContestant);
      recordTournamentWin();

      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }

    setTimeout(() => setActiveDuel(null), 1200);
  };

  const handleResetTournament = () => {
    setMatches(generateInitialMatches());
    setActiveDuel(null);
    setChampion(null);
  };

  const stats = loadUserStats();

  const shareData: ResultCardData = {
    winner: champion?.text || 'Tournament Champion',
    score: '8-Contender Knockout Bracket',
    streak: stats.currentDailyStreak || 1,
    challengeName: 'Tournament Championship',
    oddsPercent: '12.5',
    seed: champion ? `TOURNAMENT-${champion.id.slice(0, 8)}` : 'TOURNAMENT-BRACKET',
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org'
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold mb-2">
            <Trophy className="w-4 h-4" />
            <span>Single-Elimination Tournament Bracket</span>
          </div>
          <h2 className="font-headline font-extrabold text-[24px] sm:text-[28px] text-[#1a1b22] dark:text-[#f1effa]">
            8-Option Knockout Duel Wheel
          </h2>
          <p className="text-[13px] text-[#767586] dark:text-[#908fa1]">
            Click any active match to spin the head-to-head duel wheel and crown the ultimate champion.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetTournament}
          className="px-4 py-2.5 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[13px] font-bold text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Bracket</span>
        </button>
      </div>

      {/* Champion Crowning Banner */}
      {champion && (
        <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-6 rounded-3xl text-center text-[#1a1b22] shadow-xl animate-bounceIn flex flex-col items-center gap-3">
          <Crown className="w-12 h-12 text-[#1a1b22]" />
          <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#1a1b22]/80">
            Grand Tournament Champion Crowned!
          </span>
          <h3 className="font-headline font-black text-[32px] sm:text-[40px] tracking-tight">
            {champion.text}
          </h3>
          <p className="text-[14px] font-medium text-[#1a1b22]/90">
            Survived all 3 knockout rounds with undefeated cryptographic random duels!
          </p>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="mt-2 py-3 px-6 rounded-xl bg-[#1a1b22] hover:bg-[#2e2f3d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Share Tournament Champion Card</span>
          </button>
        </div>
      )}

      {/* Interactive Visual Bracket */}
      <div className="w-full max-w-full overflow-x-auto pb-4">
        <div className="min-w-[720px] sm:min-w-[760px] grid grid-cols-3 gap-6 items-center">
          {/* Round 1: Quarterfinals (4 matches) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] text-center">
              Round 1: Quarterfinals
            </h4>
            {matches.round1.map((m) => (
              <div
                key={m.id}
                onClick={() => startDuel(m)}
                className={`p-3 rounded-2xl border transition-all ${
                  m.winner
                    ? 'bg-[#f4f2fd] dark:bg-[#1d1e28] border-[#eeedf7] dark:border-[#292a39]'
                    : 'bg-white dark:bg-[#181922] border-[#4648d4] hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between text-[13px] font-semibold py-1">
                  <span className={m.winner?.text === m.itemA?.text ? 'text-[#006c49] font-bold' : ''}>
                    {m.itemA?.text}
                  </span>
                  {m.winner?.text === m.itemA?.text && (
                    <Check className="w-4 h-4 text-[#006c49]" />
                  )}
                </div>
                <div className="h-px bg-[#eeedf7] dark:bg-[#292a39] my-1" />
                <div className="flex items-center justify-between text-[13px] font-semibold py-1">
                  <span className={m.winner?.text === m.itemB?.text ? 'text-[#006c49] font-bold' : ''}>
                    {m.itemB?.text}
                  </span>
                  {m.winner?.text === m.itemB?.text && (
                    <Check className="w-4 h-4 text-[#006c49]" />
                  )}
                </div>
                {!m.winner && (
                  <div className="mt-1 pt-1 border-t border-[#eeedf7] dark:border-[#292a39] text-center text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff]">
                    👉 Click to Spin Duel
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Round 2: Semifinals (2 matches) */}
          <div className="flex flex-col gap-12">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] text-center">
              Round 2: Semifinals
            </h4>
            {matches.semis.map((m) => {
              const isReady = m.itemA && m.itemB && !m.winner;
              return (
                <div
                  key={m.id}
                  onClick={() => isReady && startDuel(m)}
                  className={`p-3 rounded-2xl border transition-all ${
                    m.winner
                      ? 'bg-[#f4f2fd] dark:bg-[#1d1e28] border-[#eeedf7] dark:border-[#292a39]'
                      : isReady
                      ? 'bg-white dark:bg-[#181922] border-[#4648d4] hover:shadow-md cursor-pointer'
                      : 'bg-gray-50 dark:bg-[#12131a] border-dashed border-[#c7c4d7] opacity-60'
                  }`}
                >
                  <div className="text-[13px] font-semibold py-1 flex items-center justify-between">
                    <span className={m.winner?.text === m.itemA?.text ? 'text-[#006c49] font-bold' : ''}>
                      {m.itemA ? m.itemA.text : 'Winner Q1'}
                    </span>
                    {m.winner?.text === m.itemA?.text && (
                      <Check className="w-4 h-4 text-[#006c49]" />
                    )}
                  </div>
                  <div className="h-px bg-[#eeedf7] dark:bg-[#292a39] my-1" />
                  <div className="text-[13px] font-semibold py-1 flex items-center justify-between">
                    <span className={m.winner?.text === m.itemB?.text ? 'text-[#006c49] font-bold' : ''}>
                      {m.itemB ? m.itemB.text : 'Winner Q2'}
                    </span>
                    {m.winner?.text === m.itemB?.text && (
                      <Check className="w-4 h-4 text-[#006c49]" />
                    )}
                  </div>
                  {isReady && (
                    <div className="mt-1 pt-1 border-t border-[#eeedf7] dark:border-[#292a39] text-center text-[11px] font-bold text-[#4648d4]">
                      👉 Click to Spin Duel
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Round 3: Grand Final (1 match) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] text-center">
              Grand Final
            </h4>
            <div
              onClick={() => matches.final.itemA && matches.final.itemB && !matches.final.winner && startDuel(matches.final)}
              className={`p-4 rounded-3xl border-2 transition-all ${
                matches.final.winner
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400'
                  : matches.final.itemA && matches.final.itemB
                  ? 'bg-white dark:bg-[#181922] border-yellow-500 shadow-lg cursor-pointer animate-pulse'
                  : 'bg-gray-50 dark:bg-[#12131a] border-dashed border-[#c7c4d7] opacity-60'
              }`}
            >
              <div className="text-center font-bold text-[12px] text-amber-600 mb-2">
                👑 CHAMPIONSHIP MATCH
              </div>
              <div className="text-[14px] font-bold py-1 flex items-center justify-between">
                <span>{matches.final.itemA ? matches.final.itemA.text : 'Semifinalist 1'}</span>
                {matches.final.winner?.text === matches.final.itemA?.text && (
                  <Trophy className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="h-px bg-[#eeedf7] dark:bg-[#292a39] my-1.5" />
              <div className="text-[14px] font-bold py-1 flex items-center justify-between">
                <span>{matches.final.itemB ? matches.final.itemB.text : 'Semifinalist 2'}</span>
                {matches.final.winner?.text === matches.final.itemB?.text && (
                  <Trophy className="w-5 h-5 text-amber-600" />
                )}
              </div>
              {matches.final.itemA && matches.final.itemB && !matches.final.winner && (
                <div className="mt-2 pt-2 border-t border-yellow-200 text-center text-[12px] font-extrabold text-amber-600">
                  🔥 SPIN THE FINAL DUEL
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Head-to-Head Duel Modal */}
      {activeDuel && activeDuel.itemA && activeDuel.itemB && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#181922] rounded-3xl p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col items-center gap-4 text-center">
            <button
              type="button"
              onClick={() => !duelSpinning && setActiveDuel(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[12px] font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
              Round {activeDuel.round} Head-to-Head Duel
            </span>
            <h3 className="font-headline font-extrabold text-[18px] text-[#1a1b22] dark:text-[#f1effa]">
              {activeDuel.itemA.text} vs {activeDuel.itemB.text}
            </h3>

            {/* 2-Slice Duel Wheel */}
            <div className="w-[260px] h-[260px]">
              <WheelCanvas
                items={[
                  { ...activeDuel.itemA, weight: 1, color: '#4648d4' },
                  { ...activeDuel.itemB, weight: 1, color: '#dc2c4f' }
                ]}
                palette={['#4648d4', '#dc2c4f']}
                isSpinning={duelSpinning}
                preSelectedWinner={duelPreselected}
                onSpinStart={handleSpinDuel}
                onSpinEnd={onDuelEnd}
                duration={3.5}
                soundEnabled={soundEnabled}
                soundPack={soundPack}
                volume={volume}
              />
            </div>

            <button
              type="button"
              onClick={handleSpinDuel}
              disabled={duelSpinning}
              className="w-full py-3 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-[14px] disabled:opacity-50 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>{duelSpinning ? 'Duel in Progress...' : 'SPIN DUEL'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ResultCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        data={shareData}
      />
    </div>
  );
}
