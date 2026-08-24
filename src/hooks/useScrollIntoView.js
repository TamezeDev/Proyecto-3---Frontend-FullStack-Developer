import { useRef, useEffect } from 'react'

export function useScrollIntoView() {
  const targetRef = useRef(null)

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return targetRef
}
