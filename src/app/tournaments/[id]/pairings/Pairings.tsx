"use client";

import { useToggle } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";

import { Round, Tournament } from "@/app/actions/tournament";
import { PairingsRow } from "@/app/tournaments/[id]/pairings/PairingsRow";

export const Pairings: React.FC<{ tournament: Tournament }> = ({
  tournament,
}) => {
  const [showPairings, toggleShowPairings] = useToggle(false);
  return (
    <div>
      <button onClick={() => toggleShowPairings()}>
        {showPairings ? "Hide Pairings" : "Show Pairings"}
      </button>
      <div className={classNames({ hidden: !showPairings }, "space-y-4")}>
        {tournament.pods.map((pod, idx) => (
          <PairingsSection
            key={idx}
            round={pod.rounds[pod.rounds.length - 1]}
            tournament={tournament}
          />
        ))}
      </div>
    </div>
  );
};

const PairingsSection: React.FC<{ round: Round; tournament: Tournament }> = ({
  round,
  tournament,
}) => {
  return (
    <div>
      <h2 className="w-full flex justify-center mt-10 border-b-2 mb-2 text-xl font-bold">
        Round {round.number}
      </h2>
      <div className="grid grid-cols-3 align-center gap-2">
        {round.matches.map((match, idx) => (
          <React.Fragment key={idx}>
            <PairingsRow match={match} tournament={tournament} />
            <div
              className="border-t border-t-gray-200"
              style={{ gridColumn: "1 / 5" }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
