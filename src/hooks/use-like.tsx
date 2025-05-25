import { createContext, useContext, useEffect, useRef, useState } from "react"

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
  atLimit: boolean | undefined
  handleLike: () => void
}

export const LikeContext = createContext<LikeContextType>({
  likeId: "",
  totalLikes: undefined,
  userLikes: undefined,
  atLimit: undefined,
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
  const likeId = useRef(initialLikeId)
  const [totalLikes, setTotalLikes] = useState<number | undefined>(undefined)
  const [userLikes, setUserLikes] = useState<number | undefined>(undefined)
  const [atLimit, setAtLimit] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    handleFetch()
  }, [])

  const handleFetch = () => {
    fetch(`/api/likes?targetId=${likeId.current}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalLikes(data.totalLikes)
        setUserLikes(data.userLikes)
        setAtLimit(data.atLimit)
      })
  }

  const handleLike = () => {
    fetch(`/api/likes?targetId=${likeId.current}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalLikes((totalLikes ?? 0) + 1)
          setUserLikes(data.userLikes)
          setAtLimit(data.atLimit)
        }
      })
  }

  return (
    <LikeContext.Provider
      value={{
        likeId: likeId.current,
        totalLikes,
        userLikes,
        atLimit,
        handleLike,
      }}
    >
      {children}
    </LikeContext.Provider>
  )
}
