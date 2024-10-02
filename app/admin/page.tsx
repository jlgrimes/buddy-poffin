import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/components/auth.utils";
import { isUserAnAdmin } from "@/components/admin/admin.utils";
import { countUsers, fetchAllFeedback, fetchCommonlyUsedAvatars, recentUsers } from "@/components/admin/admin.server.utils";
import { Label } from "@/components/ui/label";
import { fetchAvatarImages } from "@/components/avatar/avatar.server.utils";
import { getMainSelectableAvatars } from "@/components/avatar/avatar.utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeedbackCard } from "@/components/admin/FeedbackCard";

export default async function AdminPage() {
  const user = await fetchCurrentUser();

  if (!user || !isUserAnAdmin(user)) {
    return redirect("/");
  }

  const allAvatarImages = fetchAvatarImages();
  const mostCommonlyUsedAvatars = await fetchCommonlyUsedAvatars();
  const allFeedback = await fetchAllFeedback();

  const unusedAvatars = getMainSelectableAvatars(allAvatarImages, '').filter((availableAvatar) => !mostCommonlyUsedAvatars?.some(({ avatar }) => avatar === availableAvatar));

  const totalUsers = await countUsers();
  const recentUsersLastWeek = await recentUsers();

  return (
    <div className="flex flex-col py-4 lg:py-8 px-8 lg:px-16 gap-4 w-full h-full">
      <CardTitle>Welcome admin!</CardTitle>

      <Tabs defaultValue="feedback">
        <TabsList>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="avatars">Avatars</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="avatars">
          <>
          <Label>Most commonly used avatars:</Label>
             <div className="grid grid-cols-12 gap-2">
              {mostCommonlyUsedAvatars?.map(({ avatar, avatar_count }) => (
                <div key={`${avatar}-count`} className="flex flex-col items-center">
                  <img className="pixel-image" src={avatar} />
                  <Label>{avatar_count}</Label>
                </div>
              ))}
            </div>
            <Label>Unused avatars:</Label>
            {(unusedAvatars.length === 0) && <CardDescription>All avatars are being used!</CardDescription>}
            {unusedAvatars.map((avatar) => <img className="pixel-image" src={avatar} />)}
          </>
        </TabsContent>

        <TabsContent value="feedback">
        <Tabs defaultValue="unresolved">
          <TabsList>
            <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="unresolved">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2">
              <Label>{allFeedback?.filter(({ is_fixed }) => !is_fixed).length} pieces of unresolved feedback. Get to work!</Label>
              {allFeedback?.filter(({ is_fixed }) => !is_fixed).map((feedback) => (
                <FeedbackCard feedback={feedback} />
              ))}
            </div>
          </ScrollArea>
          </TabsContent>
          <TabsContent value="resolved">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2">
              <Label>You have fixed {allFeedback?.filter(({ is_fixed }) => is_fixed).length} customer feedbacks. Good job!</Label>
              {allFeedback?.filter(({ is_fixed }) => is_fixed).map((feedback) => (
                <FeedbackCard feedback={feedback} />
              ))}
            </div>
          </ScrollArea>
          </TabsContent>
        </Tabs>
        </TabsContent>

        <TabsContent value="users">
          Total Number of Users: {totalUsers}
          {/* @TODO: bottom row doesn't work */}
          Users Who Used App in Last Week: {recentUsersLastWeek}
        </TabsContent>
      </Tabs>
    </div>
  );
}
