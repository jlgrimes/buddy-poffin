import { redirect } from "next/navigation";

import TournamentCreate from "@/components/tournaments/TournamentCreate";
import { MyTournamentPreviews } from "@/components/tournaments/Preview/MyTournamentPreviews";
import { fetchCurrentUser } from "@/components/auth.utils";
import { AvatarSelector } from "@/components/avatar/AvatarSelector";
import { ScreenNameEditable } from "@/components/screen-name/ScreenNameEditable";
import { Notebook, Trophy } from "lucide-react";
import { BattleLogsContainer } from "@/components/battle-logs/BattleLogsContainer";
import { fetchUserData } from "@/components/user-data.utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isPremiumUser } from "@/components/premium/premium.utils";
import { PremiumTournamentCharts } from "@/components/premium/tournaments/PremiumTournamentCharts";
import Link from "next/link";
import { isUserAnAdmin } from "@/components/admin/admin.utils";
import { FriendsDisplay } from "@/components/friends/FriendsDisplay";

export default async function Profile() {
  const user = await fetchCurrentUser();
  const userData = user ? await fetchUserData(user.id) : null;

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col py-4 lg:py-8 pl-8 pr-6 lg:px-16 gap-4 w-full h-full">
      {!userData?.live_screen_name && (
        <Card className="px-1 py-2">
          <CardHeader>
            <CardTitle>Welcome to Training Court</CardTitle>
            <CardDescription>Enter your PTCG Live screen name and pick an avatar to get started!</CardDescription>
          </CardHeader>
        </Card>
      )}
      <div className="flex items-center gap-4">
        <AvatarSelector userId={user.id} />
        <ScreenNameEditable userId={user.id} />
      </div>

      {isUserAnAdmin(user.id) && <FriendsDisplay userId={user.id} />}

      <Tabs defaultValue="battle-logs">
        <TabsList className="mb-2">
          <TabsTrigger value="battle-logs">
            Battle Logs
          </TabsTrigger>
          <Link href='/tournaments'>
            <TabsTrigger value="tournaments">
              Tournaments
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <BattleLogsContainer />
    </div>
  );
}
