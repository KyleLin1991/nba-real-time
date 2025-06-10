export interface Player {
  id: number;
  firstname: string;
  lastname: string;
}

export interface Team {
  id: number;  // 球隊id
  name: string;  // 球隊正式名稱
  nickname: string;  // 簡稱
  code: string;  // 球隊縮寫代碼
  logo: string;  // 球隊 logo 圖片 URL
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

export interface Status {
  clock: string | null;
  halftime: boolean;
  short: number;
  long: string;
}

export interface GameId {
  id: number;
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
  status: Status;
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

export interface PlayerStatistics {
  player: Player;
  team: Team;
  game: GameId;
  points: number; // 總得分
  pos: string | null; // 球員位置（可能為 null)
  min: string;  // 上場時間（分鐘）
  fgm: number;  // 投籃命中
  fga: number;  // 投籃出手
  fgp: string;  // 投籃命中率
  ftm: number;  // 罰球命中
  fta: number;  // 罰球出手
  ftp: string;  // 罰球命中率
  tpm: number;  // 三分命中
  tpa: number;  // 三分出手
  tpp: string;  // 三分命中率
  offReb: number;  // 進攻籃板
  defReb: number;  // 防守籃板
  totReb: number;  // 總籃板
  assists: number;  // 助攻
  steals: number;  // 抄截
  turnovers: number;  // 失誤
  blocks: number;  // 火鍋
  pFouls: number;     // 犯規
  plusMinus: string;  // 正負值
  comment: string | null;
}
