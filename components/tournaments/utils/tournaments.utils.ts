'use client';

import { format, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import html2canvas from 'html2canvas';

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
  return displayTournamentDateRange({
    from: parseISO(from),
    to: parseISO(to)
  })
}

export const displayTournamentDateRange = (range: DateRange) => {
  const fromDate = range.from
  const toDate = range.to;

  if (!fromDate || !toDate) return '';

  if (format(fromDate, "LLLL d") === format(toDate, "LLLL d")) {
    return format(fromDate, "LLLL d, yyyy")
  }

  if (fromDate.getMonth() === toDate.getMonth()) {
    return `${format(fromDate, "LLLL d")}-${format(toDate, "d, yyyy")}`
  }
  
  return `${format(fromDate, "LLLL d")}-${format(toDate, "LLLL d, yyyy")}`;
}


export const copyElementScreenshotToClipboard = async (element: HTMLElement | null): Promise<string> => {
  if (!element) {
    throw new Error("No element provided to capture.");
  }

  if (typeof ClipboardItem === "undefined") {
    throw new Error("ClipboardItem API is not supported in your browser.");
  }

  console.log("Element found for capture:", element);

  try {
    const canvas = await html2canvas(element);
    console.log("Canvas created successfully.");

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          console.error("Failed to convert canvas to Blob.");
          reject("Failed to convert canvas to Blob.");
          return;
        }

        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(
          () => {
            console.log("Screenshot copied to clipboard successfully!")
            resolve("Screenshot copied to clipboard!")},
          (err) => {
            console.error(`Failed to copy screenshot to clipboard: ${err}`);
            reject(`Failed to copy screenshot: ${err}`);
          }
        );
      });
    });
  } catch (err) {
    console.error("Error capturing the screenshot: ", err);
    throw err;
  }
};
