
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardTitle, SmallCardHeader } from "../../ui/card";
import { displayTournamentDate, getRecord } from "../utils/tournaments.utils";
import { fetchRounds } from "../utils/tournaments.server.utils";
import { EditableTournamentArchetype } from "@/components/archetype/AddArchetype/AddTournamentArchetype";
import { Database } from "@/database.types";
import { formatDistanceToNowStrict, isAfter, isBefore } from "date-fns";
import { RadioTower, Watch } from "lucide-react";
import { TournamentCategoryBadge } from "../Category/TournamentCategoryBadge";
import { TournamentCategory } from "../Category/tournament-category.types";
import { TournamentPlacementBadge } from "../Placement/TournamentPlacementBadge";
import { TournamentPlacement } from "../Placement/tournament-placement.types";
import { Sprite } from "@/components/archetype/sprites/Sprite";

interface TournamentPreviewProps {
  tournament: Database['public']['Tables']['tournaments']['Row'];
  shouldHideCategoryBadge?: boolean;
}

export default async function TournamentPreview(props: TournamentPreviewProps) {
  const rounds = await fetchRounds(props.tournament.id);

  return (
    <Link href={`/tournaments/${props.tournament.id}`}>
      <Card clickable>
        <SmallCardHeader className="grid grid-cols-6 items-center">
          <div className="grid-cols-1">
            <Sprite name={props.tournament.deck} shouldSmush />
          </div>
          <div className="col-span-4 grid-cols-5 ml-2">
            <CardTitle>{props.tournament.name}</CardTitle>
            <CardDescription className="grid gap-4">
              {displayTournamentDate(props.tournament.date_from, props.tournament.date_to)}
            </CardDescription>
            <div className="flex gap-1 mt-2 flex-col sm:flex-row">
              {props.tournament.category && !props.shouldHideCategoryBadge && <TournamentCategoryBadge category={props.tournament.category as TournamentCategory} />}
              {props.tournament.placement && <TournamentPlacementBadge placement={props.tournament.placement as TournamentPlacement} />}
              {isBefore(new Date(), props.tournament.date_from) && (
                <Badge className="bg-purple-100" variant='secondary'><Watch className="h-4 w-4 mr-1" /> Live in {formatDistanceToNowStrict(props.tournament.date_from, {
                  roundingMethod: 'ceil',
                  unit: 'day'
                })}</Badge>
              )}
              {isAfter(new Date(), props.tournament.date_from) && isBefore(new Date(), props.tournament.date_to) && (
                <Badge className="bg-green-100" variant='secondary'><RadioTower className="h-4 w-4 mr-1" /> Live</Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-right whitespace-nowrap">{rounds && getRecord(rounds)}</CardTitle>
        </SmallCardHeader>
      </Card>
    </Link>
  )
}