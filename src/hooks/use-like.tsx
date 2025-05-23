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
  numLikes: number | undefined
  handleLike: () => void
}

export const LikeContext = createContext<LikeContextType>({
  likeId: "",
  numLikes: undefined,
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
  const [numLikes, setNumLikes] = useState<number | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/likes?targetId=${likeId.current}`)
      .then((res) => res.json())
      .then((data) => setNumLikes(data.totalLikes))
  }, [])

  const handleLike = () => {
    fetch(`/api/likes?targetId=${likeId.current}`, {
      method: "POST",
    })

    setNumLikes((numLikes ?? 0) + 1)
  }

  return (
    <LikeContext.Provider
      value={{ likeId: likeId.current, numLikes, handleLike }}
    >
      {children}
    </LikeContext.Provider>
  )
}
