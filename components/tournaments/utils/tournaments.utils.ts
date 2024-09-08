import { Database } from "@/database.types";
import { format, parseISO } from "date-fns";

export const getRecord = (rounds: { result: string[] }[]) => {
  const record = {
    wins: 0,
    ties: 0,
    losses: 0
  };

  for (const round of rounds) {
    const roundResult = convertGameResultsToRoundResult(round.result);

    if (roundResult === 'W') record.wins++;
    if (roundResult === 'L') record.losses++;
    if (roundResult === 'T') record.ties++;
  }

  if (record.ties === 0) {
    return `${record.wins}-${record.losses}`;
  }

  return `${record.wins}-${record.losses}-${record.ties}`;
}

export const convertGameResultsToRoundResult = (result: string[]) => {
  if (result.length === 1) return result[0];
  if ((result.length === 2) && (result[0] === result[1])) return result[0];
  if (result.length === 3) return result[2];

  return 'T';
}

export const displayTournamentDate = (from: string, to: string) => {
  const fromDate = parseISO(from);
  const toDate = parseISO(to);

  if (from === to) {
    return format(fromDate, "LLLL d, yyyy")
  }

  if (fromDate.getMonth() === toDate.getMonth()) {
    return `${format(fromDate, "LLLL d")}-${format(toDate, "d, yyyy")}`
  }
  
  return `${format(fromDate, "LLLL d")}-${format(toDate, "LLLL d, yyyy")}`;
}