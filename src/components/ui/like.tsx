import { LikeContextProvider, useLike } from "@/hooks/use-like"
import { cn } from "@/lib/utils"
import { HeartIcon } from "lucide-react"
import { Button } from "./button"
import { Skeleton } from "./skeleton"

interface LikeProps {
  likeId: string
  className?: string
}

export function Like({ likeId, className }: LikeProps) {
  return (
    <LikeContextProvider likeId={likeId}>
      <LikeButton className={className} />
    </LikeContextProvider>
  )
}

export function LikeButton({ className }: { className?: string }) {
  const { handleLike, userLimit, userLikes, totalLikes } = useLike()

  // We don't want the user to be able to like if they're at limit,
  // nor if we've not yet found out if they're at limit
  const isDisabled = userLikes === undefined || (userLikes ?? 0) >= userLimit

  const labelText = `Like this article. There are a total of ${totalLikes} likes. ${userLimit ? `You have ${userLimit - (userLikes ?? 0)} votes left.` : ""}`

  return (
    <Button
      variant="outline"
      className={cn(
        "p-0 hover:bg-pink-50/50 text-foreground group disabled:opacity-100",
        className,
      )}
      onClick={handleLike}
      disabled={isDisabled}
      aria-label={labelText}
    >
      <LikeAction />
      <LikeCount />
    </Button>
  )
}

export function LikeAction() {
  const { userLikes, userLimit } = useLike()

  const userDidLike = userLikes && userLikes > 0

  const buttonText = () => {
    if (userLimit && (userLikes ?? 0) >= userLimit) return "Loved!"
    if (userDidLike) return `Liked`
    return "Like"
  }

  const userVotesLeft = userLimit - (userLikes ?? 0)

  const LikeActionDisplay = (): React.ReactNode => {
    if (userLikes === undefined) {
      return <Skeleton className="w-12 h-3" />
    }

    return (
      <>
        <div className="relative h-4 w-4" aria-hidden>
          <HeartIcon className="fill-pink-500 stroke-transparent" />
          <div
            className="w-full overflow-hidden absolute top-0 right-0 transition-all duration-300"
            style={{
              height: `${(userVotesLeft / userLimit) * 100}%`,
            }}
          >
            <HeartIcon className="fill-pink-200 stroke-transparent h-4 w-4" />
          </div>
        </div>
        {buttonText()}
      </>
    )
  }

  return (
    <div
      className="flex items-center gap-2 border-r border-border h-full px-3"
      aria-hidden
    >
      <LikeActionDisplay />
    </div>
  )
}

export function LikeCount() {
  const { totalLikes } = useLike()

  const LikeCountDisplay = (): React.ReactNode => {
    if (totalLikes === undefined) {
      return <Skeleton className="w-3 h-3" />
    }

    return <span>{totalLikes}</span>
  }

  return (
    <div className="pl-0.5 pr-3">
      <LikeCountDisplay />
    </div>
  )
}
