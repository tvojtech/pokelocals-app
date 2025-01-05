export interface Player {
  userid: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  starter: boolean;
  order: number;
  seed: number;
  creationdate: string;
  lastmodifieddate: string;
  late: boolean;
  byes: number;
}

export type PlayerScore = {
  wins: number;
  ties: number;
  losses: number;
};

export interface TournamentData {
  name: string;
  id: string;
  city: string;
  state: string | null;
  country: string;
  roundtime: number;
  finalsroundtime: number;
  startdate: string;
  lessswiss: boolean;
  autotablenumber: boolean;
  overflowtablestart: number;
}

export interface Tournament {
  type: number;
  stage: number;
  version: string;
  gametype: string;
  mode: string;
  data: TournamentData;
  timeelapsed: number;
  players: Player[];
  pods: Pod[];
  scores: Record<string, PlayerScore>;
}

export interface Pod {
  category: string;
  stage: string;

  subgroups: Subgroup[];
  rounds: Round[];
}

export interface Subgroup {
  number: string;
  players: string[];
}

export interface Round {
  number: string;
  type: string;
  stage: string;

  matches: Match[];
}

export interface Match {
  outcome: string;
  tablenumber: number;
  player1: string;
  player2?: string;
}
