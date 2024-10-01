import { fetchCurrentUser } from "@/components/auth.utils";
import { fetchFriendRequest, FetchFriendRequestError } from "@/components/friends/friend-requests/friend-requests.server.utils";
import { FriendRequestAcceptPage } from "@/components/friends/friend-requests/FriendRequestAcceptPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchUserData } from "@/components/user-data.utils";
import { redirect } from "next/navigation";

export default async function FriendRequestReceivePage({ params }: { params: { id: string } }) {
  try {
    const user = await fetchCurrentUser();

    if (!user) {
      return redirect('/');
    }

    const friendRequest = await fetchFriendRequest(params.id);

    if (user && (user.id === friendRequest.user_sending)) {
      return (
        <div className="flex-1 flex flex-col w-full h-full sm:max-w-lg justify-between gap-2 p-4">
          <Label>You can't accept your own friend request silly!</Label>
          <Button onClick={() => redirect("/")}>Home</Button>
        </div>
      )
    }

    const senderUserData = await fetchUserData(friendRequest.user_sending);
    return <FriendRequestAcceptPage senderUserData={senderUserData} accepterUserId={user.id} friendRequestData={friendRequest} />;

  } catch (error) {
    if (error === FetchFriendRequestError.HasExpired) {
      return (
        <div className="flex-1 flex flex-col w-full h-full sm:max-w-lg justify-between gap-2 p-4">
          <Label>Friend request error has expired. Ask your friend to send a new one!</Label>
          <Button onClick={() => redirect("/")}>Home</Button>
        </div>
      )
    }

    return redirect("/");
  }
}
