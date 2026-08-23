import { useState, useEffect, useRef, useCallback } from 'react'

export function useInfiniteList(fetchPage, deps = []) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [prevDeps, setPrevDeps] = useState(deps)
  const depsChanged =
    deps.length !== prevDeps.length ||
    deps.some((dep, i) => dep !== prevDeps[i])

  if (depsChanged) {
    setPrevDeps(deps)
    setItems([])
    setPage(1)
    setHasMore(true)
    setError('')
  }

  const observerRef = useRef(null)

  useEffect(() => {
    if (!hasMore) return
    if (depsChanged) return

    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const result = await fetchPage(page)
        if (cancelled) return
        setItems((prev) =>
          page === 1 ? result.data : [...prev, ...result.data]
        )
        setHasMore(result.pagination.hasMore)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...deps])

  const setSentinel = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [hasMore, loading]
  )

  return { items, loading, error, hasMore, setSentinel }
}
