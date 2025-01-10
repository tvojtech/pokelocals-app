/* eslint-disable @typescript-eslint/no-explicit-any */
import { XMLParser } from 'fast-xml-parser';

import {
  Division,
  Match,
  Player,
  Pod,
  Round,
  Subgroup,
  Tournament,
} from './types';

export function xmlToObject(xmlString: string): Tournament {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  const jsonData = parser.parse(xmlString);

  const tournament: Tournament = {
    type: Number(jsonData.tournament['@_type']),
    stage: Number(jsonData.tournament['@_stage']),
    version: jsonData.tournament['@_version'],
    gametype: jsonData.tournament['@_gametype'],
    mode: jsonData.tournament['@_mode'],
    data: {
      name: jsonData.tournament.data.name,
      id: jsonData.tournament.data.id,
      city: jsonData.tournament.data.city,
      state: jsonData.tournament.data.state || null,
      country: jsonData.tournament.data.country,
      roundtime: Number(jsonData.tournament.data.roundtime),
      finalsroundtime: Number(jsonData.tournament.data.finalsroundtime),
      startdate: jsonData.tournament.data.startdate,
      lessswiss: jsonData.tournament.data.lessswiss === 'true',
      autotablenumber: jsonData.tournament.data.autotablenumber === 'true',
      overflowtablestart: Number(jsonData.tournament.data.overflowtablestart),
    },
    timeelapsed: Number(jsonData.tournament.timeelapsed),
    players: parsePlayers(jsonData.tournament.players.player),
    pods: parsePods(jsonData.tournament.pods.pod),
    scores: {},
    standings: jsonData.tournament?.standings?.pod
      ? parseStandings(jsonData.tournament.standings.pod)
      : undefined,
  };

  return tournament;
}

const divisionMap: Record<XmlStandingsCategory, Division> = {
  '0': Division.JUNIORS,
  '1': Division.SENIORS,
  '2': Division.MASTERS,
};

type XmlStandingsCategory = '0' | '1' | '2';

const parseStandings = (standings: any): Tournament['standings'] => {
  return (Array.isArray(standings) ? standings : [standings])
    .map((standing: any) => ({
      category: divisionMap[standing['@_category'] as XmlStandingsCategory],
      type: standing['@_type'],
      players: (Array.isArray(standing.player)
        ? standing.player
        : standing.player
          ? [standing.player]
          : []
      ).map((p: any) => ({ id: p['@_id'], place: Number(p['@_place']) })),
    }))
    .reduce(
      (acc: Tournament['standings'], standing) => ({
        ...acc,
        [standing.category]: {
          ...(acc[standing.category] || {}),
          [standing.type]: standing.players,
        },
      }),
      {} as Tournament['standings']
    );
};

const parsePlayers = (players: any) => {
  return parseXmlArray<any, Player>((p: any) => {
    return {
      userid: p['@_userid'],
      firstname: p.firstname,
      lastname: p.lastname,
      birthdate: p.birthdate,
      starter: p.starter === 'true',
      order: Number(p.order),
      seed: Number(p.seed),
      creationdate: p.creationdate,
      lastmodifieddate: p.lastmodifieddate,
      late: !!p.late,
      byes: p.byes ? Number(p.byes) : 0,
      ...(p.dropped ? { dropped: { round: Number(p.dropped.round) } } : {}),
    };
  }, players);
};

const parsePods = (pods: any) => {
  return parseXmlArray<any, Pod>(
    (pod: any) => ({
      category: pod['@_category'],
      stage: pod['@_stage'],
      subgroups: parseSubgroups(pod.subgroups.subgroup),
      rounds: parseRounds(pod.rounds.round),
    }),
    pods
  );
};

const parseSubgroups = (subgroups: any) => {
  return parseXmlArray<any, Subgroup>(
    (sg: any) => ({
      number: sg['@_number'],
      players: sg.players.player.map((p: any) => p['@_userid']),
    }),
    subgroups
  );
};

const parseMatches = (matches: any) => {
  return parseXmlArray<any, Match>(
    (m: any) => ({
      outcome: m['@_outcome'],
      player1: m.player1 ? m.player1['@_userid'] : m.player['@_userid'],
      // in case of BYE player2 is not present
      player2: m.player1 ? m.player2['@_userid'] : undefined,
      tablenumber: Number(m.tablenumber),
    }),
    matches
  );
};

const parseRounds = (rounds: any) => {
  return parseXmlArray<any, Round>(
    (round: any) => ({
      number: round['@_number'],
      type: round['@_type'],
      stage: round['@_stage'],
      matches: parseMatches(round.matches.match),
    }),
    rounds
  );
};

function parseXmlArray<T, ReturnType>(
  mapper: (data: T) => ReturnType,
  data?: T
) {
  if (!data) {
    return [];
  }
  if (Array.isArray(data)) {
    return data.map(mapper);
  }
  return [mapper(data)];
}
