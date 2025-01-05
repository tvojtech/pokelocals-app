'use server';

import { getStore } from '@netlify/blobs';
import fs from 'fs';
import { revalidatePath } from 'next/cache';

import { Match, PlayerScore, Tournament } from '@/app/actions/tournament/types';
import { xmlToObject } from '@/app/actions/tournament/xml';
import { exhaustiveMatchingGuard } from '@/app/utils';

export async function uploadTournamentFile(
  formData: FormData,
  tournamentId: string
) {
  const file = formData.get('file') as File;

  if (!file) {
    return { error: 'No file selected' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const xmlString = buffer.toString('utf-8');
    const tournament = calculatePlayerScores(xmlToObject(xmlString));

    if (process.env.NODE_ENV !== 'development') {
      const store = getStore('tournaments');
      await store.setJSON(tournamentId, tournament, {
        metadata: { uploadedAt: new Date().toISOString() },
      });
    } else {
      fs.writeFileSync(
        `/tmp/${tournamentId}.json`,
        JSON.stringify(tournament),
        'utf-8'
      );
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file' };
  }
}

function calculatePlayerScores(tournament: Tournament) {
  const { players, pods } = tournament;

  let scores: Record<string, PlayerScore> = players.reduce(
    (acc, player) => ({
      ...acc,
      [player.userid]: { wins: 0, ties: 0, losses: 0 },
    }),
    {} as Record<string, PlayerScore>
  );

  const addScore = createScoreCalculator(scores);

  pods.forEach(pod => {
    pod.rounds.forEach(round => {
      round.matches.forEach(match => {
        const player1Result = mapOutcomeToPlayerResult(match, match.player1);
        if (player1Result && player1Result !== PlayerResult.not_finished) {
          scores = addScore(match.player1, player1Result);
        }
        if (match.player2) {
          const player2Result = mapOutcomeToPlayerResult(match, match.player2);
          if (player2Result && player2Result !== PlayerResult.not_finished) {
            scores = addScore(match.player2, player2Result);
          }
        }
      });
    });
  });

  return { ...tournament, scores };
}

enum PlayerResult {
  win = 'win',
  loss = 'loss',
  tie = 'tie',
  not_finished = 'not_finished',
}

const mapOutcomeToPlayerResult = (
  match: Match,
  player: string
): PlayerResult | undefined => {
  const matchOutcome = match.outcome;
  if (!matchOutcome || matchOutcome === '0') {
    // not finished match
    return PlayerResult.not_finished;
  } else if (matchOutcome === '1') {
    return player === match.player1 ? PlayerResult.win : PlayerResult.loss;
  } else if (matchOutcome === '2') {
    return player === match.player1 ? PlayerResult.loss : PlayerResult.win;
  } else if (matchOutcome === '3') {
    return PlayerResult.tie;
  } else if (matchOutcome === '4' || matchOutcome === '5') {
    return player === match.player1 ? PlayerResult.win : PlayerResult.loss;
  } else if (matchOutcome === '8') {
    return player === match.player1 ? PlayerResult.loss : PlayerResult.win;
  }
};

const createScoreCalculator =
  (playerScores: Record<string, PlayerScore>) =>
  (player: string, outcome: PlayerResult) => {
    switch (outcome) {
      case PlayerResult.win:
        playerScores[player] = {
          ...playerScores[player],
          wins: playerScores[player].wins + 1,
        };
        break;
      case PlayerResult.loss:
        playerScores[player] = {
          ...playerScores[player],
          losses: playerScores[player].losses + 1,
        };
        break;
      case PlayerResult.tie:
        playerScores[player] = {
          ...playerScores[player],
          ties: playerScores[player].ties + 1,
        };
        break;
      case PlayerResult.not_finished:
        break;
      default:
        exhaustiveMatchingGuard(outcome);
    }

    return playerScores;
  };
