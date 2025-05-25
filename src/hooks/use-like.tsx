import { SITE_CONFIG } from "@/lib/config"
import { createContext, useContext, useEffect, useState } from "react"

export const useLike = () => {
  const context = useContext(LikeContext)

  if (!context) {
    throw new Error("useLike must be used within a LikeProvider")
  }

  return context
}

type LikeContextType = {
  likeId: string
  totalLikes: number | undefined
  userLikes: number | undefined
  userLimit: number
  handleLike: () => void
}

export const LikeContext = createContext<LikeContextType>({
  likeId: "",
  totalLikes: undefined,
  userLikes: undefined,
  userLimit: SITE_CONFIG.options.maxLikes,
  handleLike: () => {},
})

type LikeContextProviderProps = {
  children: React.ReactNode
  likeId: string
}

export const LikeContextProvider = ({
  children,
  likeId: initialLikeId,
}: LikeContextProviderProps) => {
  const likeId = initialLikeId
  const userLimit = SITE_CONFIG.options.maxLikes
  const [totalLikes, setTotalLikes] = useState<number | undefined>(undefined)
  const [userLikes, setUserLikes] = useState<number | undefined>(undefined)

  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = async () => {
    try {
      const res = await fetch(`/api/likes?targetId=${likeId}`)
      const data = await res.json()
      setTotalLikes(data.totalLikes)
      setUserLikes(data.userLikes)
    } catch (error) {
      console.error("Failed to fetch likes:", error)
    }
  }

  const handleLike = async () => {
    // Don't proceed if we're still loading or at limit
    if (userLikes === undefined || userLikes >= userLimit) return

    // Update optimistically
    setTotalLikes((prev) => (prev ?? 0) + 1)
    setUserLikes((prev) => (prev ?? 0) + 1)

    try {
      const res = await fetch(`/api/likes?targetId=${likeId}`, {
        method: "POST",
      })
      const data = await res.json()

      if (data.success) {
        setTotalLikes(data.totalLikes)
        setUserLikes(data.userLikes)
      } else if (!data.success) {
        setTotalLikes((prev) => (prev ?? 1) - 1)
        setUserLikes((prev) => (prev ?? 1) - 1)
        console.error("Failed to update likes:", data.message)
      }
    } catch (error) {
      // Revert optimistic updates on error
      setTotalLikes((prev) => (prev ?? 1) - 1)
      setUserLikes((prev) => (prev ?? 1) - 1)
      console.error("Failed to update likes:", error)
    }
  }

  return (
    <LikeContext.Provider
      value={{
        likeId,
        totalLikes,
        userLikes,
        userLimit,
        handleLike,
      }}
    >
      {children}
    </LikeContext.Provider>
  )
}
