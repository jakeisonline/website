import { LikeContextProvider, useLike } from "@/hooks/use-like"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { Button } from "./button"

interface LikeProps {
  likeId: string
}

export function Like({ likeId }: LikeProps) {
  return (
    <LikeContextProvider likeId={likeId}>
      <LikeButton />
    </LikeContextProvider>
  )
}

export function LikeButton() {
  const { totalLikes, userLikes, handleLike, atLimit } = useLike()

  const userDidLike = userLikes && userLikes > 0

  return (
    <Button
      variant="outline"
      className="p-0 hover:bg-pink-50/50 text-foreground group"
      onClick={handleLike}
      disabled={atLimit}
    >
      <div className="flex items-center gap-2 border-r border-border h-full px-3">
        <HeartIcon
          className={cn(
            "h-4 w-4",
            userDidLike
              ? "fill-pink-500"
              : "fill-transparent group-hover:fill-pink-200",
          )}
        />
        {userDidLike ? `Like +${userLikes}` : "Like"}
      </div>
      <div className="pl-0.5 pr-3">{totalLikes}</div>
    </Button>
  )
}
