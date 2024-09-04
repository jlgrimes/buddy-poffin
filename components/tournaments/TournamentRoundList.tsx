'use client';

import { Database } from "@/database.types";
import { TournamentRound } from "./TournamentRound";

interface TournamentRoundListProps {
  tournament: Database['public']['Tables']['tournaments']['Row'];
  userId: string | undefined;
  rounds: Database['public']['Tables']['tournament rounds']['Row'][];
  updateClientRoundsOnEdit: (newRound: Database['public']['Tables']['tournament rounds']['Row'], pos: number) => void;
}

export default function TournamentRoundList (props: TournamentRoundListProps) {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-8 grid grid-cols-8 text-sm font-medium text-muted-foreground p-2">
        <span className="col-span-1">Round</span>
        <span className="col-span-6">Deck</span>
        <span className="col-span-1 text-right">Result</span>
      </div>
      {props.rounds?.map((round) => (
        <TournamentRound
          key={round.id}
          tournament={props.tournament}
          userId={props.userId}
          round={round}
          updateClientRoundsOnEdit={props.updateClientRoundsOnEdit}
        />
      ))}
    </div>
  )
}