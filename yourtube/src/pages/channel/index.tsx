import { useUser } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Channeldialogue from "@/components/channeldialogue";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ChannelPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (user?._id && user?.channelname) {
      router.replace(`/channel/${user._id}`);
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <User className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Sign in to view your channel</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <User className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">You don't have a channel yet</h2>
      <p className="text-gray-600 mb-6">Create a channel to upload videos and share content</p>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
        Create Channel
      </Button>

      <Channeldialogue
        isopen={isDialogOpen}
        onclose={() => setIsDialogOpen(false)}
        mode="create"
      />
    </div>
  );
}
