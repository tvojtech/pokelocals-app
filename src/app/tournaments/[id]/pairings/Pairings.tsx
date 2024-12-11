"use client";

import { Round, Tournament } from "@/app/actions/tournament";
import { PairingsRow } from "@/app/tournaments/[id]/pairings/PairingsRow";
import { useToggle } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";

export const Pairings: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const [showPairings, toggleShowPairings] = useToggle(false);
  return (
    <>
      <button onClick={() => toggleShowPairings()}>
        {showPairings ? "Hide Pairings" : "Show Pairings"}
      </button>
      <div className={classNames({ hidden: !showPairings }, "space-y-4")}>
        <h1>Pairings</h1>
        {tournament.pods.map((pod, idx) => (
          <PairingsSection
            key={idx}
            round={pod.rounds[pod.rounds.length - 1]}
            tournament={tournament}
          />
        ))}
      </div>
    </>
  );
};

const PairingsSection: React.FC<{ round: Round; tournament: Tournament }> = ({
  round,
  tournament,
}) => {
  return (
    <div>
      <h2>--------- Round {round.number} ---------</h2>
      <div className="grid grid-cols-3">
        {round.matches.map((match, idx) => (
          <PairingsRow key={idx} match={match} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};
