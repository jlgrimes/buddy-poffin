export type RoundResult = 'W' | 'L' | 'T';

export interface BattleLogPlayer {
  name: string;
  deck: string | undefined;
  result: RoundResult;
}

export interface BattleLogTurn {
  turnTitle: string;
  body: string;
  player: string;
  prizesAfterTurn: Record<string, number>;
  actions: BattleLogAction[];
}

export interface BattleLogAction {
  // Title of the action
  title: string;
  // Details of an action (cards drawn, discarded, etc)
  details: string[];
}

export interface BattleLog {
  id: string;
  players: BattleLogPlayer[];
  // When the battle took place
  date: string;
  // The winner of the match
  winner: string;
  // log separated by turn
  sections: BattleLogTurn[];
}

export type BattleLogSortBy = 'All' | 'Day' | 'Deck' | 'Matchups';