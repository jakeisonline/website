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
  atLimit: boolean
  handleLike: () => void
}

export const LikeContext = createContext<LikeContextType>({
  likeId: "",
  numLikes: undefined,
  atLimit: false,
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
  const [atLimit, setAtLimit] = useState(false)

  useEffect(() => {
    fetch(`/api/likes?targetId=${likeId.current}`)
      .then((res) => res.json())
      .then((data) => {
        setNumLikes(data.totalLikes)
        setAtLimit(data.atLimit)
      })
  }, [])

  const handleLike = () => {
    fetch(`/api/likes?targetId=${likeId.current}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNumLikes((numLikes ?? 0) + 1)
          setAtLimit(data.atLimit)
        }
      })
  }

  return (
    <LikeContext.Provider
      value={{ likeId: likeId.current, numLikes, atLimit, handleLike }}
    >
      {children}
    </LikeContext.Provider>
  )
}
