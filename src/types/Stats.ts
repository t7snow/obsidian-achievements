//lukeleppan: better word count

export interface VaultStatistics {
  history: History;
  modifiedFiles: ModifiedFiles;
}

//YYYY-MM-DD format string holding the day
export type History = Record<string, Day>;

export type ModifiedFiles = Record<string, FileStat>;

export interface Day {
  words: number;
  characters: number;
  sentences: number;
  pages: number;
  files: number;
  xp: number;
  timeSpent: number;
  totalWords: number;
  totalCharacters: number;
  totalSentences: number;
  totalPages: number;
  totalImages: number;
  totalBulletPoints: number;
  totalTimeSpent: number;
  totalXP: number;

}

export interface FileStat {
  words: CountDiff;
  characters: CountDiff;
  sentences: CountDiff;
  pages: CountDiff;
  // images: CountDiff;
  // bulletPoints: CountDiff;
  timeSpent: CountDiff;

}

export interface CountDiff {
  initial: number;
  current: number;
}