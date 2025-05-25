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

  const handleFetch = () => {
    fetch(`/api/likes?targetId=${likeId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalLikes(data.totalLikes)
        setUserLikes(data.userLikes)
      })
  }

  const handleLike = () => {
    if (userLikes === userLimit) return

    fetch(`/api/likes?targetId=${likeId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalLikes((totalLikes ?? 0) + 1)
          setUserLikes(data.userLikes)
        }
      })
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
