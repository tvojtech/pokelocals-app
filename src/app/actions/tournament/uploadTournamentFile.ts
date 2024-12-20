"use server";

import { getStore } from "@netlify/blobs";
import fs from "fs";
import { revalidatePath } from "next/cache";

import { PlayerScore, Tournament } from "@/app/actions/tournament/types";
import { xmlToObject } from "@/app/actions/tournament/xml";

export async function uploadTournamentFile(
  formData: FormData,
  tournamentId: string
) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file selected" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const xmlString = buffer.toString("utf-8");
    const tournament = calculatePlayerScores(xmlToObject(xmlString));

    if (process.env.NODE_ENV !== "development") {
      const store = getStore("tournaments");
      await store.setJSON(tournamentId, tournament, {
        metadata: { uploadedAt: new Date().toISOString() },
      });
    } else {
      fs.writeFileSync(
        `/tmp/${tournamentId}.json`,
        JSON.stringify(tournament),
        "utf-8"
      );
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Failed to upload file" };
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

  pods.forEach((pod) => {
    pod.rounds.forEach((round) => {
      round.matches.forEach((match) => {
        const matchOutcome = match.outcome;
        if (!matchOutcome || matchOutcome === "0") {
          // not finished match
          return;
        } else if (matchOutcome === "1" || matchOutcome === "2") {
          scores = addScore(
            (matchOutcome === "1" ? match.player1 : match.player2)!,
            "win"
          );
          scores = addScore(
            (matchOutcome === "1" ? match.player2 : match.player1)!,
            "loss"
          );
        } else if (matchOutcome === "3") {
          scores = addScore(match.player1, "tie");
          scores = addScore(match.player2!, "tie");
        } else if (matchOutcome === "5") {
          scores = addScore(match.player1, "win");
        }
      });
    });
  });

  return { ...tournament, scores };
}

const createScoreCalculator =
  (playerScores: Record<string, PlayerScore>) =>
  (player: string, outcome: "win" | "loss" | "tie") => {
    if (outcome === "win") {
      playerScores[player] = {
        ...playerScores[player],
        wins: playerScores[player].wins + 1,
      };
    } else if (outcome === "loss") {
      playerScores[player] = {
        ...playerScores[player],
        losses: playerScores[player].losses + 1,
      };
    } else if (outcome === "tie") {
      playerScores[player] = {
        ...playerScores[player],
        ties: playerScores[player].ties + 1,
      };
    }

    return playerScores;
  };
