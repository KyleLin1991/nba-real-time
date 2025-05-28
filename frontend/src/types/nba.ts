export interface Player {
  name: string;
  minutes: string;
  fg: string; // 投籃
  threePt: string; // 三分球
  ft: string; // 罰球
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  points: number;
}

export interface Game {
  id: number;
  league: string;
  season: number;
  date: {
    start: string;
    end: string | null;
    duration: string | null;
  };
  stage: number;
  status: {
    clock: string | null;
    halftime: boolean;
    short: number;
    long: string;
  };
  periods: {
    current: number;
    total: number;
    endOfPeriod: boolean;
  };
  arena: {
    name: string;
    city: string;
    state: string;
    country: string | null;
  };
  teams: {
    visitors: Team;
    home: Team;
  };
  scores: {
    visitors: Scores;
    home: Scores;
  };
  officials: string[];
  timesTied: number | null;
  leadChanges: number | null;
  nugget: string | null;
}

export interface Team {
  id: number;
  name: string;
  nickname: string;
  code: string;
  logo: string;
}

export interface Scores {
  win: number;
  loss: number;
  series: {
    win: number;
    loss: number;
  };
  linescore: string[];
  points: number;
}