import { LikeContextProvider, useLike } from "@/hooks/use-like"
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
  const { numLikes, handleLike, atLimit } = useLike()

  return (
    <Button variant="outline" onClick={handleLike} disabled={atLimit}>
      Like {numLikes}
    </Button>
  )
}
