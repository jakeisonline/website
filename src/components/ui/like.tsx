import { LikeContextProvider, useLike } from "@/hooks/use-like"
import { SITE_CONFIG } from "@/lib/config"
import { HeartIcon } from "lucide-react"
import { Button } from "./button"
import { Skeleton } from "./skeleton"

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
  const { handleLike, atLimit } = useLike()

  return (
    <Button
      variant="outline"
      className="p-0 hover:bg-pink-50/50 text-foreground group disabled:opacity-100"
      onClick={handleLike}
      disabled={atLimit}
    >
      <LikeAction />
      <LikeCount />
    </Button>
  )
}

export function LikeAction() {
  const { userLikes, atLimit } = useLike()

  const userDidLike = userLikes && userLikes > 0

  const buttonText = () => {
    if (atLimit) return "Loved!"
    if (userDidLike) return `Liked`
    return "Like"
  }

  const userVotesLeft = SITE_CONFIG.options.maxLikes - (userLikes ?? 0)

  const LikeActionDisplay = (): React.ReactNode => {
    if (userLikes === undefined) {
      return <Skeleton className="w-12 h-3" />
    }

    return (
      <>
        <div className="relative h-4 w-4">
          <HeartIcon className="fill-pink-500 stroke-transparent" />
          <div
            className="w-full overflow-hidden absolute top-0 right-0 transition-all duration-300"
            style={{
              height: `${(userVotesLeft / SITE_CONFIG.options.maxLikes) * 100}%`,
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
    <div className="flex items-center gap-2 border-r border-border h-full px-3">
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
