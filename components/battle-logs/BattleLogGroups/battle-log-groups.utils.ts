import { format, isAfter } from "date-fns";
import { BattleLog } from "../utils/battle-log.types";

export const convertBattleLogDateIntoDay = (date: string | Date) => format(date, "LLL d, yyyy");

export const groupBattleLogIntoDays = (battleLogs: BattleLog[]): Record<string, BattleLog[]> => {
  return battleLogs.reduce((acc: Record<string, BattleLog[]>, curr: BattleLog) => {
    const dayOfLog = convertBattleLogDateIntoDay(curr.date);

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

export const getBattleLogsByDayList = (battleLogsByDay: Record<string, BattleLog[]>) => {
  return Object.entries(battleLogsByDay).sort((a, b) => {
    // brings the current date, the empty one, to the front
    if (a[1].length === 0) return -1;
    if (b[1].length === 0) return 1;

    if (isAfter(a[1][0].date, b[1][0].date)) return -1;
    if (isAfter(a[1][0].date, b[1][0].date)) return 1;
    return 0;
  })
};

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