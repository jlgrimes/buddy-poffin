import { format } from "date-fns";
import { BattleLog } from "../utils/battle-log.types";

export const groupBattleLogIntoDays = (battleLogs: BattleLog[]): Record<string, BattleLog[]> => {
  return battleLogs.reduce((acc: Record<string, BattleLog[]>, curr: BattleLog) => {
    const dayOfLog = format(curr.date, 'PPP');

    if (!acc[dayOfLog]) {
      return {
        ...acc,
        [dayOfLog]: [curr]
      }
    }

    return {
      ...acc,
      [dayOfLog]: [...acc[dayOfLog], curr]
    }
  }, {});
}

export const groupBattleLogIntoDecks = (battleLogs: BattleLog[]): Record<string, BattleLog[]> => {
  return battleLogs.reduce((acc: Record<string, BattleLog[]>, curr: BattleLog) => {
    const myDeck = curr.players[0].deck;

    if (!myDeck) return acc;

    if (!acc[myDeck]) {
      return {
        ...acc,
        [myDeck]: [curr]
      }
    }

    return {
      ...acc,
      [myDeck]: [...acc[myDeck], curr]
    }
  }, {});
}